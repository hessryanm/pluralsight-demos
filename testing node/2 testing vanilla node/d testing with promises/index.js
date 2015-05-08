'use strict';

var Promise = require("bluebird")
, _ = require("lodash")
, chai = require("chai")
, should = chai.should()
;

function returnPromise () {
  _.range(0, 1000).forEach(function () {});
  return Promise.resolve(null);
}

function returnRejectedPromise () {
  return Promise.reject("I failed!");
}

describe("testing with promises", function () {

  //test passes, but you get 'Unhandled rejection AssertionError' because the should fires after the test returns.  
  it("doesn't use done function", function () {
    returnPromise().then(function () {
      should.not.exist(true);
    });
  });
  
  //times out because the done function doesn't work this way?
  it("uses the done function", function (done) {
    returnPromise().then(function () {
      should.not.exist(true);
      done();
    });
  });
  
  //this one works!
  it("returns the promise", function () {
    return returnPromise().then(function () {
      should.not.exist(true);
    });
  });
  
  //because we're returning the promise, a rejected promise will fail the test
  it("fails because of rejected promise", function () {
    return returnRejectedPromise();
  });
});