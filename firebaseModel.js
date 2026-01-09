// Add relevant imports here 
import { firebaseConfig } from "./firebaseConfig.js"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database"; 

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig) 
const db = getDatabase(app)
const PATH ="QuizQueenData";       //PATH = reference to project in firebase
const rf = ref(db, PATH);

export function modelToPersistence(model){
    return ({
        allUsers: model.allUsers.sort(),
    })
}

export function saveToFirebase(model){
    model.ready=true //Remove later when done get! 
    if(model.ready){
        const dataToSave = modelToPersistence(model)
        return set(rf, dataToSave)
    }
}

export function persistenceToModel(dataFromPersistence, model) {

    if (!dataFromPersistence) { // if no data exists - set defaults
        model.allUsers = [];
        return Promise.resolve(); // Nothing to wait for
    }
    // Set guests/currentId or default
    model.setAllUsers(dataFromPersistence.allUsers);
}

export async function readFromFirebase(model){
    model.ready = false
    const dataToRead= await get(rf);
    await persistenceToModel(dataToRead.val(), model);      // await might be unnessisary due to .then() in persistenceToModel
    model.ready = true
}

export async function connectToFirebase(model, watchFunction){
    await readFromFirebase(model);
    
    // Parameters to watch
    function parametersToWatchACB(){
        return [model.allUsers]

    }

    // What to do when any of the parameters above changes 
    function saveChangesACB(){
        saveToFirebase(model)
    }
    
    //reaction()
    watchFunction(parametersToWatchACB, saveChangesACB)
}


const firebaseModel = {
    loginChoiceFlag: null,

    // Google
    googleProvider: new GoogleAuthProvider(),     //Create google authenticator
    googleAuth: getAuth(app),

    user: null, // Reactive user state
    error: null,

    
    showAllLoginAccounts(){
        this.googleProvider.setCustomParameters({
            prompt: "select_account", // Forces account selection screen
        })
    },

    setNewUser(newUser){
        this.user = newUser
    },

    async googleLogin(){
        this.error = null
        try{
            this.showAllLoginAccounts()
            const result = await signInWithPopup(this.googleAuth, this.googleProvider)
            this.setNewUser(result.user);
            this.loginChoiceFlag = "google"
            console.log("Google login Successful:", result);
            return result.user
        } catch {
            console.error("Error during login with google:", error.message);
            this.error = `Login with Google failed: ${error.message}`;
        }           
    },
    
    //Facebook
    facebookProvider: new FacebookAuthProvider(),
    facebookAuth: getAuth(app),

    async facebookLogin(){
        this.error = null
        try {
            const result = await signInWithPopup(this.facebookAuth, this.facebookProvider);
            this.setNewUser(result.user);
            this.loginChoiceFlag = "facebook";
            console.log("Facebook login Successful:", result);
            return result.user;
        } catch (error) {
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
   
    logout(){
        if (this.loginChoiceFlag == "facebook"){
            signOut(this.facebookAuth).then(() => {
                console.log("User signed out successfully (facebook)");
                this.setNewUser(null); // Clear user
            }).catch((error) => {
                console.error("Error during logout(facebook):", error.message);
            });
        }else if(this.loginChoiceFlag == "google"){
            signOut(this.googleAuth)
            .then(() => {
                console.log("User signed out successfully (google).");
                this.setNewUser(null); // Clear user
            }).catch((error) => {
                console.error("Error during logout(google):", error.message);
            });
        }
       
    }

}

export { firebaseModel }


/*
// Putting data from firebase into the model





export async function connectToFirebase(model, watchFunction){
    await readFromFirebase(model);
    
    // Parameters to watch
    function parametersToWatchACB(){
        return [model.numberOfGuests, model.currentDishId, model.dishes]
    }

    // What to do when any of the parameters above changes 
    function saveChangesACB(){
        saveToFirebase(model)
    }
    
    //reaction()
    watchFunction(parametersToWatchACB, saveChangesACB)
}

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase


//i consollen: npm install firebase
*/