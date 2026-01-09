export function setAnswers(questionPromise, model){
    //should maybe be written as a full resolve promise alternative, but for now it works
    //access useful question data not through question data but through the model
    //answer params, but check if that data exists by checking promise state not null

    model.setAnswerOptions([]);
    model.setCorrectAnswer(-1);
    questionPromise.then(questionReceivedACB);

    function questionReceivedACB(data){
    
        const pos = Math.floor(Math.random() * 4);

        const answers = Array(4);

        answers[pos] = data[0].correct_answer; 

        var currentPos = 0;
        for(var n = 0; n < 4; n++){
            if(!answers[n]){
                answers[n] = data[0].incorrect_answers[currentPos];
                currentPos += 1;
            }
        }

        model.setAnswerOptions(answers);
        model.setCorrectAnswer(pos+1);
        model.setClockMode(1);
        model.setChosenAnswerId(-1);
    }
}