$(document).ready(function() {

    

    var registerUser = function() {
        var name = $("#name").val();
        window.email = $("#email").val();
        var phone = $("#phone").val();
        var about = $("#about").val();
        var gender = $("#gender").val();

         if (window.localStorage.getItem("dod_user_id") === null)
            {
                $.post("http://exolvetechnologies.com/dod/questions/register", 
                    { name: name, email: email, phone: phone, gender: gender, about: about}, 
                  function(data) {
                    if(data.message == 'ok')
                    {
                        window.localStorage.setItem("dod_user_id",data.user_id);
                        if(navigator.notification)
                        {
                          navigator.notification.alert("Registration successfull","","Success!")
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


              //OPEN PAYMENT INTERFACE

              // // your CashEnvoy merchant id
              // var cemertid = 1;

              // // transaction reference which must not contain any special characters. Numbers and alphabets only.
              //  var cetxref = 'A11232132133242';

              // // transaction amount
              // var ceamt = 1000.00;

              // // customer id does not have to be an email address but must be unique to the customer
              // var cecustomerid = email; 

              // // a description of the transaction
              // var cememo = 'A year subscription to Doctor on Demand App';

              // // notify url - absolute url of the page to which the user should be directed after payment
              // // an example of the code needed in this type of page can be found in example_requery_usage.php
              // var cenurl = 'http://exolvetechnologies.com/dod/home/success'; 

              // var ce_window = 'self';



              // $.post("https://www.cashenvoy.com/sandbox/?cmd=cepay",
              //   { ce_merchantid: cemertid, 
              //     ce_transref: cetxref, 
              //     ce_amount: ceamt, 
              //     ce_customerid: cecustomerid, 
              //     ce_memo: cememo, 
              //     ce_notifyurl: cenurl, 
              //     ce_window: ce_window }, function(data){



              //   },"json");

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
      console.log('btn clicked');
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