'use strict';

var request = require("request-promise")
  , chai = require("chai")
  , sinon = require("sinon")
  ;

chai.should();

describe("testing routes", function () {
  var getUsersSpy
    , createUserSpy
    , updateUserSpy
    , requiresRoleSpy
    , getCoursesSpy
    , server = require("../server")
    ;
  
  before(function () {
    var auth = require("../server/config/auth")
      , users = require("../server/controllers/users").create(sinon.stub())
      , courses = require("../server/controllers/courses").create(sinon.stub())
      ;
      
    getCoursesSpy = sinon.stub(courses, 'getCourses', function (req, res) {
      res.send("getCourses");
    });
    
    getUsersSpy = sinon.stub(users, 'getUsers', function (req, res) {
      res.send("getUsers");
    });
    requiresRoleSpy = sinon.stub(auth, 'requiresRole');
    createUserSpy = sinon.stub(users, 'createUser', function (req, res) {
      res.send("createUser");
    });
    updateUserSpy = sinon.stub(users, 'updateUser', function (req, res) {
      res.send("updateUser");
    });
    
    requiresRoleSpy.returns(function (req, res, next) {
      next();
    });
    
    server.create(users, courses, auth);
  });
  
  after(function (done) {
    server.close(done);
  });
  
  describe("testing users routes", function () {
    var userUrl = "http://localhost:3003/api/users"
      ;
    
    it("tests the get users route", function () {
      return request(userUrl).then(function (response) {
        sinon.assert.calledOnce(getUsersSpy);
        sinon.assert.called(requiresRoleSpy);
        sinon.assert.calledWithExactly(requiresRoleSpy.firstCall, "admin");
        response.should.equal("getUsers");
      });
    });
    
    it("tests the create user route", function () {
      return request({
        url: userUrl
      , method: "POST"
      }).then(function (response)  {
        sinon.assert.calledOnce(createUserSpy);
        response.should.equal("createUser");
      });
    });
    
    it("tests the update user route", function () {
      return request({
        url: userUrl
      , method: "PUT"
      }).then(function (response) {
        sinon.assert.calledOnce(updateUserSpy);
        response.should.equal("updateUser");
      });
    });
  });
  
  describe("tests courses routes", function () {
    var coursesUrl = "http://localhost:3003/api/courses"
      ;

    it("tests the get courses route", function () {
      return request(coursesUrl).then(function (response) {
        sinon.assert.calledOnce(getCoursesSpy);
        response.should.equal("getCourses");
      });
    });
  });
});