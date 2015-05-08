'use strict';

var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({port: 8000})
;

function WebSocketServerFunctions () {}

WebSocketServerFunctions.handleWebSocketMessage = function (ws, message) {
  console.log("serverBetterArchitected.handleWebSocketMessage");
  ws.send(message);
};

WebSocketServerFunctions.handleNewWebSocketConnection = function (ws) {
  ws.on('message', function (message) {
    WebSocketServerFunctions.handleWebSocketMessage(this, message);
  });
};

wss.on('connection', WebSocketServerFunctions.handleNewWebSocketConnection);

module.exports = WebSocketServerFunctions;