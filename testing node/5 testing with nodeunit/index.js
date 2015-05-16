'use strict';

module.exports.create = function () {
  function Arithmetic () {}
  
  Arithmetic.add = function (a, b) {
    return a+b;
  };
  
  Arithmetic.subtract = function (a, b) {
    return a-b;
  };
  
  return Arithmetic;
};