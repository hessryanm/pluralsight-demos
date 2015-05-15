'use strict';

var WebSocket = require("ws")
, ws = new WebSocket('ws://localhost:8000')
;

function WebSocketFunctions () {}

WebSocketFunctions.ws = ws;

WebSocketFunctions.handleMessage = function (ws, message) {
  console.log('message sent:', message);
};

WebSocketFunctions.handleWSOpen = function (ws) {
  ws.on('message', function (message) {
    WebSocketFunctions.handleMessage(ws, message);
  });
  
  // ws.send("I have opened a web socket!");
};

ws.on('open', function () {
  WebSocketFunctions.handleWSOpen(this);
});

module.exports = WebSocketFunctions;