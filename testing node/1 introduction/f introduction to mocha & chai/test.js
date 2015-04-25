'use strict';

// jshint expr:true
// necessary to use expression-style asserts if you're using jshint

//test one shows chai.should, test two shows chai.expect, test 3 shows beforeEach()

var chai = require("chai")
, expect = chai.expect
;

chai.should();

function isEven (num) {
  return num % 2 === 0;
}

describe('unit tests', function () {
  
  it('should return true when number is prime', function () {
    isEven(4).should.be.true;
  });
  
  it('should return false when number is not prime', function () {
    expect(isEven(5)).to.be.false;
  });
  
});

function add (num1, num2) {
  return num1 + num2;
}

describe('without beforeEach / afterEach', function () {
  var num = 5
  ;
  
  it ('adds to the number', function () {
    num = add(num, 5);
    num.should.equal(10);
  });
  
  it('should fail due to the wrong starting value for num', function () {
    //this will fail because num has been changed
    add(num, 5).should.equal(10);
  });
});

describe('use beforeEach / afterEach', function () {
  var num
  ;
  
  beforeEach(function () {
    num = 5;
  });
  
  // this would work to reset it, but would cause the first function to fail
  // afterEach(function () {
  //   num = 5;
  // });
  
  it ('adds to the number', function () {
    num = add(num, 5);
    num.should.equal(10);
  });
  
  it('will work now due to beforeEach', function () {
    //this will succeed because num has been changed back by beforeEach
    add(num, 5).should.equal(10);
  });
});