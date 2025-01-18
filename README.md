# QuizQueen
isaclj-linahag-lisalm-sainas-HT24-Project created for isaclj-linahag-lisalm-sainas

This is a web application for a multiplayer trivia game.

## Dependencies

The project uses third-party libraries. To run the code, ensure the following dependencies are installed:

1. **React Social Login Buttons**  
   ```bash
   npm install --save react-social-login-buttons
   ```
   
2. **Material UI (ToolTip)**  
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```

The Material UI Tooltip provides short messages when users hover over elements. It is used to clarify available actions and explain the function of specific buttons. This implementation serves as a replacement for a traditional help page, where users would typically read about the game's features.

# Mid-Project README
## Description:

A trivia game where you can play against your friend group and keep a leader board, or you can train your own trivia skills. 

When the application starts you will get a choice of logging in with Google or Facebook if you want to play with friends and see leaderboards where you can see the progress in your friend group. You also have a choice to not log in if you only want to test the questions through a “training session” but no data will then be saved and you cannot add friends and play against them.

When you start a quiz you start by choosing the difficulty of the quiz, number of questions per day, for how many days you want to play, and people you want to play with. 

When the game starts all the chosen friends will be invited to play the game. If someone in the group does not want to play they can choose to leave the game and the rest will continue to play. Each person in the group will get the chosen number of questions during the chosen time, e.g., 3 questions per day for 5 days. When you decide to answer one question you will have a set amount of time to answer that question. The progress will be shown on a leaderboard for the whole group to see how many questions each person has answered and the total score for each person. 

For each question correctly answered the player gets one point. This will be added to each player's profile and the whole group will be shown in the leaderboard. 

If a training session is started you get the choice of how many questions, difficulty level, and which category you want the questions to come from. The game will start and you get the questions one by one with a set amount of time to answer. You can choose to end the game whenever you want and when finished you get a summary of how many questions you got correct. This summary will not be saved.

## What have we done so far

### Logging:

To start off a firebase real time database was created. From firebase we got authentication to create login with google and with facebook. When logging in a pop up window will appear for extern login. Facebook login is only available for developers at the moment, but google is open for all. Each person who logged in is saved as a user. 

### Add and remove friends:

A logged in user can search for other users in our database and add them to their friends list, where from they can remove friends as well. However we have not yet implemented invites, eg. if X adds Y as a friend, Y should get an invite to add X as a friend. 

### Game Logic:

When starting a training session you can choose difficulty level and number of questions. We are aware of a bug here, that you can start a game without setting a number of questions, this is to be fixed. When starting the game you can generate a question form a button. This will call the API and fetch one question which will be displayed and played. As of now “generate question” needs to be pushed between each question round. This will be automated in later versions. When all questions are played a pop up with your score is displayed. As of now there are now buttons to go back and reset so to play again the page needs to reload. 

## What we plan to do

1. Implement progress bar from a library  
2. Finish logic for Training session  
3. Send Friend invites  
4. Create groupGame settings and send invites  
5. Create groupGame play logic  
6. Display overview of ongoing games (in MainView) and leaderboard/state of each specific game(gameState).  

## Project Structure

### Presenters:
- `friendsPresenter.jsx`: handles the friends-list and removing friends
- `gamePresenter.jsx`: handles the questions in the training-game
- `gameStatePresenter.jsx`: *(to be done)* handles the overview of a game
- `mainPresenter.jsx`: *(to be done)* handles the overview of the logged in user
- `searchPresenter.jsx`: handles the searching for new friends and adding friends

### Views:

- `clockView.jsx`: Sets the useState for continous update of the timebar
- `friendsView.jsx`: Displays the list of friends including buttons to remove friends and navigation to add new friends.
- `gameRulesView.jsx`: Displays the setting-page for starting a new training game including navigation to start the game.
- `gameStateView.jsx`: *(to be done)* Displays the overview of the group-game including who is playing, if they have answered today’s questions, how many points each player has, and game information (number of questions, difficulty…).
- `gameView.jsx`: Displays the questions in the training-game and handles generation of a new question.
- `loginView.jsx`: Displays the initial page with the options to log in with Google, Facebook, or play without login.
- `mainView.jsx`: *(to be done)* Displays the overview when a user is logged in, including active games and invites. Includes navigation to start a new group-game or training-game.
- `questionView.jsx`: Displays questions and buttons for game
- `searchView.jsx`: Displays the view to search for new friends and add them.
- `timeBar.jsx`: Displays timebar

### Other:

- `gameView.css`: Styling of the answer-buttons in the game.  
- `strucure.css`: Styling of all other elements.  
- `triviaModel`: The main model that handles the logic.  
- `index.jsx`: Starts the application and renders the main component.  
- `questionSource.js`: Holds the function to make the API call.  
- `ReactRoot.jsx`: Configures the main React component and handles routing and the split-screen.  
- `resolvePromise.js`: Handles promise resolution.  
- `setAnswers`: Handles the logic to set right and wrong answers for the questions.  
- `firebaseConfig.js`: Configuration settings for Firebase.  
- `firebaseModel.js`: Data handling in Firebase.  

