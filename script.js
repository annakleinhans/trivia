function running(data){
    console.log(data);
    makeQuiz(data);

}

$(document).ready(function(){
    $("#create").on("click",function(){
        $.ajax({
            url: "https://opentdb.com/api.php?amount=" + $("#amounts").val() + "&category=" + $("#category").val() + "&difficulty=" + $("#difficulty").val() + "&type=multiple",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: running,
            failure: function(){
                alert("Error!");
            }
        });
    });
});




function  questions(data){
        qArray = data.incorrect_answers;
        console.log(data);
        qArray.push(data.correct_answer);
        qArray = shuffle(qArray);
        console.log(qArray);
        return qArray;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function makeQuiz(data){
    var quizzie = document.getElementById("quizzie");
    var html = "";
    for (var i = 0; i < data.results.length; i++){

        var answerArray = questions(data.results[i]);

        html += data.results[i].question;

        for(var j = 0; j<answerArray.length;j++){
            html += "<input type='radio' name='question " + j + " ' value= ' " + answerArray[j] + " '>";
            html += answerArray[j];
        }

    }
quizzie.innerHTML = html;

}

