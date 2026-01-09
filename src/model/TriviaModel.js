import {fetchQuestion} from "../questionSource.js"
import {resolvePromise} from "../resolvePromise.js"
import {setAnswers} from "../setAnswers.js"

const model = {
    test: "testText",
    questionPromiseState: {},
    correctAnswer: -1,
    answerOptions: [],
    clockMode: 2,
    answerClickedId: -1,
    score: 0,
    questionNumber:1,
    gameRules: {
        rulesReady: false,
        difficulty: 0,
        maxNumberOfQuestions: 3
    },


    //Asks for a random question and waits for the data to arrive, when the data has arrived "setAnswers" sets the model properties to the given data
    doGenerateQuestion(){
        console.log("count");
        console.log(this.questionNumber);
        console.log(Number(this.gameRules.maxNumberOfQuestions) + 1);
        if(this.questionNumber != Number(this.gameRules.maxNumberOfQuestions) + 1){         
            resolvePromise(fetchQuestion("https://opentdb.com/api.php?amount=1&type=multiple"), this.questionPromiseState);
            setAnswers(this.questionPromiseState.promise, this);
            this.questionNumber++;
        }else{  
            alert("score:" + this.score);
        }
    },

    setTest(text){
        this.test = text;
    },

    setAnswerOptions(answers){
        this.answerOptions = answers;
    },

    setCorrectAnswer(answerId){
        this.correctAnswer = answerId;
    },

    setClockMode(mode){
        //2 is locked at max
        //1 is counting down
        //0 is locked at min
        this.clockMode = mode;
        if(this.clockMode == 0){
            this.clockTimesUp();
        }
    },

    clockTimesUp(){
        //console.log("Times Up");
        this.setChosenAnswerId(0);
    },

    setChosenAnswerId(chosenAnswerId){    
        
        
        this.answerClickedId = chosenAnswerId;

        if(chosenAnswerId != -1){
            this.clockMode = 0;
        } else {
            this.clockMode = 1;
        }

        if(this.answerClickedId == this.correctAnswer){
            this.score++;
        }
    },

    setRulesReady(boolean){
        console.log(boolean);
        
        this.gameRules.rulesReady = boolean
    },

    setDifficulty(difficulty){
        this.gameRules.difficulty = difficulty;
    },

    setMaxNumberOfQuestions(maxNumberOfQuestions){
        this.gameRules.maxNumberOfQuestions = maxNumberOfQuestions;
    },

    resetTrainingGame(){
        this.questionPromiseState = {};
        this.gameRules.difficulty = 0;
        this.gameRules.maxNumberOfQuestions = 3;
        this.gameRules.rulesReady = false;
    },




    












































 // Inloggslogik
    allUsers: [],

    user: {
        id: null,
        name: "",
        profilePicture: "",
        onGoingGames: [],
        friends: [],
    },

    searchQuery: "",
    searchResult: [],

    ///////////////////////////////// User Handler //////////////////////////////////
    addUser(){
        if (!this.allUsers.some(user => user.id === this.user.id)) {
            this.allUsers = [...this.allUsers, this.user];
        }
    },

    removeUser(){
        this.allUsers = this.allUsers.filter(user => user.id !== this.user.id);
    },

    updateUserInAllUsers(){
        this.removeUser()
        this.addUser()
    },


    setUser(user){
        this.user.id = user.uid
        this.user.name = user.displayName
        this.user.profilePicture = user.photoURL
        console.log("Set User")
        console.log(this.user)
        this.addUser()
    },

    setAllUsers(usersFromFirebase){
        this.allUsers = [... usersFromFirebase]
        console.log("all users set to")
        console.log(this.allUsers)

    },

    addFriend(newFriend){
        this.user.friends = [... this.user.friends, newFriend]
        this.updateUserInAllUsers()
    },
    
    removeFriend(friendToRemoveID){
        function shouldWeKeepFriend(friend){
            return friend.id != friendToRemoveID
        }
        this.user.friends = this.user.friends.filter(shouldWeKeepFriend)
        this.updateUserInAllUsers()

    },

    addGame(newGame){
        this.user.onGoingGames = [... this.user.onGoingGames, newGame]
        this.updateUserInAllUsers()
    },

    removeGame(gameToRemove){
        function shouldWeKeepGame(game){
            return game.id != gameToRemove.id

        }
        this.user.onGoingGames = this.user.onGoingGames.filter(shouldWeKeepGame)
        this.updateUserInAllUsers()
    },

 ///////////////////////////////// Seach Users //////////////////////////////////
    setSearchQuery(query){
        this.searchQuery = query
    },

    resetSearch(){
        this.searchResult = []
        this.searchQuery = ""
    },

    doSearch(){
        if(!this.searchQuery){
            return this.searchResult = []
        }

        this.searchResult = this.allUsers.filter(user => 
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
            && !this.user.friends.some(friend => friend.id === user.id)
            && this.user.id != user.id
        );
        console.log("Search Results:")
        console.log(this.searchResult)
    },
}

export {model};