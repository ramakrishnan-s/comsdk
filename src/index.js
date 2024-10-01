
//import Vue from './vue.min.js'
//import BotUI from './botui.js'
//import {mfb} from './chatplugin.min.js'

import {bu} from './conversation.js';


//import '../static/assets/css/chatplugin.min.css'

//require ('../index.html');

/*var conversationScriptUrl= 'http://127.0.0.1:5050/js/conversation.js';
var botObj=bu;

var enterpriseName = 'ansi';
var botServerAddress = 'basubrarm';
var botsessionId = 'chat';
var http_service_address = 'basubrarm'
*/

      localStorage.setItem("enterpriseid", "onexp");
      localStorage.setItem("botServerAddress","127.0.0.1:9080");
      localStorage.setItem("botsessionId","voice");
      localStorage.setItem("http_service_address", "127.0.0.1:9090");
      localStorage.setItem("sip_from", "1001-38");
      localStorage.setItem("sip_to", "2064086005");
      localStorage.setItem("maxUnrecognitionAttempt", "3");

/*
      $.getScript( conversationScriptUrl )
        .done(function( script, textStatus ) {
          console.log( textStatus );
          botObj= script.bu;
          botObj.initCom();
        })
        .fail(function( jqxhr, settings, exception ) {
          $( "div.log" ).text( "Triggered ajaxError handler." );
      });
*/



/*
function initVue() {

  var enterpriseName ="anwsi";
  var botServerAddress ="192.168.0.7";
  var botsessionId = 'chat';

  localStorage.setItem("enterpriseid", enterpriseName);
  localStorage.setItem("botServerAddress", botServerAddress );
  localStorage.setItem("sessionId", botsessionId);


    var  vm = new Vue({
           components: {
        		'mfb': mfb

            }
          });
//vm.$refs.bu.initCom();

}
function chat() {

  var chatDiv = document.createElement('div');


document.write("<div  id='header'  >");
  document.write("<div class='botui-app-container' id='chat'>");
  document.write("<bot-ui></bot-ui>");

 document.write("</div>");
 document.write("</div>");
 document.write("</div>");





/* var bot = new BotUI('chat', {
   vue: Vue // pass the dependency.
 });

var bot= bu.bot;
 bot.message.add({
   content: 'Hello I am a  bot!'
 });

 bot.message.add({
   human: true,
   content: 'How are you!'
 });

}
*/

bu.initCom();

//bu.initBot();
//bu.initC2C();
