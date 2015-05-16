'use strict';

module.exports.create = function (Course) {
  Course = Course || require('mongoose').model('Course');
  
  function Courses () {}
  
  Courses.getCourses = function(req, res) {
    Course.find({}).exec(function(err, collection) {
      res.send(collection);
    });
  };
  
  return Courses;
};