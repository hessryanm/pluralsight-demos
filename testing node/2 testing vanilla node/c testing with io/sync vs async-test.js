'use strict';

//jshint expr:true

var chai = require("chai")
//new chai functionality - should.exist();
, should = chai.should()
, sinon = require("sinon")
;

function callsBackImmediately (cb) {
  cb();
}

function callsBackEventually (cb, err) {
  setTimeout(function () {
    if (err) {
      cb(err);
      return;
    }
    cb();
  }, 1000);
}

//testing sync code.  done() function isn't necessary
describe("sync vs async", function () {
  
  it("calls back immediately", function () {
    var spy = sinon.spy();
    
    callsBackImmediately(spy);
    
    spy.called.should.be.true;
  });
  
  //this fails because it's using it like it's sync code - trying to see that it's been called already.  This doesn't work.
  it("calls back eventually", function () {
    var spy = sinon.spy();
    
    callsBackEventually(spy);
    
    spy.called.should.be.true;
  });
});

//instead of using it like it's sync code, we're going to use mocha's done() function in its tests
describe('use done() function in mocha tests', function () {
  it('forgets to use done, times out', function (done) {  //jshint ignore:line
    callsBackEventually(function (err) {
      should.not.exist(err);
    });
  });
  
  it('uses done in the wrong place, should fail but passes', function (done) {
    callsBackEventually(function (err) {
      //err will exist, so this should fail, but since done() is called early, it succeeds.
      should.not.exist(err);
    }, "there was an error");
    
    done();
  });
  
  it("uses done() correctly, will fail because error won't exist", function (done) {
    callsBackEventually(function (err) {
      //err will exist, and since done() is in the callback, it will fail like it's supposed to
      should.not.exist(err);
      done();
    }, "there was an error");
  });
});