$(document).ready(function() {

    

    var sendQuestion = function() {
           var user_id = window.localStorage.getItem("dod_user_id");
            var question = $("#question").val();

        // $.post("http://localhost/dod/questions/ask", { user_id: user_id, question: question}, 
        $.post("http://exolvetechnologies.com/dod/questions/ask", { user_id: user_id, question: question}, 
          function(data) {
            if(navigator.notification)
            {
              navigator.notification.alert(data.message)
            } else {
              alert(data.message);
            }

            //  displayQuestions();

        }, "json");

    }


$("#btnAsk").click(function(){

          sendQuestion();

    });
    
    // displayQuestions();
});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}