var correctAnswerArray = [];

function running(data){
    makeQuiz(data);

}

$(document).ready(function(){
    $("#submit").hide();
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
    $("#submit").on("click", handleSubmit);
});




function  questions(data){
        qArray = data.incorrect_answers;
        qArray.push(data.correct_answer);
        qArray = shuffle(qArray);
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
    $
    var quizzie = document.getElementById("quizzie");
    var html = "";
    for (var i = 0; i < data.results.length; i++){

        var answerArray = questions(data.results[i]);
        html += "<br></br>";
        html += i + 1 + ". " + data.results[i].question;
        correctAnswerArray.push(data.results[i].correct_answer);


        for(var j = 0; j<answerArray.length;j++){
            html += "<br></br>";
            html += "<input type='radio' class='q" + i + "' name='question" + i + " ' value= '" + answerArray[j] + "'>";
            html += answerArray[j];


        }

    }
    console.log(correctAnswerArray);
    html += "<br></br>";
    quizzie.innerHTML = html;
    $("#submit").show();


}


function handleSubmit() {
    var correct = 0;
    for (var j = 0; j < 10; j++) {
        var items = document.getElementsByClassName("q" + j);
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                var x = items[i].value;
                var z = correctAnswerArray[j];
                console.log(x == z);
                if (items[i].value == correctAnswerArray[j]) {
                    correct = correct + 1;
                }
            }
        }
    }

    console.log(correct);
    $("#submit").hide();
    displayGrade(correct);
}


function displayGrade(int){
    var numsQs = $("#amounts").val();
    var percent = (int / numsQs) * 100;
    var score = percent + "%";
    console.log(score);
    alert("You scored " + score + ".");

}