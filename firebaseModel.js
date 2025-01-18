import { observable, action, reaction } from "mobx";  // Add mobx imports
import { firebaseConfig } from "./firebaseConfig.js"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database"; 

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let PATH = "QuizQueenData"; // PATH = reference to project in firebase
const rf = ref(db, PATH);

//////////////////////////// FirebaseModel //////////////////////////////////////

const firebaseModel = observable({
    loginChoiceFlag: null,
    error: null,

     // Action to update the user
     setNewUser: action(function(newUser, model) {
        console.log("IN SET NEW USER", newUser)

        if(newUser != null){
            model.initUser(newUser)

            // Uppdate flag 
            if(newUser.providerData[0].providerId == "google.com"){
                this.loginChoiceFlag = "google"
            }else if(newUser.providerData[0].providerId == "facebook.com"){
                this.loginChoiceFlag = "facebook"
            }
        }
    }),


    // Google
    googleProvider: new GoogleAuthProvider(), // Create google authenticator
    googleAuth: getAuth(app),


    showAllLoginAccounts() {
        this.googleProvider.setCustomParameters({
            prompt: "select_account", // Forces account selection screen
        });
    },

    async googleLogin() {
        this.error = null;
        try {
            this.showAllLoginAccounts();
            const result = await signInWithPopup(this.googleAuth, this.googleProvider);
            console.log("Google pop-up signin done");

            // Update user after successful login
            this.loginChoiceFlag = "google";

            // Explicitly set the current user to the global firebase model
            console.log("Google login Successful:", result);

            return result.user;
        } catch (error) {
            console.error("Error during login with Google:", error.message);
            this.error = `Login with Google failed: ${error.message}`;
        }
    },

    // Facebook
    facebookProvider: new FacebookAuthProvider(),
    facebookAuth: getAuth(app),

    async facebookLogin() {
        this.error = null;
        try {
            const result = await signInWithPopup(this.facebookAuth, this.facebookProvider);

            // Update user after successful login
            this.loginChoiceFlag = "facebook";

            // Explicitly set the current user to the global firebase model
            console.log("Facebook login Successful:", result);

            return result.user;
        } catch (error) {
            // Handel of common errors 
            if (error.code === 'auth/popup-closed-by-user') {
                this.error = "Login popup was closed by the user.";
            } else if (error.code === 'auth/cancelled-popup-request') {
                this.error = "Another login attempt is already in progress.";
            } else {
                this.error = `Login with Facebook failed: ${error.message}`;
            }
            throw error;
        }
    },

    logout() {
        if (this.loginChoiceFlag === "facebook") {
            signOut(this.facebookAuth).then(() => {
                console.log("User signed out successfully (facebook)");
                this.loginChoiceFlag = null // Clear flag
                
            }).catch((error) => {
                console.error("Error during logout(facebook):", error.message);
            });
        } else if (this.loginChoiceFlag === "google") {
            signOut(this.googleAuth).then(() => {
                console.log("User signed out successfully (google).");
                this.loginChoiceFlag = null // Clear flag
            }).catch((error) => {
                console.error("Error during logout(google):", error.message);
            });
        } else {
            console.log("NO FLAG?")
        }
    },

    // Listen for authentication state changes (this ensures user state is updated)
    initAuthListener(triviaModel) {
        getAuth(app).onAuthStateChanged(async (newUser) => {
            if (newUser) {
                triviaModel.setIsAuthenticated ("loading")
                // Widow loading??
                console.log("User is authenticated", newUser)

                this.setNewUser(newUser, triviaModel);
                await connectToFirebase(triviaModel, reaction)

                // If first time user --> Save user to db
                // If not get existing friends and games
                if (triviaModel.addExistingUser()){
                    saveToFirebase(triviaModel)
                }

                // Change screen
                console.log("Change screen to friendsView", triviaModel.user)
                triviaModel.setIsAuthenticated("true")

            } else {
                // If the user is logged out, reset the user state
                triviaModel.setIsAuthenticated("false")
                triviaModel.resetUser()
            }
        });
    },
});

//////////////////////////// Percistence ////////////////////////////////////////

export function modelToPersistence(model) {
    return ({
        user: model.user,
        invite: model.invite,
        // ADD more
    });
}

export function saveToFirebase(model) {
    if(model.ready) {
        const dataToSave = modelToPersistence(model); // Prepare data for saving
        console.log("In save to firebase", dataToSave);
        
        //User
        if(dataToSave.user && dataToSave.user.id) {
            const userRf = ref(db, `QuizQueenData/allUsers/${dataToSave.user.id}`)
            console.log("Saving Current User...", dataToSave.user)
            set(userRf, dataToSave.user);
        }else{
            console.warn("Cannot save: User or User ID is missing");
        }

        //Invite
        if(dataToSave.invite && dataToSave.invite.inviteId) {
            const inviteRf = ref(db, `QuizQueenData/invites/${dataToSave.invite.inviteId}`)
            console.log("Saving new Invite...")
            set(inviteRf, dataToSave.invite);
        }else{
            console.log("Cannot save: Invite or Invite ID is missing");
        }

        //Games
        
    } else {
    console.log("Model is not ready yet");
    }
}

export function persistenceToModel(dataFromPersistence, model) {
    //Users
    if (dataFromPersistence?.allUsers) { // check if data exists 
        // Set allusers
        model.setAllUsers(dataFromPersistence.allUsers);
    }else{
        console.log("No users found in firebase");
        model.setAllUsers([]) // if no data, set to empty array
    }

    //Invites
    if (dataFromPersistence?.invites) { // check if data exists 
        // Set allusers
        model.setAllInvites(dataFromPersistence.invites);
    }else{
        console.log("No invites found in firebase");
        model.setAllInvites([]) // if no data, set to empty array
    }

}

export async function readFromFirebase(model) {
    model.ready = false;

    if (!model.user) {
        console.error("User is not authenticated");
        return;
    }

    try {
        const dataToRead = await get(rf);
        console.log("Data read from firebase:");
        console.log(dataToRead.val())

        persistenceToModel(dataToRead.val(), model);
        model.ready = true; // Set ready to true once everything is loaded

    } catch (error) {
        console.error("Error reading from Firebase:", error.message);
    }
}



export async function connectToFirebase(model, watchFunction) {
   // Check if the user is authenticated
   if (model.user) {
        console.log("Connecting to firebase")
        try {
            // If user is authenticated, read data from Firebase
            await readFromFirebase(model);
        } catch (error) {
            console.error("Error reading from Firebase:", error.message);
        }
    } else {
        console.error("User is not authenticated. Please log in first.");
    }

    // Parameters to watch
    function parametersToWatchACB() {
        return [model.user, model.invite, model.user.onGoingGames];
    }

    // What to do when any of the parameters above changes
    function saveChangesACB() {
        saveToFirebase(model); // Save to Firebase whenever data changes
        console.log("Done saving to firebase")
    }

    // Watch for changes in the parameters and save to Firebase when they change
    watchFunction(parametersToWatchACB, saveChangesACB);
}

///////////////////////// Invites ////////////////////////////

export async function getFriendFromFirebase(model, id){
    model.ready = false;

    if (!model.user) {
        console.error("User is not authenticated");
        return;
    }

    try {
        const friendRef = ref(db, `QuizQueenData/allUsers/${id}`) 
        const friend = await get(friendRef);
        console.log("Friend read from firebase:");
        console.log(friend.val())
        model.ready = true; // Set ready to true once everything is loaded

        return(friend.val());

    } catch (error) {
        console.error("Error reading friend from Firebase:", error.message);
    }
}

export function saveFriendToFirebase(model, friend){
    if(model.ready){
        const friendRef = ref(db, `QuizQueenData/allUsers/${friend.id}`)
        
        return set(friendRef, friend)
        .then(() => {
            console.log("Friend successfully saved to Firebase:", friend);
        })
        .catch((error) => {
            console.error("Error saving friend to Firebase:", error.message);
        });    }
}

export function saveInviteToFirebase(model, invite){
    console.log("Invite to save is: ", invite)
    console.log("model redy is: ", model.ready)
    if(model.ready){
        const inviteRef = ref(db, `QuizQueenData/invites/${invite.inviteId}`)
        return set(inviteRef, invite)
        .then(() => {
            console.log("Invite successy saved to Firebase:", invite);
        })
        .catch((error) => {
            console.error("error saving invite to Firebase:", error.message);
        });    }
}

///////////////////////// Game ////////////////////////////

export async function getGameFromFirebase(model, id){
    model.ready = false;

    if (!model.user) {
        console.error("User is not authenticated");
        return;
    }

    try {
        const gameRef = ref(db, `QuizQueenData/allGames/${id}`) 
        const game = await get(gameRef);
        console.log("Game read from firebase:");
        console.log(game.val())
        model.ready = true; // Set ready to true once everything is loaded

        return(game.val());

    } catch (error) {
        console.error("Error reading game from Firebase:", error.message);
    }
}

export function saveGameToFirebase(model, game){
    if(model.ready){
        const gameRef = ref(db, `QuizQueenData/allGames/${game.id}`)
        
        return set(gameRef, game)
        .then(() => {
            console.log("Game successfully saved to Firebase:", game);
        })
        .catch((error) => {
            console.error("Error saving game to Firebase:", error.message);
        });    }
}

export async function getPlayerFromFirebase(model, game, id){
    model.ready = false;

    if (!model.user) {
        console.error("User is not authenticated");
        return;
    }

    try {
        const playerRef = ref(db, `QuizQueenData/allGames/${game.id}/player/${id}`)
        const player = await get(playerRef);
        console.log("player read from firebase");
        console.log(player.val())
        model.ready = true; // Set ready to true once everything is loaded
        console.log("found player in firebase: ", player.val())
        return(player.val());

    } catch (error) {
        console.error("Error reading player from Firebase:", error.message);
    }
}

 
export function savePlayerToFirebase(model, game, player){
    console.log("player to save is: ", player)

    if(model.ready){
        const playerRef = ref(db, `QuizQueenData/allGames/${game.id}/player/${player.id}`)
        console.log("player ref is: ",  playerRef)
        return set(playerRef, player)
        .then(() => {
            console.log("Player successy saved to Firebase:", game);
        })
        .catch((error) => {
            console.error("error saving player to Firebase:", error.message);
        });    }
}

export { firebaseModel }
