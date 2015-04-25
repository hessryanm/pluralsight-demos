'use strict';

var chai = require("chai")
//new chai functionality - should.exist();
, should = chai.should()
;

function callsBackEventually (cb, err) {
  setTimeout(function () {
    if (err) {
      cb(err);
      return;
    }
    cb();
  }, 1000);
}

describe('use done() function in mocha tests', function () {
  it('forgets to use done, times out', function (done) {  //jshint ignore:line
    callsBackEventually(function (err) {
      should.not.exist(err);
    });
  });
  
  it('uses done in the wrong place, should fail but passes', function (done) {
    callsBackEventually(function (err) {
      //err will not exist, but since done() is called early, it succeeds.
      should.exist(err);
    });
    
    done();
  });
  
  it("uses done() correctly, will fail because error won't exist", function (done) {
    callsBackEventually(function (err) {
      //err will not exist, and since done() is in the callback, it will fail like it's supposed to
      should.exist(err);
      done();
    });
  });
});