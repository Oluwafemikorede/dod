$(document).ready(function() {

    

    var registerUser = function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var about = $("#about").val();
        var gender = $("#gender").val();

         if (window.localStorage.getItem("dod_user_id") === null)
            {
                $.post("http://localhost/dod/questions/register", 
                    { name: name, email: email, phone: phone, gender: gender, about: about}, 
                  function(data) {
                    if(data.message == 'ok')
                    {
                        window.localStorage.setItem("dod_user_id",data.user_id);
                        if(navigator.notification)
                        {
                          navigator.notification.alert("Registration successfull","Success!")
                        } else {
                          alert("Registration successfull","Success!");
                        }
                    } else if(data.message == 'no')
                    {
                       // window.localStorage.setItem("dod_user_id",data.user_id);
                        if(navigator.notification)
                        {
                          navigator.notification.alert("Registration Fails!","Error!")
                        } else {
                          alert("Registration Fails!","Error!");
                        }
                    }

                    //  displayQuestions();

                }, "json");
            } else {
                 if(navigator.notification)
                        {
                          navigator.notification.alert("You have an existing Profile on platform","Error!")
                        } else {
                          alert("You have an existing Profile on platform","Error!");
                        }
            }

    }


    $("#joinBtn").click(function(){

          registerUser();

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