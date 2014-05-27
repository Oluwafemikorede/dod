$(document).ready(function() {

    window.q_id = getQueryVariable("q_id"); //GETS QUESTION ID FROM URL


    var checkQuestion = function() {
        console.log('checkQuestion Function');

        var dbkey = "myquestion_" + q_id;

        if (window.localStorage.getItem(dbkey) === null) {
            console.log('question_id key does not exist');
            getSingleQuestion();
        } else {
        	displayQuestions();
            console.log('question_id key exists');

        }
    }

    var getSingleQuestion = function() {

        var dbkey = "myquestion_" + q_id;

        $.get("http://exolvetechnologies.com/dod/questions/mysingleanswer/" + q_id, function(data) {

            console.log(data);
            var storeValue = JSON.stringify(data);
            window.localStorage.setItem(dbkey, storeValue);
            displayQuestions();
        }, "json");

    }

    var displayQuestions = function() {
        console.log('display questions');
        //LOAD QUESTIONS
        var dbkey = "myquestion_" + q_id;
        window.value = JSON.parse(window.localStorage.getItem(dbkey));
        console.log(value.question.user_id);
       // $.each(datum, function(key, value) {

            var str = value.question.answer;
             if(value.question.answer != '')
             {
               var answer = str.substr(0, 150) + '...';
             } else {
               var answer = 'Unanswered Question';
             }
            
             console.log(value.question.image);

             if(value.doctor.fname === undefined )
             {
                var doctor_name = 'Awaiting Doctor';
             } else {
                var doctor_name =  value.doctor.fname +"  "+ value.doctor.lname;
             }


       		var append_data = "<fieldset class='blogpost'><legend class='title'><span style='color: #000; font-weight:500' >" + value.question.question + "</span></legend>";
                append_data += "<span class='date' style='color: #000; font-weight:500' >" + doctor_name + "</span>";
                append_data += "<span class='date pull-right' style='color: #000; font-weight:500'>" + value.question.created_at + "</span>";



            //if (value.image.length === 0) {
            if (value.question.image != '') {
               append_data += "<img src='http://exolvetechnologies.com/dod/" + value.question.image + "'/><span>" + answer + "</span></fieldset>";
            } else {
               append_data += "<span style='color: #000; font-weight:500' ><br>&nbsp;&nbsp;" + answer + "</span></fieldset>";                
            }
             $("#questionContent").after(append_data);

    }

    checkQuestion();
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