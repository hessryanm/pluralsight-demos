'use strict';

var encrypt = require('../utilities/encryption')
  , PromiseA = require("bluebird")
;

//if we structure this file separately between the restful and restless functions
// - meaning the functions that handle io vs the functions that do actual work -
//then we can test them separately.

//using promises rather than callbacks is extremely helpful in architecting this way

module.exports.createRestless = function (User) {
  User = User || require('mongoose').model('User');
  
  function Restless () {}
  
  Restless.getUsers = function () {
    return new PromiseA(function (resolve, reject) {
      User.find({}).exec(function(err, collection) {
        if (err) {
          reject(err);
          return;
        }
        
        resolve(collection);
      });
    });
  };
  
  Restless.createUser = function (userData) {
    return new PromiseA(function (resolve, reject) {
      User.create(userData, function(err, user) {
        if(err) {
          if(err.toString().indexOf('E11000') > -1) {
            err = new Error('Duplicate Username');
          }
          reject(err);
          return;
        }
        
        resolve(user);
      });
    });
  };
  
  Restless.updateUser = function (user, userUpdates) {
    var updateKeys = [
          "firstName"
        , "lastName"
        , "userName"
        ]
      ;
      
    updateKeys.forEach(function (key) {
      if ("undefined" !== typeof userUpdates[key]) {
        user[key] = userUpdates[key];
      }
    });
    
    if(userUpdates.password && userUpdates.password.length > 0) {
      user.salt = encrypt.createSalt();
      user.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password);
    }
    
    return new PromiseA(function (resolve, reject) {
      user.save(function(err) {
        if (err) { 
          reject(err);
          return;
        }
        
        resolve(user);
      });
    });
  };
  
  return Restless;
};
  
module.exports.createRestful = function (restless) {
  function Restful () {}
  
  function sendError(res, err) {
    res.status(400);
    res.send({reason:err.toString()});
  }
  
  Restful.getUsers = function(req, res) {
    return restless.getUsers().then(function (collection) {
      res.send(collection);
    }).catch(function (err) {
      sendError(res, err);
    });
  };

  Restful.createUser = function(req, res, next) {
    var userData = req.body
      ;
    
    userData.username = userData.username && userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    
    return restless.createUser(userData).then(function (user) {
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send(user);
      });
    });
  };

  Restful.updateUser = function(req, res) {
    var userUpdates = req.body
      , user = req.user
      ;

    if(user._id !== userUpdates._id && !user.hasRole('admin')) {
      res.status(403);
      return res.end();
    }
    
    return restless.updateUser(user, userUpdates).then(function (_user) {
      res.send(_user);
    }).catch(function (err) {
      sendError(res, err);
    });
  };
  
  return Restful;
};

module.exports.create = function (User) {
  var restless = module.exports.createRestless(User)
    , restful = module.exports.createRestful(restless)
    ;
  
  return restful;
};