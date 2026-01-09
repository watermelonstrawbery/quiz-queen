export function GameRulesView(props){

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  var difficultyRenderingCounter = -1;

  return <div>

      What level do you want to play at?
      {difficulties.map(renderDifficultyButtonsCB)}
      <br/>
      How many questions do you want to answer? <input name="numberOfQuestions" onChange={setMaxNumberOfQuestionsACB}/>

      <button onClick={setGameRulesACB}>Ready to play!</button>

      <div>
        <button onClick={()=> window.location.hash = "#/"}> Back </button>
      </div>


  </div>

  function renderDifficultyButtonsCB(difficulty){

    difficultyRenderingCounter++;

    const thisButtonDifficultyNumber = difficultyRenderingCounter;

    var classNameVar = "difficultyButton";
    

    if(thisButtonDifficultyNumber == props.currentDifficulty){
      classNameVar = "difficultyButtonChosen";
    }

    return <button key = {thisButtonDifficultyNumber} className = {classNameVar} onClick={setDifficultyACB}>{difficulty}</button>

    function setDifficultyACB(){
      props.model.setDifficulty(thisButtonDifficultyNumber);
    }
  }

  function setMaxNumberOfQuestionsACB(maxNumber){
    props.model.setMaxNumberOfQuestions(maxNumber.target.value);
  }

  function setGameRulesACB(){
    props.onSetRulesReady();
  }

 

  
}