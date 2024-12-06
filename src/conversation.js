
//import '../dist/lib/chatplugin.min.css'

var jquery = require ('./jquery.min.js');

import Vue from './vue.min.js'
import BotUI  from'./botui.js'

import '../static/assets/fonts/ionicons.min.css';
import '../static/assets/fonts/simple-line-icons.min.css';

import "../static/assets/css/mfb.css";

import "../static/assets/css/slider.css";
import "../static/assets/css/botui.min.css";
import "../static/assets/css/botui-theme-default.css";


//var cc = require ('./callcontrol.js');
import {callControl} from   './callcontrol.js';
import {dbcontroller} from   './dbcontroller.js';
var bu = {};


bu.msgIndex =0;

bu.payload={};
bu.talking = true;
bu.chatwindowopen= false;
bu.sessionName = "botsession";
bu.enterpriseId="enterprise";
bu.bot="";
bu.botserver="127.0.0.1";
bu.vm="";
bu.maxUnrecognitionAttempt="3";
bu.talking = true;

if (typeof(Storage) !== "undefined") {
  if (typeof(localStorage.getItem("enterpriseid")) === "undefined") {
   localStorage.setItem("enterpriseid", "anwsi");
 }
   if (typeof(localStorage.getItem("botserver") )=== "undefined") {
     localStorage.setItem("botserver", "http://127.0.0.1:9080");
 }
  if (typeof(localStorage.getItem("botunit")) === "undefined") {
  localStorage.setItem("botunit", bu);
}
if (typeof(localStorage.getItem("maxUnrecognitionAttempt")) === "undefined") {
localStorage.setItem("maxUnrecognitionAttempt", 3);
}

}

    bu.payload = {
      "enterprise_name": "",
      "bot_name": "",
       "currentNode": "",
        "complete": false,
        "sequence_id" : 0,
        "context": {},
        "parameters": [],
        "extractedParameters": {},
        "speechResponse": "",
        "intent": {},
        "input": "hi",
        "query": "hello",
        "missingParameters": [],
        "inputHistory" : [],
        "resultHistory" : [],
        "maxUnrecognitionAttempt": bu.maxUnrecognitionAttempt,
        "trackerId" : bu.generateTrackerId,
        "errorCounter" : 0

    }



$(document).ready(function () {


  $('#btn-stories').click(function () {
         userQuery = $("#btn-story-input").val();
         $("#btn-story-input").val("");

         send_get_req(userQuery);
     })

 $('#btn-story-input').keydown(function (e) {
         if (e.keyCode == 13) {
             userQuery = $("#btn-story-input").val();
             $("#btn-story-input").val("");
             send_get_req(userQuery);

         }
     })


     $('#talk').click(function () {

          resetSlider();
          //bu.payload.trackerId = bu.generateTrackerId();
             bu.open_panel();
         });

            $('#mainbutton').click(function () {

                   bu.close_panel()
              });

      $('#cc_btn_call').click(function () {
                document.getElementById("btnKeyPad").enabled = true;
                 callControl.onClickCallButton();
             });

             $('#btnKeyPad').click(function () {

                        callControl.openKeyPad();
                    });


             $( "#slider" ).mouseenter(function() {

                  bu.open_panel();

              });

        $( "#slider" ).mouseleave(function() {
         // bu.mouseleave();
          callControl.closeKeyPad();
         });
		

         $('#keyPadClose').click(function () {

                    callControl.closeKeyPad();
                });

		$(document).keyup(function(e) {
			if (e.key == "Escape") { 
				slideIn();;
			}
			
		});

/*         $( "#slider" ).mouseout(function() {
            bu.mouseleave();
         });
*/
         console.log('enterpriseName is: ' + bu.enterpriseId);
         console.log('service name is: ' + bu.sessionName);

         bu.initBot();

         bu.initC2C();


});


 function getTime (){
 var dt = new Date();
   var h =  dt.getHours(), m = dt.getMinutes();
   var stime = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
    return stime;
}
 bu.send_req=function  (userQuery) {
   console.log('conversation enterpriseId is: ' + bu.enterpriseId);
   console.log('conversation sessionName is: ' + bu.sessionName);
   bu.payload["enterprise_name"] = bu.enterpriseId;
   bu.payload["bot_name"]=bu.sessionName;
   bu.payload.inputHistory.unshift(userQuery);
    bu.payload["input"] = userQuery;
    bu.payload["query"] = userQuery;

    $.ajax({
        url: 'http://'+bu.botserver+'/api/v1',
        type: 'POST',
        data: JSON.stringify(bu.payload),
        contentType: 'application/json; charset=utf-8',
        datatype: "json",
        success: successRoutes,
        error: errorRoutes,
    });
    return true;

};


  function successRoutes (response) {

    var responseObject;
    var respMessage = "";
    var textMsg ="";

  ///  if (typeof response == 'object') {
      responseObject = response;
   //    respMessage= responseObject[0];
   respMessage= responseObject;
   bu.payload = responseObject;
         try {
          bu.payload.sequence_id = respMessage['sequence_id']; 
         textMsg = respMessage['speechResponse'];
         if ((textMsg) && (textMsg.includes("#calltransfer")) )
         {
           callControl.onClickCallButton();
         }
         else if ((textMsg) && !(textMsg.includes("#calltransfer")) )
         {
           bu.payload.speechResponse =  textMsg;
           bu.payload.resultHistory.unshift(textMsg);
           //reset serror counter
           bu.payload.errorCounter=0;
           put_text(bu.payload);
         }
       }
       catch (err)
       {
          textMsg = "Sorry, I have some trouble. Let me start again";
          bu.payload.speechResponse =  textMsg;
          bu.payload.sequence_id = 0; 
          put_text(bu.payload);
          bu.payload.trackerId = bu.generateTrackerId();
           bu.send_req("Hello" );
       }





/*
    }
    else {
        var parsedResponse = JSON.parse(response);
        responseObject = parsedResponse.responseData;
        bu.payload= responseObject;
    }
*/

};

  function errorRoutes (x, t, m) {
    var responseObject;
    responseObject = {};
    responseObject=bu.payload;
    bu.payload.resultHistory.unshift(responseObject["speechResponse"]);
    //reset serror counter
    bu.payload.errorCounter=(bu.payload.errorCounter)++;

    if(t==="timeout") {
        responseObject["speechResponse"] = "Due to band-width constraints, I'm not able to serve you now, please try again later"
    }
    else if (bu.payload.errorCounter >= bu.payload.maxUnrecognitionAttempt)
    {
      responseObject["speechResponse"] = "I am having difficulty to understand. I shall connect you an expert";
      //make call
      //callControl.onClickCallButton();
    }
    else{
        responseObject["speechResponse"] = "I'm not able to serve you at the moment, please try again later."
        responseObject["speechResponse"] = "Alternatively Please say agent or transfer I can connect you to an expert through voice. "
    }
    bu.payload.sequence_id = 0; 
    put_text(responseObject);
};

  bu.send_get_req=function  (userQuery) {

  bu.payload.inputHistory.unshift(userQuery);
  bu.payload["input"] = userQuery;
  bu.payload["query"] = userQuery;
  enterpriseId=bu.enterpriseId;
  window.open(bu.botserver+"/stories/manage/"+enterpriseId+"/"+userQuery);
  $.ajax({
        url: bu.botserver+"/stories/manage/"+enterpriseId+"/"+userQuery,
        type: 'GET',
        data: JSON.stringify(bu.payload),
        contentType: 'application/json; charset=utf-8',
        datatype: "json"


    });

};

bu.initBot =function  ()
{
resetSlider();
bu.bot  = new BotUI(bu.sessionName,  { vue: Vue});
//bu.bot  = new BotUI(bu.sessionName, { vue: bu.vm} );
  bu.payload.trackerId = bu.generateTrackerId();
   bu.send_req("Hello" );

document.getElementById("btnKeyPad").disabled = true;

}



bu.initCom= function ()
{


  bu.enterpriseId = localStorage.getItem("enterpriseid");
  bu.sessionName = localStorage.getItem("botsessionId");
  bu.botserver = localStorage.getItem("botServerAddress");
  bu.maxUnrecognitionAttempt = localStorage.getItem("maxUnrecognitionAttempt");
//callControl.http_service_url = localStorage.getItem("http_service_address");

//document.write ("<p> From web component conversation.js </p>");
  document.write ("<section class='bot'>");

    document.write ("<ul id='menu' class='mfb-component--br mfb-zoomin' data-mfb-toggle='hover'>");
      document.write ("<li class='mfb-component__wrap'>");
        document.write ("<a id='mainbutton' data-mfb-label='Let us talk' href='#' class='mfb-component__button--main'>");
          document.write (" <i class='mfb-component__main-icon--resting ion-android-person-add'></i>");
          document.write ("<i class='mfb-component__main-icon--active ion-close-round' ></i>");
        document.write ("</a>");
        document.write ("<ul class='mfb-component__list'>");
          document.write ("<li>");
            document.write ("<a type='button' id='talk' data-mfb-label='Chat to us' class='mfb-component__button--child'  >");
              document.write ("<i class='mfb-component__child-icon ion-chatboxes'></i>");
            document.write ("</a>");
          document.write ("</li>");

          document.write ("<li>");
            document.write ("<a type='button' id='cc_btn_call' data-mfb-label='Talk to us' class='mfb-component__button--child'  >");
              document.write ("<i class='mfb-component__child-icon ion-ios-telephone'></i>");
            document.write ("</a>");
          document.write ("</li>");

          document.write ("<li>");
            document.write ("<a type='button' id='btnKeyPad' data-mfb-label='Tel Key Pad ' class='mfb-component__button--child'  >");
              document.write ("<i class='mfb-component__child-icon ion-ios-keypad'></i>");
            document.write ("</a>");
          document.write ("</li>");

         document.write ("</li>");
        document.write ("</ul>");
    document.write ("</li>");
  document.write ("</ul>");


  document.write("<div id='slider' style='position:fixed; z-index:10000;top: 10%; right: -472px;'  >" );

   document.write("<div  id='header'  >");
    document.write("<div class='botui-app-container' id='"+bu.sessionName+"' >");
    document.write("<bot-ui></bot-ui>");

   document.write("</div>");
   document.write("</div>");

   document.write("</div>");


             document.write(
               "<div id='divKeyPad' class='span2 well div-keypad' style='left:0px; top:0px; width:250; height:240; visibility:hidden'>"
               );
              document.write(
                   "<table style='width: 30%; height: 100%'>"
               );
             document.write(
                       "<tr><td><input type='button' id='btnKeyPad1' style='width: 10%' class='btn' value='1' />"+
                 "<input type='button' id='btnKeyPad2' style='width: 10%' class='btn' value='2'  />"+
                 "<input type='button' id='btnKeyPad3' style='width: 10%' class='btn' value='3'  />"+
                 "</td></tr>"+
                 "<tr><td><input type='button' id='btnKeyPad4' style='width: 10%' class='btn' value='4' />"+
                 "<input type='button' id='btnKeyPad5' style='width: 10%' class='btn' value='5'  />"+
                 "<input type='button' id='btnKeyPad6' style='width: 10%' class='btn' value='6'  />"+
                 "</td></tr>"+
                 "<tr><td><input type='button' id='btnKeyPad7' style='width: 10%' class='btn' value='7' />"+
                 "<input type='button' id='btnKeyPad8' style='width: 10%' class='btn' value='8'  />"+
                 "<input type='button' id='btnKeyPad9' style='width: 10%' class='btn' value='9'  />"+
                 "</td></tr>"+
                 "<tr><td><input type='button' id='btnKeyPad*' style='width: 10%' class='btn' value='*' />"+
                 "<input type='button' id='btnKeyPad0' style='width: 10%' class='btn' value='0'  />"+
                 "<input type='button' id='btnKeyPad#' style='width: 10%' class='btn' value='#'  />"+
                 "</td></tr>"+
                 "<tr><td colspan=3><input type='button' id='keyPadClose' style='width: 30%' class='btn btn-medium btn-danger' value='close' ' /></td></tr>"+
                 "</table>"
                 );

               document.write( "</div>");





//bu.initBot();

//bu.initC2C();

}


//import {c2c}  from'./callcontrol.js';
//import {callControl}  from'./callcontrol.js';

bu.initC2C = async function () {

//  document.write ("<script type='text/javascript'> ");

    callControl.from=localStorage.getItem("sip_from");
      callControl.to = localStorage.getItem("sip_to");
      callControl.rtcServerFriendlyName  = localStorage.getItem("enterpriseid");
      callControl.http_service_url  = localStorage.getItem("http_service_address");
      callControl.enterpriseid=localStorage.getItem("enterpriseid");
      /*callControl.callButtonText = "DirectCall";
      callControl.callButtonUnreacheableText="Server Busy. Please try later";
      */
        /*Initialize and render the button*/
        try {
          const response = await  callControl.init();
    }
    catch (err) {
        console.log('Voice Call Init failed', err);

      }

  //bu.initCom();



}


function Speech(say) {
  if ('speechSynthesis' in window && bu.talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //utterance.volume = 1; // 0 to 1
    // utterance.rate = 0.9; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}
function put_text (bot_say) {

     bu.payload  = bot_say;
    // Speech(bot_say["speechResponse"]);

     showAndCollect(bot_say["speechResponse"]);
 };


function showMessage( message) {

  bu.bot.message.bot({
    content: message

  });
};



function showAndCollect (message) {
  bu.bot.message.bot({
    content: message

  }).then (function (index) {
      return bu.bot.action.text({ // show 'text' action
      action: {
          placeholder: bu.payload.missingParameters[0]
        }
      }).then(function (res) { // get the result
        var userInput = res.value;
        //post message and get response
          bu.send_req(userInput);


    });
 });
}

function openChatWindow()
{
  bu.open_panel();
}
  bu.open_panel=function()
 {

   slideIt();
}

  function slideIt ()
 {

 	var slidingDiv = document.getElementById("slider");
 	var stopPosition = 0;

 	if (parseInt(slidingDiv.style.right) < stopPosition )
 	{
 		slidingDiv.style.right = parseInt(slidingDiv.style.right) + 2 + "px";
 	//	setTimeout(slideIt, 1);
  slideIt();
 	}


 }


 bu.close_panel = function (){
   callControl.closeKeyPad();
 slideIn();

 }

  function slideIn ()
 {
 	var slidingDiv = document.getElementById("slider");
 	var stopPosition = -572;

 	if (parseInt(slidingDiv.style.right) > stopPosition )
 	{
 		slidingDiv.style.right = parseInt(slidingDiv.style.right) - 2 + "px";
 		setTimeout(slideIn, 1);
 	}
  callControl.closeKeyPad();
}

function resetSlider ()
{
var slidingDiv = document.getElementById("slider");
var stopPosition = -372;

if (parseInt(slidingDiv.style.right) > stopPosition )
{
  slidingDiv.style.right = parseInt(slidingDiv.style.right) - 100 + "px";
  //setTimeout(slideIn, 1);
}
}



  bu.mouseleave = function () {

    setTimeout(function () {
    //   $('.copy .wrapper').hide();
    slideIn();
  }, 2000);


 };
 
 
 bu.generateTrackerId = function () {
   var _id= Math.floor(Date.now() / 1000) ;
   return _id;
 };


 export {
   bu,
   callControl

 };
