
//import '../dist/lib/chatplugin.min.css'
import Vue from './vue.min.js'
import BotUI  from'./botui.js'
//import {callControl} from   './cc-api.js'




import '../static/assets/fonts/ionicons.min.css';
import '../static/assets/fonts/simple-line-icons.min.css';

import "../static/assets/css/mfb.css";

import "../static/assets/css/slider.css";
import "../static/assets/css/botui.min.css";
import "../static/assets/css/botui-theme-default.css";




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

bu.talking = true;

if (typeof(Storage) !== "undefined") {
  if (typeof(localStorage.getItem("enterpriseid")) === "undefined") {
   localStorage.setItem("enterpriseid", "anwsi");
 }
   if (typeof(localStorage.getItem("botserver") )=== "undefined") {
     localStorage.setItem("botserver", "http://127.0.0.1:8001");
 }
  if (typeof(localStorage.getItem("botunit")) === "undefined") {
  localStorage.setItem("botunit", bu);
}

}

    bu.payload = {
        "currentNode": "",
        "complete": null,
        "context": {},
        "parameters": [],
        "extractedParameters": {},
        "speechResponse": "",
        "intent": {},
        "input": "init_conversation",
        "missingParameters": [],
        "enterpriseid" : bu.enterpriseId

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
             bu.open_panel();
         });

        $( "#slider" ).mouseleave(function() {
          bu.mouseleave();

         });

         $( "#slider" ).mouseout(function() {
            bu.mouseleave();
         });

         console.log('enterpriseId is: ' + bu.enterpriseId);
         console.log('sessionName is: ' + bu.sessionName);
        // bu.initBot();
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
   bu.payload["enterpriseid"] = bu.enterpriseId;
    bu.payload["input"] = userQuery;
    $.ajax({
        url: '/api/v1',
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
    if (typeof response == 'object') {
       responseObject= response;
    }
    else {
        var parsedResponse = JSON.parse(response);
        responseObject = parsedResponse.responseData;
    }
    put_text(responseObject);
};

  function errorRoutes (x, t, m) {
    var responseObject;
    responseObject = {};
    if(t==="timeout") {
        responseObject["speechResponse"] = "Due to band-width constraints, I'm not able to serve you now, please try again later"
    }else{
        responseObject["speechResponse"] = "I'm not able to serve you at the moment, please try again later"
    }
    put_text(responseObject);
};

  bu.send_get_req=function  (userQuery) {

  bu.payload["input"] = userQuery;
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
   bu.send_req("init_conversation" );


}



bu.initCom= function ()
{


  bu.enterpriseId = localStorage.getItem("enterpriseid");
  bu.sessionName = localStorage.getItem("botsessionId");
  bu.botserver = localStorage.getItem("botServerAddress");


document.write ("<p> From web component conversation.js </p>");
  document.write ("<section class='bot'>");

    document.write ("<ul id='menu' class='mfb-component--br mfb-zoomin' data-mfb-toggle='hover'>");
      document.write ("<li class='mfb-component__wrap'>");
        document.write ("<a data-mfb-label='Let us talk' href='#' class='mfb-component__button--main'>");
          document.write (" <i class='mfb-component__main-icon--resting ion-android-person-add'></i>");
          document.write ("<i class='mfb-component__main-icon--active ion-close-round'></i>");
        document.write ("</a>");
        document.write ("<ul class='mfb-component__list'>");
          document.write ("<li>");
            document.write ("<a type='button' id='talk' data-mfb-label='Talk to us' class='mfb-component__button--child'  >");
              document.write ("<i class='mfb-component__child-icon ion-chatboxes'></i>");
            document.write ("</a>");
          document.write ("</li>");
         document.write ("</li>");
        document.write ("</ul>");
    document.write ("</li>");
  document.write ("</ul>");


  document.write("<div id='slider' style='position:fixed; z-index:auto;top: 10%; right: -372px;'  >" );

   document.write("<div  id='header'  >");
    document.write("<div class='botui-app-container' id='"+bu.sessionName+"' >");
    document.write("<bot-ui></bot-ui>");

   document.write("</div>");
   document.write("</div>");

   document.write("</div>");


bu.initBot();
bu.initC2C();


}


//import {c2c}  from'./callcontrol.js';
//import {callControl}  from'./callcontrol.js';

bu.initC2C =function () {
//  document.write ("<script type='text/javascript'> ");

    callControl.from="2001";
      callControl.to = "6002";
      callControl.rtcServerFriendlyName  = "anwsi";
      callControl.http_service_url  = "devtest2.voiceplex.io";
      callControl.enterpriseid="anwsi";
      callControl.callButtonText = "DirectCall";
      callControl.callButtonUnreacheableText="Server Busy. Please try later";
        /*Initialize and render the button*/
      callControl.init();




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
 		setTimeout(slideIt, 1);
 	}


 }


 bu.close_panel = function (){
 slideIn();

 }

  function slideIn ()
 {
 	var slidingDiv = document.getElementById("slider");
 	var stopPosition = -372;

 	if (parseInt(slidingDiv.style.right) > stopPosition )
 	{
 		slidingDiv.style.right = parseInt(slidingDiv.style.right) - 2 + "px";
 		setTimeout(slideIn, 1);
 	}
}

function resetSlider ()
{
var slidingDiv = document.getElementById("slider");
var stopPosition = -372;

if (parseInt(slidingDiv.style.right) > stopPosition )
{
  slidingDiv.style.right = parseInt(slidingDiv.style.right) - 100 + "px";
  setTimeout(slideIn, 1);
}
}



  bu.mouseleave = function () {

    setTimeout(function () {
    //   $('.copy .wrapper').hide();
    slideIn();
  }, 2000);


 };


 export {
   bu,
   callControl

 };

  //bu.initCom();
