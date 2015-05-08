'use strict';

var sinon = require("sinon")
, server = require("./server")
, client = require("./client")
;


describe("test that correct functions were called", function () {
  //now what do I do?  The console shows that message was logged, but...
  it("kills time for the ws to connect", function (done) {
    setTimeout(done, 1500);
  });
});