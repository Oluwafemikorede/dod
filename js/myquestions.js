$(document).ready(function() {

    var myQuestion = function() {
           var user_id = window.localStorage.getItem("dod_user_id");
        $.get("http://exolvetechnologies.com/dod/questions/myquestions/"+user_id, function(data) {
  
            var myQuestions = JSON.stringify(data);
            console.log(myQuestions);
      
            window.localStorage.setItem("myQuestions", myQuestions);
            displayQuestions();

        }, "json");

    }

    var displayQuestions = function() {
        
        //LOAD QUESTIONS
        var datum = JSON.parse(window.localStorage.getItem("myQuestions"));
        // console.log('step 10');
         // console.log(datum);
        $.each(datum, function(key, value) {
        console.log('step 11');

             var str = value.answer;
             if(value.answer != '')
             {
               var answer = str.substr(0, 150) + '...';
             } else {
               var answer = 'Unanswered Question';
             }
            
             console.log(value.answer);

             if(value.fname === undefined )
             {
                var doctor_name = 'Awaiting Doctor';
             } else {
                doctor_name =  value.fname+"  "+value.lname;
             }

              var append_data = "<fieldset class='blogpost'><legend class='title'><span style='color: #000; font-weight:500'>" + value.question +" </span></legend>";
                append_data += "<span class='date' style='color: #000; font-weight:500'>" + doctor_name + "</span>";
                append_data += "<span class='date pull-right' style='color: #000; font-weight:500'>" + value.created_at + "</span>";

            if (value.image.length === 0) {
                append_data += "<span style='color: #000; font-weight:500'><br>&nbsp;&nbsp;" + answer + "</span>";
                append_data += "<a class='button' style='color: #FFF;' href='myquestion-read.html?q_id=" + value.id + "' ><center>READ MORE</center></a></fieldset>";
            } else {
                append_data += "<img src='http://exolvetechnologies.com/dod/" + value.image + "'/><span style='color: #000; font-weight:500'>" + answer + "</span>";
                append_data += "<a class='button' style='color: #FFF;' href='myquestion-read.html?q_id=" + value.id + "' ><center>READ MORE</center></a></fieldset>";
            }
             $("#questionContent").after(append_data);

        });

    }


    myQuestion();
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