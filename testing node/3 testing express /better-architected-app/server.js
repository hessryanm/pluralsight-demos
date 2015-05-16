'use strict';

var express = require('express')
  , _ = require("lodash")
  , env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  , app = express()
  , _config = require('./server/config/config')[env]
  , server
  , db
  ;
  
//this may look odd, but this is all to make it testable.
//we are allowing the information like users, courses, etc to be passed in here so that we can test them with stubs
  
module.exports.create = function (users, courses, auth, config) {
  config = config || _config;
  
  require('./server/config/express')(app, config);

  db = require('./server/config/mongoose')(config);
  
  //various of these modules can't be inittied until things like mongoose and passport are set up.
  users = users || require("./server/controllers/users-restful-restless").create();
  courses = courses || require('./server/controllers/courses').create();

  require('./server/config/passport')();
  
  auth = auth || require("./server/config/auth");

  require('./server/config/routes')(app, users, courses, auth);

  server = app.listen(config.port);
  console.log('Listening on port ' + config.port + '...');
};

module.exports.close = function (cb) {
  var numResponses = 0
  , done
  ;
  
  if (server) {
    numResponses++;
  }
  
  if (db) {
    numResponses++;
  }
  
  done = _.after(numResponses, cb);
  
  if (server) {
    server.close(done);
  }
  
  if (db) {
    db.close(done);
  }
};

if (require.main === module) {
  module.exports.create();
}