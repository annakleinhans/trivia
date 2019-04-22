function running(data){
    console.log(data);
}

$(document).ready(function(){
    $("#create").on("click",function(){
        $.ajax({
            url: "https://opentdb.com/api.php?amount=" + $("#amounts").val() + "&category=" + $("#category").val() + "&difficulty=" + $("#difficulty").val() + "&type=" + $("#type").val(),
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


function fixMe(){
}