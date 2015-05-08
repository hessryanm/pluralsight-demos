'use strict';

var Promise = require("bluebird")
, _ = require("lodash")
;

function replyWithCallback (cb) {
  _.range(0, 10000).forEach(function () {});
  cb();
}

function returnPromise () {
  _.range(0, 10000).forEach(function () {});
  return Promise.resolve(null);
}

replyWithCallback(function () {
  console.log("callback was called!!");
});

returnPromise().then(function () {
  console.log("promise was returned");
});