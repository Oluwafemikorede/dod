$(document).ready(function() {

    window.q_id = getQueryVariable("q_id"); //GETS QUESTION ID FROM URL


    var checkQuestion = function() {
        console.log('checkQuestion Function');

        var dbkey = "question_" + q_id;

        if (window.localStorage.getItem(dbkey) === null) {
            console.log('question_id key does not exist');
            getSingleQuestion();
        } else {
        	displayQuestions();
            console.log('question_id key exists');

        }
    }

    var getSingleQuestion = function() {

        var dbkey = "question_" + q_id;

        $.get("http://exolvetechnologies.com/dod/questions/single/" + q_id, function(data) {

            console.log(data);
            var storeValue = JSON.stringify(data);
            window.localStorage.setItem(dbkey, storeValue);
            displayQuestions();
        }, "json");

    }

    var displayQuestions = function() {
        console.log('display questions');
        //LOAD QUESTIONS
        var dbkey = "question_" + q_id;
        window.value = JSON.parse(window.localStorage.getItem(dbkey));
        console.log(value.image);
       // $.each(datum, function(key, value) {

       		var append_data = "<fieldset class='blogpost'><legend class='title'><span><strong>" + value.question + "</strong>";
                append_data += " </span></legend><span class='date'><strong>" + value.fname + "  " + value.lname + "</strong>";
                append_data += "</span><span class='date pull-right'>" + value.created_at + "</span>";



            if (value.image.length == 0) {
               append_data += "<span><br>" + value.answer + "</span></fieldset>";
            } else {
              
               
                append_data += "<img src='http://exolvetechnologies.com/dod/" + value.image + "'/><span>" + value.answer + "</span></fieldset>";
               
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