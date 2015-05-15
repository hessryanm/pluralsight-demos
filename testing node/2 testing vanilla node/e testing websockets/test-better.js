'use strict';

//jshint expr: true

var sinon = require("sinon")
  , server = require("./serverBetterArchitected")
  , client = require("./clientBetterArchitected")
  , chai = require("chai")
  ;
  
chai.should();

describe("test the appropriate functions are called when a message is sent", function () {

  beforeEach(function() {
    // when spying on a function that exists on an object, you have to spy like this
    sinon.spy(server, 'handleWebSocketMessage');
    sinon.spy(client, 'handleMessage');
  });
  afterEach(function() {
    server.handleWebSocketMessage.restore();
    client.handleMessage.restore();
  })  
  it("sends a message, sees that the message handlers on both server and client were called", function (done) {
            
    //wait for the ws to connect before sending a message
    setTimeout(function () {
      client.ws.send("message");
      setTimeout(function () {
        sinon.assert.calledOnce(server.handleWebSocketMessage);
        sinon.assert.calledOnce(client.handleMessage);
        done();
      }, 500);
    }, 1000);
  });
});