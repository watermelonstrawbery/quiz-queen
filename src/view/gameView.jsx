import "/src/style/gameView.css"

export function GameView(props){
    //console.log(props.model.correctAnswer);
    //console.log("answer options");
    //console.log(props.model.answerOptions);

    return <div>
            
            <div>
                <button onClick={()=> window.location.hash = "#/"}> Back </button>
            </div>
            
        Game View<br/>
        <button onClick = {generateQuestionACB}>Generate Question</button>
        
    </div>


    function generateQuestionACB(){
        props.onGenerateQuestion();
    }
}