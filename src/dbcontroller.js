/*
var tag_hdr = document.getElementsByTagName('head')[0];
['js/SIPml.js','js/SIPml-api.js', 'js/c2c-api.js','src/tinySIP/src/tsip_api.js'].forEach(function (file) {
    var tag_script = document.createElement('script');
    tag_script.setAttribute('type', 'text/javascript');
    tag_script.setAttribute('src', file + "?svn=251");
   // tag_script.setAttribute('src', file );
    tag_hdr.appendChild(tag_script);
});
*/
import {callControl} from   './callcontrol.js';
var dbcontroller = { };


dbcontroller.getServerDetails= function ($scope, $location )

{
//var id = window.location.hostname;
var data;
var apiPath = "http://" +   callControl.http_service_url + "/webrtcserver?enterpriseId=" +callControl.enterpriseid+"&&friendlyName="+callControl.rtcServerFriendlyName ;

var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {

		data = xhr.responseText;
      if (xhr.readyState == XMLHttpRequest.DONE) {
				console.log('Received data ' + data);
	//		var rtcServers=	data.rtcServers;
			var rtcServer =JSON.parse(data);
			

			if (rtcServer.hostAddress != null)
			{
				const webrtcAddress = rtcServer.hostAddress.split(":");
					callControl.websocket_proxy_url =  webrtcAddress[0];
					callControl.webRTCPort = webrtcAddress[1];
					console.log('websocket_proxy ' + callControl.websocket_proxy_url);
			}
			/*if (rtcServer.sipPort !=null)
			{
					callControl.sipPort =  rtcServer.sipPort;
					console.log('sipPort ' + callControl.sipPort);
			}
			if (rtcServer.webRTCPort !=null)
			{
						callControl.webRTCPort =  rtcServer.webRTCPort;
			}*/
			if (rtcServer.sipProxyAddress !=null)
			{
				const sipAddress = rtcServer.sipProxyAddress.split(":");

				callControl.sipPort = sipAddress[1];
					callControl.sipProxyAddress= "udp://"+sipAddress[0]+":"+callControl.sipPort;
					console.log('sipProxyAddress ' + callControl.sipProxyAddress);
			}
			if (rtcServer.outBoundProxyAddress !=null)
			{
					callControl.sip_outbound_proxy_url =  "udp://"+rtcServer.outBoundProxyAddress+":"+callControl.sipPort;

			}
			/*
			if (!callControl.sipPort  ||
						!callControl.sip_outbound_proxy_url  ||
						!callControl.sipProxyAddress  ||
						!callControl.websocket_proxy_url  )
						{
						console.log('Invalid Server details ');
						}
						*/

    }
	}
}
		xhr.open('GET', apiPath, true);
		xhr.send();


/*
$.ajax ({
		type: 'GET',
		data: JSON.stringify(callControl.rtcServerFriendlyName ),
		contentType: 'application/json; charset=utf-8',
		datatype: "json",
		//jsonp: false,
		//crossDomain  : true,
		//crossOrigin: true
		url: apiPath




}).done ( function(data) 	{
				rtcServer=	data.rtcServers[0];
				if (rtcServer.webRtcHostAddress != null)
				{
						callControl.websocket_proxy_url =  rtcServer.webRtcHostAddress;
						console.log('websocket_proxy ' + callControl.websocket_proxy_url);
				}
				if (rtcServer.sipPort !=null)
				{
						callControl.sipPort =  rtcServer.sipPort;
				}
				if (rtcServer.webRTCPort !=null)
				{
    					callControl.webRTCPort =  rtcServer.webRTCPort;
				}
				if (rtcServer.sipProxyAddress !=null)
				{
						callControl.sipProxyAddress= "udp://"+rtcServer.sipProxyAddress+":"+callControl.sipPort;
				}
				if (rtcServer.outBoundProxyAddress !=null)
				{
						callControl.sip_outbound_proxy_url =  "udp://"+rtcServer.outBoundProxyAddress+":"+callControl.sipPort;
				}
				if (!callControl.sipPort  ||
							!callControl.sip_outbound_proxy_url  ||
							!callControl.sipProxyAddress  ||
							!callControl.websocket_proxy_url  )
							{
							console.log('Invalid Server details ');
							}
				});
*/
}

dbcontroller.getClientDetails=  function($scope, $location )

{
//var id = host;
var data;
var apiPath = "http://" +   callControl.http_service_url + "//client/?" +"enterpriseId="+callControl.enterpriseid
														+"&&accountFriendlyName="+callControl.publicIdentity
															+"&&friendlyName="+ callControl.from  ;
 //return	$.getJSON( apiPath, function( client ) {

var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {

		data = xhr.responseText;
      if (xhr.readyState == XMLHttpRequest.DONE) {
				console.log('Received data ' + data);
 	 			var clientObj = JSON.parse(data);
	  		if ((clientObj != null) && (clientObj.password !=null) )
	  		{
		  		callControl.password= clientObj.password;
		  		callControl.realm= callControl.enterpriseid;
					callControl.publicIdentity="sip:"+callControl.from+"@"+callControl.enterpriseid;
					console.log('password ' + callControl.password );
					console.log('realm ' + callControl.realm );
					console.log('publicIdentity ' + callControl.publicIdentity );
	  		}
	  		else
				{
	  			console.log('Invalid credentials ');
	  		}

	  //callControl.http_service_url = null;
    }
   }
  }

			xhr.open('GET', apiPath, true);
			xhr.send();
};







export {
	dbcontroller

};
