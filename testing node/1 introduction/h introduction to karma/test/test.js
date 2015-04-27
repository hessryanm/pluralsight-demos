'use strict';

var add = require("./add")
, chai = require("chai")
;

chai.should();

describe("test", function () {
  it("should add the number together", function () {
    add(2,4).should.equal(6);
  });
});