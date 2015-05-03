'use strict';

function Testable () {}

Testable.add = function (a, b) {
  return a + b;
};

Testable.subtract = function (a, b) {
  // do this one first to show we did it wrong
  // return b - a;
  return a - b;
};

module.exports = Testable;