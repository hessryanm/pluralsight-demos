'use strict';

//jshint expr:true

var chai = require('chai')
, sinon = require('sinon')
;

function callsback(cb) {
  cb();
}

chai.should();

describe("sinon spies", function () {
  
  it('uses a spy without a parameter', function () {
    var spy = sinon.spy();
    
    callsback(spy);
    spy.called.should.be.true;
  });
  
  it('uses a spy to watch a different function', function () {
    //note it will console.log
    function log () {
      console.log("log function");
    }
    
    var spy = sinon.spy(log);
    
    callsback(spy);
    spy.called.should.be.true;
  });
  
  it('uses a spy to watch a method in a function', function () {
    var obj = {
      log: function () {
        console.log("obj.log");
      }
    },
    spy = sinon.spy(obj, 'log');
    
    callsback(spy);
    spy.called.should.be.true;
  });
});

describe('sinon stubs', function () {
  var obj
  ;
  
  //beforeEach is required because each function wraps it on its own
  beforeEach(function () {
    obj = {
      log: function () {
        console.log("obj.log");
      }
    };
  });
  
  it("uses a stub, doesn't execute function", function () {
    var stub = sinon.stub(obj);
    
    //note that 'obj.log' is NOT logged
    callsback(stub.log);
    stub.log.called.should.be.true;
  });
  
  it('uses a stub to control a return value', function () {
    var stub = sinon.stub(obj);
    
    stub.log.returns("hello");
    
    var returnVal = stub.log();
    
    stub.log.called.should.be.true;
    returnVal.should.equal("hello");
  });
});

describe('sinon mocks', function () {
  var obj
  ;
  
  beforeEach(function () {
    obj = {
      log: function () {
        console.log("obj.log");
      }
    };
  });
  
  it('mocks obj', function () {
    var mockObj = sinon.mock(obj)
    //we use mock object to set up expectations
    , expectation = mockObj.expects('log').once()
    ;
    
    //not does NOT execute function, doesn't log obj.log
    //we call actual function, not mocked function
    obj.log();
    expectation.verify();
  });
});