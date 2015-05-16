'use strict';

var chai = require("chai")
  , sinon = require("sinon")
  , PromiseA = require("bluebird")
  ;
  
chai.should();
  
describe("test users controller", function () {
  var Users = require('../server/controllers/users-restful-restless')
    ;
    
  //obviously we'd want to test all of them, but this shows how we can test the restful portion without actually doing anything.
  describe("test restful portion", function () {
    var restful
      , restless
      , restlessGetUsersSpy
      ;
      
    before(function () {
      restless = Users.createRestless(sinon.stub());
      restlessGetUsersSpy = sinon.stub(restless, 'getUsers');
      
      restlessGetUsersSpy.returns(PromiseA.resolve("getUsers"));
      
      restful = Users.createRestful(restless);
    });
    
    //this shows us that the restful calls the correct restless function, and sends the right information based on what it gets back
    it("tests restful getUsers", function () {
      var res = {
            send: sinon.spy()
          }
        ;
        
      return restful.getUsers(null, res).then(function () {
        sinon.assert.calledOnce(restlessGetUsersSpy);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWithExactly(res.send.firstCall, "getUsers");
      });
    });
  });
  
  //when testing the restless portion, we only want to test that it does the right things (like call the DB), not what it actually gets back as a result of calling the DB.
  describe("test restless portion", function () {
    var restless
      , createUserSpy
      ;
      
    before(function () {
      var User = {
            create: function () {}
          }
        ;
        
      createUserSpy = sinon.stub(User, "create", function (data, cb) {
        cb(null, "createUser");
      });
      
      restless = Users.createRestless(User);
    });
    
    //here we see that it calls the correct db function with the correct parameters, and resolves with whatever the DB returns
    it("tests restless createUser", function () {
      return restless.createUser("userData").then(function (returnVal) {
        returnVal.should.equal("createUser");
        sinon.assert.calledOnce(createUserSpy);
        sinon.assert.calledWith(createUserSpy.firstCall, "userData");
      });
    });
  });
});