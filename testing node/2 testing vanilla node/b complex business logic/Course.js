'use strict';

function Course () {}

Course.create = function (name, code, description) {
  var course = new Course();
  
  course.name = name;
  course.code = code;
  course.description = description;
  
  course.students = [];
  course.times = [];
  
  //start with this commented out, test will fail
  return course;
};

var _p = Course.prototype;

_p.registerStudent = function (student) {
  this.students.push(student);
};

_p.unregisterStudent = function (studentId) {
  var me = this
  ;
  
  if (!this.students.some(function (student, i) {
    if (student.id === studentId) {
      me.students.splice(i, 1);
      return true;
    }
  })) {
    throw new Error("Student '"+studentId+"' is not registered for this course");
  }
};

_p.addTimes = function (days, times) {
  var me = this
  ;
  
  if (!Array.isArray(days)) {
    days = [days];
  }
  
  if (!Array.isArray(times)) {
    times = [times];
  }
  
  //we should check that each day is an actual day of the week, and that each time is a time on a 24-hour clock
  
  //first we write tests that we think test our code
  //then we show that we can get an error (if we add, say "frabjousday" as a day for the course)
  //then we change our code
  //then we write better unit tests
  
  //now that we know that we can add a non-day, we should check that!
  
  var validDays = [
    "Monday"
  , "Tuesday"
  , "Wednesday"
  , "Thursday"
  , "Friday"
  , "Saturday"
  , "Sunday"
  ];
  
  days.forEach(function (day) {
    //let's add a check here
    if (validDays.indexOf(day) === -1) {
      throw new Error(day+" is not a valid day");
    }
    
    times.forEach(function (time) {
      me.times.push({
        "day": day
      , "time": time
      });
    });
  });
};

_p.showSchedule = function () {
  var scheduleString = ""
  , first = true;
  
  this.times.forEach(function (time) {
    if (!first) {
      scheduleString += "\n";
    }
    first = false;
    
    scheduleString += time.day + " at " + time.time;
  });
  
  return scheduleString;
};

_p.showStudents = function () {
  var studentString = ""
  , first = true;
  
  this.students.forEach(function (student) {
    if (!first) {
      studentString += "\n";
    }
    first = false;
    
    studentString += student.toString();
  });
  
  return studentString;
};

module.exports = Course;