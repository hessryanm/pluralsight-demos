'use strict';

//jshint expr: true

var sinon = require("sinon")
  , server = require("./serverBetterArchitected")
  , client = require("./clientBetterArchitected")
  , chai = require("chai")
  ;
  
chai.should();

describe("test the appropriate functions are called when a message is sent", function () {
  
  it("sends a message, sees that the message handlers on both server and client were called", function (done) {
    console.log(server);
    var serverSpy = sinon.spy(server.handleWebSocketMessage)
      , clientSpy = sinon.spy(client.handleMessage)
      ;
      
    //wait for the ws to connect before sending a message
    setTimeout(function () {
      client.ws.send("message");
      setTimeout(function () {
        console.log(serverSpy);
        sinon.assert.calledOnce(serverSpy);
        sinon.assert.calledOnce(clientSpy);
        done();
      }, 500);
    }, 1000);
  });
});