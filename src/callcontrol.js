//document.write(unescape("%3Cscript src='https://www.doubango.org/click2dial/SIPml-api.js' type='text/javascript'%3E%3C/script%3E"));
/*document.write(unescape("%3Cscript src='http://127.0.0.1:8080/clicktocall/release/SIPml-api.js' type='text/javascript'%3E%3C/script%3E"));

//document.write(unescape("%3Cscript src='./assets/js/dbcontroller.js' type='text/javascript'%3E%3C/script%3E"));
//document.write(unescape("%3Cscript src='./assets/js/SIPml-api.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='./SIPml.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='./tinySAK/src/tsk_utils.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='./tinyMEDIA/src/tmedia_webrtc4all.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='./tinySIP/src/tsip_api.js' type='text/javascript'%3E%3C/script%3E"));
*/
//import  './cc-api.js'
/*import  './SIPml5.js'
import  './tinySAK/src/tsk_utils.js'
import  './tinyMEDIA/src/tmedia_webrtc4all.js'
import  './tinySIP/src/tsip_api.js'
*/
import {dbcontroller} from   './dbcontroller.js';

  var tag_hdr = document.getElementsByTagName('head')[0];
['https://www.doubango.org/click2dial/SIPml-api.js'].forEach(function (file) {
    var tag_script = document.createElement('script');
    tag_script.setAttribute('type', 'text/javascript');
    tag_script.setAttribute('src', file);
    tag_hdr.appendChild(tag_script);
});

//import {bu} from './conversation.js'
var c2c= {};
/*
if(!window.c2c){
    c2c = { debug: true };


}*/
c2c.config = {};
c2c.started = false;
c2c.callSession = null;





c2c.add_html_elts = function(parent, elements) {
    var tag_parent = document.getElementsByTagName(parent)[0];
    elements.forEach(function (element) {
        var tag_elt = document.createElement(element.type);
        element.attributes.forEach(function (attribute) {
            tag_elt.setAttribute(attribute.name, attribute.value);
        });
        var s = document.getElementsByTagName(element.type);
        if(s && s.length > 0){
            s[0].parentNode.insertBefore(tag_elt, s[0]);
        }
        else{
            tag_parent.appendChild(tag_elt);
        }
    });
};

if(c2c.debug){
    c2c.add_html_elts('head',
        [
            { type: 'script', attributes: [{ name: 'type', value: 'text/javascript' }, { name: 'src', value: 'js/c2c-base64.js' }] },
            { type: 'script', attributes: [{ name: 'type', value: 'text/javascript' }, { name: 'src', value: 'js/c2c-md5.js' }] }
        ]
    );
}
/*else{ // release
c2c.add_html_elts('body',
        [
            { type: 'link', attributes: [{ name: 'href', value: 'assets/css/bootstrap.css' }, { name: 'rel', value: 'stylesheet' }] },
            { type: 'link', attributes: [{ name: 'href', value: 'assets/css/bootstrap-responsive.css' }, { name: 'rel', value: 'stylesheet' }] }
        ]
    );
}*/

/**
@namespace
@description Root namesapce.
*/
var callControl = {};
callControl.from='';
callControl.to = '';
callControl.publicIdentity='';
callControl.rtcServerFriendlyName  = '';
callControl.enterpriseid='';

callControl.callButtonText='';
callControl.callButtonUnreacheableText='';
callControl.realm='';
callControl.websocket_proxy_url='';
callControl.sipProxyAddress ='';
callControl.sip_outbound_proxy_url='';
callControl.sipPort='';
callControl.webRTCPort='';
callControl.http_service_url='';
callControl.password='';
callControl.callType='';
callControl.button_call;
callControl.keypad;
		var sTransferNumber;
        var oRingTone, oRingbackTone;
        var oSipStack, oSipSessionRegister, oSipSessionCall, oSipSessionTransferCall;
        var videoRemote, videoLocal, audioRemote;
        var bFullScreen = false;
        var oNotifICall;
        var bDisableVideo = false;
        var viewVideoLocal, viewVideoRemote, viewLocalScreencast; // <video> (webrtc) or <div> (webrtc4all)
        var oConfigCall;
        var oReadyStateTimer;

        var C =
        {
            divKeyPadWidth: 220
        };




 callControl.init= async function  () {
/*
  var sipmlUrl='https://www.doubango.org/click2dial/SIPml-api.js';
  var tag_hdr = document.getElementsByTagName('head')[0];
      var tag_script = document.createElement('script');
    tag_script.setAttribute('type', 'text/javascript');
    tag_script.setAttribute('src', sipmlUrl);
    tag_hdr.appendChild(tag_script);
    */
                  callControl.setCallWidget();

    /*try {
      //const response = await fetch(sipmlUrl,{'mode': 'no-cors'});
      const response = await fetch(sipmlUrl);
    console.log(await response.text());
                    callControl.setCallWidget();
                    return '1';
    }
    catch (err) {
    console.log('fetch failed', err);
              return '0';
  }*/
/*
             $.getScript( sipmlUrl )
               .done(function( script, textStatus ) {
                 console.log( textStatus );
                  callControl.setCallWidget();

                              videoLocal = document.getElementById("video_local");
                              videoRemote = document.getElementById("video_remote");
                              audioRemote = document.getElementById("audio_remote");


                              window.console && window.console.info && window.console.info("location=" + window.location);

                              // set debug level
                              SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('org.doubango.expert.disable_debug') == "true") ? "error" : "info");

               })
               .fail(function( jqxhr, settings, exception ) {
                 $console.log( "Triggered ajaxError handler." );
             });
*/
            var getPVal = function (PName) {
                var query = window.location.search.substring(1);
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]) === PName) {
                        return decodeURIComponent(pair[1]);
                    }
                }
                return null;
            }

            var preInit = function () {
                // set default webrtc type (before initialization)
                var s_webrtc_type = getPVal("wt");


                var s_mbwu = getPVal("mbwu"); // maxBandwidthUp (kbps)
                var s_mbwd = getPVal("mbwd"); // maxBandwidthUp (kbps)
                var fromUsr = getPVal("from");
                var toUsr = getPVal("to");

                callControl.callType=  'call-audio'; //only audio call for now
				if (s_webrtc_type) SIPml.setWebRtcType(s_webrtc_type);

					tsk_utils_log_info('from ' + callControl.from);
					tsk_utils_log_info('to'+ callControl.to);

					$.when(dbcontroller.getServerDetails()).done ( function () {

					$.when(dbcontroller.getClientDetails()).done( function () {

							tsk_utils_log_info('init sip stack');

							SIPml.init(postInit);
					});
				});
		//	 }


                // set other options after initialization

                if (s_mbwu) SIPml.setMaxBandwidthUp(parseFloat(s_mbwu));
                if (s_mbwd) SIPml.setMaxBandwidthDown(parseFloat(s_mbwd));

            }

            oReadyStateTimer = setInterval(function () {
                if (document.readyState === "complete") {
                    clearInterval(oReadyStateTimer);
                    // initialize SIPML5
                    preInit();
                }
            },
            500);


        }

        function postInit() {

			document.onkeyup = onKeyUp;
            document.body.onkeyup = onKeyUp;

			//save the credentials in data store
			callControl.saveCredentials();

            // check for WebRTC support
            if (!SIPml.isWebRtcSupported()) {
                // is it chrome?
                if (SIPml.getNavigatorFriendlyName() == 'chrome') {
                    if (confirm("You're using an old Chrome version or WebRTC is not enabled.\nDo you want to see how to enable WebRTC?")) {
                        window.location = 'http://www.webrtc.org/running-the-demos';
                    }

                    return;
                }
                else {
                    if (confirm("webrtc-everywhere extension is not installed. Do you want to install it?\nIMPORTANT: You must restart your browser after the installation.")) {
                        window.location = 'https://github.com/sarandogou/webrtc-everywhere';
                    }

                }
            }

            // checks for WebSocket support
            if (!SIPml.isWebSocketSupported()) {
                if (confirm('Your browser don\'t support WebSockets.\nDo you want to download a WebSocket-capable browser?')) {
                    window.location = 'https://www.google.com/intl/en/chrome/browser/';
                }

                return;
            }



            if (!SIPml.isWebRtcSupported()) {
                if (confirm('Your browser don\'t support WebRTC.\naudio/video calls will be disabled.\nDo you want to download a WebRTC-capable browser?')) {
                    window.location = 'https://www.google.com/intl/en/chrome/browser/';
                }
            }

               oConfigCall = {
                audio_remote: audioRemote,
               // video_local: viewVideoLocal,
               // video_remote: viewVideoRemote,
               // screencast_window_id: 0x00000000, // entire desktop
                bandwidth: { audio: undefined, video: undefined },
               // video_size: { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined },
                events_listener: { events: '*', listener: onSipEventSession },
                sip_caps: [
                                { name: '+g.oma.sip-im' },
                                { name: 'language', value: '\"en,fr\"' }
                ]
            };
        }



callControl.setCallWidget =function  () {

var tag_hdr = document.getElementsByTagName('body')[0];
   callControl.audio_remote = document.createElement('audio');
   callControl.audio_remote.setAttribute('id', 'audio_remote');
   callControl.audio_remote.setAttribute('autoplay', 'autoplay');
    callControl.audio_remote.autoplay = "autoplay";
	tag_hdr.appendChild(callControl.audio_remote);

/*
	document.write(
        "<a href='#' class='btn btn-large btn-success' id='cc_btn_call' style= 'position:fixed;   z-index:auto;  top: 20%; right: -30px; -webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg);'>call &raquo;</a>"

	);

	document.write(
	"<input type='button' class='btn btn-large btn-blue'  id='btnKeyPad' value='KeyPad' style= 'position:fixed;   z-index:auto; top: 50%; right: -30px; -webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg);' onclick='callControl.openKeyPad();' />"
	);

	    // Glass Panel
    document.write("<div id='divGlassPanel' class='glass-panel' style='visibility:hidden'></div>");
*/
	  // KeyPad Div
    //set main Call Button
      callControl.button_call = document.getElementById('cc_btn_call');
/*
	document.write(
    "<div id='divKeyPad' class='span2 well div-keypad' style='left:0px; top:0px; width:250; height:240; visibility:hidden'>"
		);
	 document.write(
        "<table style='width: 100%; height: 100%'>"
		);
	document.write(
            "<tr><td><input type='button' id='btnKeyPad1' style='width: 33%' class='btn' value='1' />"+
			"<input type='button' id='btnKeyPad2' style='width: 33%' class='btn' value='2'  />"+
			"<input type='button' id='btnKeyPad3' style='width: 33%' class='btn' value='3'  />"+
			"</td></tr>"+
			"<tr><td><input type='button' id='btnKeyPad4' style='width: 33%' class='btn' value='4' />"+
			"<input type='button' id='btnKeyPad5' style='width: 33%' class='btn' value='5'  />"+
			"<input type='button' id='btnKeyPad6' style='width: 33%' class='btn' value='6'  />"+
			"</td></tr>"+
			"<tr><td><input type='button' id='btnKeyPad7' style='width: 33%' class='btn' value='7' />"+
			"<input type='button' id='btnKeyPad8' style='width: 33%' class='btn' value='8'  />"+
			"<input type='button' id='btnKeyPad9' style='width: 33%' class='btn' value='9'  />"+
			"</td></tr>"+
			"<tr><td><input type='button' id='btnKeyPad*' style='width: 33%' class='btn' value='*' />"+
			"<input type='button' id='btnKeyPad0' style='width: 33%' class='btn' value='0'  />"+
			"<input type='button' id='btnKeyPad#' style='width: 33%' class='btn' value='#'  />"+
			"</td></tr>"+
			"<tr><td colspan=3><input type='button' style='width: 100%' class='btn btn-medium btn-danger' value='close' onclick='callControl.closeKeyPad();' /></td></tr>"+
			"</table>"
			);

		document.write( "</div>");
*/
	//set keypad
	/*
	callControl.keypad= document.getElementById('btnKeyPad');
	callControl.keypad.onclick= function () { callControl.openKeyPad() };
	*/
	//set key pad actions
	callControl.setKeyPadActions();

    if(callControl.cls){
        callControl.button_call.setAttribute("class", callcontrol.cls);
    }

    //callControl.button_call.innerHTML = callControl.button_call._innerHTML = callControl.text ? callControl.text : 'call ' + callControl.enterpriseid +' &raquo;';
    //callControl.button_call.innerHTML = callControl.text ? callControl.text : 'call ' + callControl.enterpriseid +' &raquo;';
	callControl.button_call.onclick =  function () { callControl.onClickCallButton() };
	/*if (callControl.callButtonText != '')
	{
		callControl.button_call.text = callControl.callButtonText;
	}*/

	  c2c.cls = 'btn btn-large btn-success';
	  c2c.glass = true;


	return;

		}


 callControl.onClickCallButton =   function () {
	 //if not registered just ignore
	 if (!oSipSessionRegister && !oSipSessionCall )
	 {
		callControl.sipRegister();


		 return;
	 }
	 //if  registered and no sip call dession in progress then initiate call
	 else if ((oSipSessionRegister) && !oSipSessionCall )
	 {
		 callControl.sipUnRegister();
		 callControl.sipRegister();

	 }
	 //if  sip call session is in progress then disconnect
	 else if (oSipSessionCall !=null)
	 {
		 callControl.sipHangUp();
		 callControl.sipUnRegister();
		// callControl.init();
	 }
 }


callControl.setKeyPadActions =   function () {

	callControl.keypad1= document.getElementById('btnKeyPad1');
	callControl.keypad1.onclick= function () { callControl.sipSendDTMF('1') };
	callControl.keypad2= document.getElementById('btnKeyPad2');
	callControl.keypad2.onclick= function () { callControl.sipSendDTMF('2') };
	callControl.keypad3= document.getElementById('btnKeyPad3');
	callControl.keypad3.onclick= function () { callControl.sipSendDTMF('3') };
	callControl.keypad4= document.getElementById('btnKeyPad4');
	callControl.keypad4.onclick= function () { callControl.sipSendDTMF('4') };

	callControl.keypad5= document.getElementById('btnKeyPad5');
	callControl.keypad5.onclick= function () { callControl.sipSendDTMF('5') };
	callControl.keypad6= document.getElementById('btnKeyPad6');
	callControl.keypad6.onclick= function () { callControl.sipSendDTMF('6') };
	callControl.keypad7= document.getElementById('btnKeyPad7');
	callControl.keypad7.onclick= function () { callControl.sipSendDTMF('7') };
	callControl.keypad8= document.getElementById('btnKeyPad8');
	callControl.keypad8.onclick= function () { callControl.sipSendDTMF('8') };

	callControl.keypad9= document.getElementById('btnKeyPad9');
	callControl.keypad9.onclick= function () { callControl.sipSendDTMF('9') };
	callControl.keypad0= document.getElementById('btnKeyPad0');
	callControl.keypad0.onclick= function () { callControl.sipSendDTMF('0') };
	callControl.keypad_star= document.getElementById('btnKeyPad*');
	callControl.keypad_star.onclick= function () { callControl.sipSendDTMF('*') };
	callControl.keypad_hash= document.getElementById('btnKeyPad#');
	callControl.keypad_hash.onclick= function () { callControl.sipSendDTMF('#') };
}

 callControl.saveCredentials =   function () {
            if (window.localStorage) {
                window.localStorage.setItem('org.doubango.identity.display_name', callControl.from);
                window.localStorage.setItem('org.doubango.identity.impi', callControl.from);
                window.localStorage.setItem('org.doubango.identity.impu', "sip:"+callControl.from+"@"+callControl.enterpriseid);
                window.localStorage.setItem('org.doubango.identity.password', callControl.password);
                window.localStorage.setItem('org.doubango.identity.realm', callControl.enterpriseid);
            }
        };


        // sends SIP REGISTER request to login
        callControl.sipRegister =   function () {
            // catch exception for IE (DOM not ready)
            try {

                if (!(callControl.realm) || !(callControl.from) || !(callControl.publicIdentity)) {
                    //callControl.button_call.innerHTML ='Invalid credentials';
					           callControl.button_call.disabled = true;
                    return;
                }
                var o_impu = tsip_uri.prototype.Parse(callControl.publicIdentity);
                if (!o_impu || !o_impu.s_user_name || !o_impu.s_host) {
                    //callControl.button_call.innerHTML  = 'Invalid Id' ;
                    callControl.button_call.disabled = true;
                    return;
                }

                // enable notifications if not already done
                if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
                    window.webkitNotifications.requestPermission();
                }

                // create SIP stack
                oSipStack = new SIPml.Stack({
                    realm: callControl.realm,
                    impi: callControl.from,
                    impu: callControl.publicIdentity,
                    password: callControl.password,
                    display_name: callControl.from,
                    websocket_proxy_url:callControl.websocket_proxy_url ,
                    outbound_proxy_url: callControl.sip_outbound_proxy_url,
                    //ice_servers: (window.localStorage ? window.localStorage.getItem('org.doubango.expert.ice_servers') : null),
					//ice_servers:"[{ url: 'stun:stun.l.google.com:19302'}, { url:'turn:user@numb.viagenie.ca', credential:'myPassword'}]",
            // ***   temporarily modified for local testing.. note ICE server is must for real testing
              //  ice_servers:"[{ url: 'stun:64.15.185.84:3478'}, { url:'turn:64.15.185.84:3478', username:'venk',credential:'rama'}]",
                ice_servers:"[]",
          i_port:callControl.webRTCPort,
					s_proxy:callControl.sipProxyAddress,


				   enable_rtcweb_breaker:  false,
                    events_listener: { events: '*', listener: onSipEventStack },
                    enable_early_ims:  true, // Must be true unless you're using a real IMS network
                    enable_media_stream_cache:  false,

                    sip_headers: [
                            { name: 'User-Agent', value: 'Web2Call-client/OMA1.0 ' },
                            { name: 'Organization', value: callControl.enterpriseid }
                    ]
                }
                );
                if (oSipStack.start() != 0) {

					callControl.button_call.disabled = false;
					//callControl.button_call.innerHTML= 'Error. Retry';
				}

                else {
					//callControl.button_call.innerHTML=callControl.callButtonText;
					return;
				}
            }
            catch (e) {
				callControl.button_call.disabled = false;
                //callControl.button_call.innerHTML= 'Error. Retry';
            }
            callControl.button_call.disabled = false;
			//callControl.button_call.innerHTML=callControl.callButtonText;
        }

        // sends SIP REGISTER (expires=0) to logout
callControl.sipUnRegister=function () {
            if (oSipStack) {
                oSipStack.stop(); // shutdown all sessions
            }
        }

        // makes a call (SIP INVITE)
callControl.sipCall=   function (s_type) {
            if (oSipStack && !oSipSessionCall && !tsk_string_is_null_or_empty(callControl.to)) {
                // create call session
                oSipSessionCall = oSipStack.newSession(s_type, oConfigCall);
                // make call
                if (oSipSessionCall.call(callControl.to) != 0) {
                    oSipSessionCall = null;

					callControl.button_call.disabled = false;
					//callControl.button_call.innerHTML='Failed to make call';
                    //callControl.button_call.innerHTML= '<i>'+callControl.callButtonText+'</i>';
                    return;
                }

            }
            else if (oSipSessionCall) {
                //callControl.button_call.innerHTML = '<i>Connecting...</i>';
                oSipSessionCall.accept(oConfigCall);
            }
        }

          // terminates the call (SIP BYE or CANCEL)
callControl.sipHangUp=function () {
            if (oSipSessionCall) {
                //callControl.button_call.innerHTML = '<i>Terminating...</i>';
                oSipSessionCall.hangup({ events_listener: { events: '*', listener: onSipEventSession } });

			callControl.button_call.disabled = false;
			//callControl.button_call.innerHTML= '<i>'+callControl.callButtonText+'</i>';;
			}
			callControl.sipUnRegister();
			//callControl.init();
        }

        callControl.sipSendDTMF=function (c) {

            if (oSipSessionCall && c) {
                if (oSipSessionCall.dtmf(c) == 0) {
                    try { dtmfTone.play(); } catch (e) { }
                }
            }

        }

        function startRingTone() {
            try { ringtone.play(); }
            catch (e) { }
        }

        function stopRingTone() {
            try { ringtone.pause(); }
            catch (e) { }
        }

        function startRingbackTone() {
            try { ringbacktone.play(); }
            catch (e) { }
        }

        function stopRingbackTone() {
            try { ringbacktone.pause(); }
            catch (e) { }
        }

        function showNotifICall(s_number) {
            // permission already asked when we registered
            if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
                if (oNotifICall) {
                    oNotifICall.cancel();
                }
                oNotifICall = window.webkitNotifications.createNotification('images/sipml-34x39.png', 'Incaming call', 'Incoming call from ' + s_number);
                oNotifICall.onclose = function () { oNotifICall = null; };
                oNotifICall.show();
            }
        }

        function onKeyUp(evt) {
            evt = (evt || window.event);
            if (evt.keyCode == 27) {
                fullScreen(false);
            }
            else if (evt.ctrlKey && evt.shiftKey) { // CTRL + SHIFT
                if (evt.keyCode == 65 || evt.keyCode == 86) { // A (65) or V (86)
                    bDisableVideo = (evt.keyCode == 65);
                    //txtCallStatus.innerHTML = '<i>Video ' + (bDisableVideo ? 'disabled' : 'enabled') + '</i>';
                    window.localStorage.setItem('org.doubango.expert.disable_video', bDisableVideo);
                }
            }
        }

        function uiCallTerminated(s_description) {


            oSipSessionCall = null;

            stopRingbackTone();
            stopRingTone();

            //callControl.button_call.innerHTML = "<i>" + callControl.button_call.innerHTML + "</i>";

            if (oNotifICall) {
                oNotifICall.cancel();
                oNotifICall = null;
            }


	callControl.sipUnRegister();

            setTimeout(function () { if (!oSipSessionCall) callControl.button_call.innerHTML = ''; }, 2500);
//callControl.init();
    }

	  callControl.openKeyPad= function () {
		  //tsk_utils_log_info('openKeyPad ' );

            divKeyPad.style.visibility = 'visible';
            divKeyPad.style.left = ((document.body.clientWidth - C.divKeyPadWidth) >> 1) + 'px';
            divKeyPad.style.top = '70px';
          //  divGlassPanel.style.visibility = 'visible';

        }

       callControl.closeKeyPad= function () {
		//	tsk_utils_log_info('closeKeyPad ' );

            divKeyPad.style.left = '0px';
            divKeyPad.style.top = '0px';
            divKeyPad.style.visibility = 'hidden';
          //  divGlassPanel.style.visibility = 'hidden';

        }

        // Callback function for SIP Stacks
        function onSipEventStack(e /*SIPml.Stack.Event*/) {
            tsk_utils_log_info('==stack event = ' + e.type);
            switch (e.type) {
                case 'started':
                    {
                        // catch exception for IE (DOM not ready)
                        try {
                            // LogIn (REGISTER) as soon as the stack finish starting
                            oSipSessionRegister = this.newSession('register', {
                                expires: 200,
                                events_listener: { events: '*', listener: onSipEventSession },
                                sip_caps: [
                                            { name: '+g.oma.sip-im', value: null },
                                            //{ name: '+sip.ice' }, // rfc5768: FIXME doesn't work with Polycom TelePresence
                                            { name: '+audio', value: null },
                                            { name: 'language', value: '\"en,fr\"' }
                                ]
                            });
                            oSipSessionRegister.register();
                        }
                        catch (e) {
                            //txtRegStatus.value = txtRegStatus.innerHTML = "<b>1:" + e + "</b>";
                            //btnRegister.disabled = false;
                        }
                        break;
                    }
                case 'stopping': case 'stopped': case 'failed_to_start': case 'failed_to_stop':
                    {
                        var bFailure = (e.type == 'failed_to_start') || (e.type == 'failed_to_stop');
                        oSipStack = null;
                        oSipSessionRegister = null;
                        oSipSessionCall = null;



                        stopRingbackTone();
                        stopRingTone();

				//		var text1= callControl.button_call.textContent.value;



						//callControl.button_call.innerHTML = callControl.callButtonText;
					callControl.closeKeyPad();

						//callControl.sipUnRegister();
						//	callControl.init();
                        break;
                    }

                case 'i_new_call':
                    {
                        if (oSipSessionCall) {
                            // do not accept the incoming call if we're already 'in call'
                            e.newSession.hangup(); // comment this line for multi-line support
                        }
                        else {
                            oSipSessionCall = e.newSession;
                            // start listening for events
                            oSipSessionCall.setConfiguration(oConfigCall);


							//callControl.button_call.innerHTML= 'Answer';

                            callControl.button_call.disabled = false;

                            startRingTone();

                            var sRemoteNumber = (oSipSessionCall.getRemoteFriendlyName() || 'unknown');
                            //callControl.button_call.innerHTML = "<i>Incoming call from [<b>" + sRemoteNumber + "</b>]</i>";
                            showNotifICall(sRemoteNumber);
                        }
                        break;
                    }

                case 'm_permission_requested':
                    {

                        break;
                    }
                case 'm_permission_accepted':
                case 'm_permission_refused':
                    {

                        if (e.type == 'm_permission_refused') {
                    //        uiCallTerminated('Media stream permission denied');
                      //callControl.button_call.innerHTML=  callControl.callButtonUnreacheableText;
						callControl.sipUnRegister();
						}
                        break;
                    }

                case 'starting': default: break;
            }
        };

        // Callback function for SIP sessions (INVITE, REGISTER, MESSAGE...)
        function onSipEventSession(e /* SIPml.Session.Event */) {
            tsk_utils_log_info('==session event = ' + e.type);

            switch (e.type) {
                case 'connecting': case 'connected':
                    {
                        var bConnected = (e.type == 'connected');
                        if (e.session == oSipSessionRegister) {
							if (e.type=='connecting')
							{
								//callControl.button_call.innerHTML = "<i>" + e.description + "</i>";
							}

							else if (e.type=='connected')
							{
								callControl.sipCall(callControl.callType)
								/*callControl.button_call.innerHTML = "<i>" + e.description + "</i>";
								callControl.button_call.innerHTML = "<i>" + callControl.callButtonText + "</i>";
								*/
							}



						}
                        else if (e.session == oSipSessionCall) {


                            if (bConnected) {
                                stopRingbackTone();
                                stopRingTone();

                                if (oNotifICall) {
                                    oNotifICall.cancel();
                                    oNotifICall = null;
                                }
								//open keypad for any potential IVR
							callControl.openKeyPad();
                            }

                            //callControl.button_call.innerHTML = "<i>" + e.description + "</i>";


                            if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback

                            }

                        }
                        break;
                    } // 'connecting' | 'connected'
                 case 'terminated':
                    {




                        //callControl.button_call.innerHTML = "<i>terminating</i>";
						if (e.session == oSipSessionRegister) {
						//callControl.button_call.innerHTML = callControl.callButtonUnreacheableText;
						}
						else{
						//callControl.button_call.innerHTML = callControl.callButtonText;

						}
						     oSipSessionCall = null;
                            oSipSessionRegister = null;
							callControl.sipUnRegister();
						//callControl.init();
                        break;
                    } // 'terminating' | 'terminated'

                case 'm_stream_video_local_added':
                    {
                        if (e.session == oSipSessionCall) {
                            uiVideoDisplayEvent(true, true);
                        }
                        break;
                    }
                case 'm_stream_video_local_removed':
                    {
                        if (e.session == oSipSessionCall) {
                            uiVideoDisplayEvent(true, false);
                        }
                        break;
                    }
                case 'm_stream_video_remote_added':
                    {
                        if (e.session == oSipSessionCall) {
                            uiVideoDisplayEvent(false, true);
                        }
                        break;
                    }
                case 'm_stream_video_remote_removed':
                    {
                        if (e.session == oSipSessionCall) {
                            uiVideoDisplayEvent(false, false);
                        }
                        break;
                    }

                case 'm_stream_audio_local_added':
                case 'm_stream_audio_local_removed':
                case 'm_stream_audio_remote_added':
                case 'm_stream_audio_remote_removed':
                    {
                        break;
                    }

                case 'i_ect_new_call':
                    {
                        oSipSessionTransferCall = e.session;
                        break;
                    }

                case 'i_ao_request':
                    {
                        if (e.session == oSipSessionCall) {
                            var iSipResponseCode = e.getSipResponseCode();
                            if (iSipResponseCode == 180 || iSipResponseCode == 183) {
                                startRingbackTone();
                                //callControl.button_call.innerHTML = '<i>Ringing...</i>';
                            }
                        }
                        break;
                    }

                case 'm_early_media':
                    {
                        if (e.session == oSipSessionCall) {
                            stopRingbackTone();
                            stopRingTone();
                            //callControl.button_call.innerHTML = '<i>Connecting</i>';
                        }
                        break;
                    }

                case 'm_local_hold_ok':
                    {
                        if (e.session == oSipSessionCall) {
                            if (oSipSessionCall.bTransfering) {
                                oSipSessionCall.bTransfering = false;

                            }

                            //callControl.button_call.innerHTML = '<i>Call placed on hold</i>';
                            oSipSessionCall.bHeld = true;
                        }
                        break;
                    }
                case 'm_local_hold_nok':
                    {
                        if (e.session == oSipSessionCall) {
                            oSipSessionCall.bTransfering = false;

                            //callControl.button_call.innerHTML = '<i>Failed to place remote party on hold</i>';
                        }
                        break;
                    }
                case 'm_local_resume_ok':
                    {
                        if (e.session == oSipSessionCall) {
                            oSipSessionCall.bTransfering = false;

                            oSipSessionCall.bHeld = false;

                            if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback yet
                                uiVideoDisplayEvent(false, true);
                                uiVideoDisplayEvent(true, true);
                            }
                        }
                        break;
                    }
                case 'm_local_resume_nok':
                    {
                        if (e.session == oSipSessionCall) {
                            oSipSessionCall.bTransfering = false;

                            //callControl.button_call.innerHTML = '<i>Failed to unhold call</i>';
                        }
                        break;
                    }
                case 'm_remote_hold':
                    {
                        if (e.session == oSipSessionCall) {
                            //callControl.button_call.innerHTML = '<i>Placed on hold by remote party</i>';
                        }
                        break;
                    }
                case 'm_remote_resume':
                    {
                        if (e.session == oSipSessionCall) {
                            //txtCallStatus.innerHTML = '<i>Taken off hold by remote party</i>';
                        }
                        break;
                    }
                case 'm_bfcp_info':
                    {
                        if (e.session == oSipSessionCall) {
                          //  callControl.button_call.innerHTML = 'BFCP Info: <i>' + e.description + '</i>';
                        }
                        break;
                    }

                case 'o_ect_trying':
                    {
                        if (e.session == oSipSessionCall) {
                            //callControl.button_call.innerHTML = '<i>Call transfer in progress...</i>';
                        }
                        break;
                    }
                case 'o_ect_accepted':
                    {
                        if (e.session == oSipSessionCall) {
                            //callControl.button_call.innerHTML = '<i>Call transfer accepted</i>';
                        }
                        break;
                    }
                case 'o_ect_completed':
                case 'i_ect_completed':
                    {
                        if (e.session == oSipSessionCall) {
                            //callControl.button_call.innerHTML = '<i>Call transfer completed</i>';

                            if (oSipSessionTransferCall) {
                                oSipSessionCall = oSipSessionTransferCall;
                            }
                            oSipSessionTransferCall = null;
                        }
                        break;
                    }
                case 'o_ect_failed':
                case 'i_ect_failed':
                    {
                        if (e.session == oSipSessionCall) {
                            //callControl.button_call.innerHTML = '<i>Call transfer failed</i>';

                        }
                        break;
                    }
                case 'o_ect_notify':
                case 'i_ect_notify':
                    {
                        if (e.session == oSipSessionCall) {
                            //callControl.button_call.innerHTML = "<i>Call Transfer: <b>" + e.getSipResponseCode() + " " + e.description + "</b></i>";
                            if (e.getSipResponseCode() >= 300) {
                                if (oSipSessionCall.bHeld) {
                                    oSipSessionCall.resume();
                                }
                                btnTransfer.disabled = false;
                            }
                        }
                        break;
                    }
                case 'i_ect_requested':
                    {
                        if (e.session == oSipSessionCall) {
                            var s_message = "Do you accept call transfer to [" + e.getTransferDestinationFriendlyName() + "]?";//FIXME
                            if (confirm(s_message)) {
                                //callControl.button_call.innerHTML = "<i>Call transfer in progress...</i>";
                                oSipSessionCall.acceptTransfer();
                                break;
                            }
                            oSipSessionCall.rejectTransfer();
                        }
                        break;
                    }
            }
        }
        export {
          c2c,
          callControl

        };
