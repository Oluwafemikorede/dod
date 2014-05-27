$(document).ready(function() {

    var checkQuestion = function() {
        console.log('step 1');

        if (window.localStorage.getItem("topQuestions") === null) {
        console.log('step 2');

            getQuestion();
        console.log('step 3');

            console.log('topQuestions key does not exist');
        console.log('step 4');

        } else {
    displayQuestions();

            console.log('topQuestions key exists');

        }
    }

    var getQuestion = function() {
  console.log('step 5');
        $.get("http://exolvetechnologies.com/dod/questions/top", function(data) {
  console.log('step 6');
            console.log(data);
              console.log('step 7');
            var topQuestions = JSON.stringify(data);
              console.log(topQuestions);
            window.localStorage.setItem("topQuestions", topQuestions);
              console.log('step 8');
              displayQuestions();

        }, "json");

    }

    var displayQuestions = function() {
        console.log('step 9');
       
        //LOAD QUESTIONS
        var datum = JSON.parse(window.localStorage.getItem("topQuestions"));
        // console.log('step 10');
         console.log(datum);
         var i = 1;
        $.each(datum, function(key, value) {
        // console.log('step 11');

             var str = value.answer;
             var answer = str.substr(0, 150) + '...';

              // var append_data = "<fieldset class='blogpost'><legend class='title'><span  style='color: #000; font-weight:500' >" + value.question + "</span></legend>";
              //   append_data += "<span class='date' style='color: #000; font-weight:500'>" + value.fname + "  " + value.lname + "</span>";
              //   append_data += "<span class='date pull-right'>" + value.created_at + "</span>";


            var append_data = "<div><input id='ac-"+i+"' name='accordion-1' type='radio' />";
                append_data +=  "<label for='ac-"+i+"'>"+value.question+"</label>";
                append_data +=  "<article class='ac-large'>";

                if (value.image.length === 0) {
                append_data +=  "<p>"+answer+"</p>";
                } else {
                append_data +=  "<p><img src='http://exolvetechnologies.com/dod/" + value.image + "'/>"+answer+"</p>";
                }

               append_data += "<a class='button' style='color: #FFF;' href='page.html?q_id=" + value.id + "' ><center>READ MORE</center></a></article></div>";


            // if (value.image.length === 0) {
            //     append_data += "<span  style='color: #000; font-weight:500'><br>" + answer + "</span>";
            //     append_data += "<a class='button' style='color: #FFF;' href='page.html?q_id=" + value.id + "' ><center>READ MORE</center></a></fieldset>";
            // } else {
            //     append_data += "<img src='http://localhost/dod/" + value.image + "'/><span  style='color: #000; font-weight:500'>" + answer + "</span>";
            //     append_data += "<a class='button' style='color: #FFF;' href='page.html?q_id=" + value.id + "' ><center>READ MORE</center></a></fieldset>";
            // }
             // $("#questionContent").after(append_data);
             $("#mainContainer").append(append_data);
             i = i + 1;
        });

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