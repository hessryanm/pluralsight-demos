'use strict';

var chai = require("chai")
, Testable = require("../index.js")
;

chai.should();

describe("tests", function () {
  it("should add the numbers together", function () {
    Testable.add(1,2).should.equal(3);
  });
  
  it("should subtract b from a", function () {
    var a = 10
    , b = 5
    ;
    
    Testable.subtract(a, b).should.equal(5);
  });
});