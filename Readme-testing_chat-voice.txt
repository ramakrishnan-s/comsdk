Pre-requisites
----------------
Prerequisites: Node.js ( 6.x preferred)

Install js components
---------------------
(i think most of these will get installed automatically by npm later.. So this step can be skipped and directly go to Installation of test application)
npm install -g vue 
npm install -g vue-cli
npm install -g vue-generate-component
npm install -g dynamics.js
(https://github.com/michaelvillar/dynamics.js#usage)
Add Chrome, forefox addons for debugging
https://github.com/vuejs/vue-devtools
npm install -g --save bootstrap

Installation of test application
--------------------------------
1.Create a directory <comsdk>
2.cd <comsdk>
3.Copy comsdk.zip to comsdk directory
4.Unzip comsdk.zip
5.Open package.json.. In this in line "dev" change "--host" address to this computer ip
6.Open index.json in "src" directory (in "comsdk/src/index.json") and change "botServerAddress" to actual IP of the chat (Rasa) server
7.Open index.json in "src" directory (in "comsdk/src/index.json") and change "http_service_address" to actual IP of the freeswitch server
8.Ensure "from" and "to" sip address in the index.json are valid sip address in webcall
10.Then execute command "npm run  build --legacy-peer-deps" .. If it asks quetion to install webpack or webpack-cli then say "yes"
11.Then execute command  "npm run dev"
