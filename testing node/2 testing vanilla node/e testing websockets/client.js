'use strict';

var WebSocket = require("ws")
, ws = new WebSocket('ws://localhost:8000')
;

ws.on('message', function (message) {
  console.log(message);
});

ws.on('open', function () {
  ws.send("I have opened a web socket!");
});