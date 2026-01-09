import { observer } from "mobx-react-lite";
import {GameView} from "../view/gameView.jsx"
import {QuestionView} from "../view/questionView.jsx"
import {ClockView} from "../view/clockView.jsx";
import {GameRulesView} from "../view/gameRulesView.jsx";

const Game = observer(
    function GameRender(props){
        console.log("Presenter rerender");
        const date = new Date();
        var startTime = date.getTime();

        if(props.model.gameRules.rulesReady){
            return <div>
            <GameView model = {props.model} onGenerateQuestion = {generateQuestionACB} questionData = {props.model.questionPromiseState.data} onTimesUp = {timesUpACB}/>

            <QuestionView model = {props.model} questionData = {props.model.questionPromiseState.data} setClockMode={setClockMode} test = {props.model.test} onChosenAnswer = {setAnswerIdACB} answerClicked = {props.model.answerClickedId}/>

            <ClockView model = {props.model} startTime = {startTime} setClockMode = {setClockMode} clockMode = {props.model.clockMode} onTimesUp = {timesUpACB}/>
            </div>
        }else{
            return <GameRulesView model = {props.model} onSetDifficulty={setDifficultyACB} onSetmaxNumberOfQuestions={setMaxNumberOfQuestionsACB} onSetRulesReady = {setRulesReadyACB} rulesReady = {props.model.gameRules.rulesReady} currentDifficulty = {props.model.gameRules.difficulty} currentMaxNumberOfQuestions = {props.model.gameRules.setMaxNumberOfQuestions}/>
        }

        function generateQuestionACB(){    
            props.model.doGenerateQuestion();
        }

        function timesUpACB(){
            setClockMode(0);
        }

        function setClockMode(mode){
            props.model.setClockMode(mode);
        }

        function setAnswerIdACB(answer){
            props.model.setChosenAnswerId(answer);
        }

        function setDifficultyACB(difficulty){
             props.model.setDifficulty(difficulty);
        }

        function setMaxNumberOfQuestionsACB(number){
            props.model.setMaxNumberOfQuestions(number);
        }

        function setRulesReadyACB(){
            props.model.setRulesReady(true);
        }
    }
);

export {Game};