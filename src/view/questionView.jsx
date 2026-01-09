import {decodeString} from "../utilies.js";

export function QuestionView(props){

    var bakedAnswerOptions = Array(4);
    for(var n = 0; n < props.model.answerOptions.length; n++){
      bakedAnswerOptions[n] = [n+1, props.model.answerOptions[n]];
    }

    
    return <div>
        {writeQuestion()}<br/>
    </div>

    function writeQuestion(){
        if(props.questionData){
            return <div>
                {decodeString(props.questionData[0].question)}
                {renderAnswers()}
            </div>
        } else {
            return <div>
                No Question
            </div>
        }
    }

    function renderAnswers(){
        if(props.answerClicked == -1){
            //console.log("Unanswered Rendering");
            return <div>
            {bakedAnswerOptions.map(answerOptionsUnansweredRenderCB)}
            </div>
        } else {
            //console.log("Answered Rendering");
            return <div>
            {bakedAnswerOptions.map(answerOptionsAnsweredRenderCB)}
            </div>
        }
    }

    function answerOptionsUnansweredRenderCB(option){

        return <button key={option[0]} className={"answerButton"} onClick={answerOptionClickedACB}>{decodeString(option[1])}</button>

        function answerOptionClickedACB(){
            props.onChosenAnswer(option[0]);
        }
    }

    function answerOptionsAnsweredRenderCB(option){
        var name = "answerButtonGray";

        if(option[0] == props.answerClicked){
            if(props.model.correctAnswer == option[0]){
                name = "answerButtonGreen";
            } else {
                name = "answerButtonRed";
            }
        } else {
            if(props.model.correctAnswer == option[0]){
                name = "answerButtonGrayGreen";
            }
        }

        return <button key={option[0]} className={"answerButton " + name} disabled>{decodeString(option[1])}</button>
    }
}