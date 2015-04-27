'use strict';

var Student = require("./Student")
, Course = require("./Course")
, chai = require("chai")
, should = chai.should()
, expect = chai.expect
;

describe("Student tests", function () {
  var studentName = "John Doe"
  , studentGrade = 5
  , student
  ;
  
  beforeEach(function () {
    student = Student.create(studentName, studentGrade);
  });
  
  it("should save the information on the student when created and create an id", function () {    
    should.exist(student.name);
    student.name.should.equal(studentName);
    
    should.exist(student.grade);
    student.grade.should.equal(studentGrade);
    
    should.exist(student.id);
  });
  
  it("should print the student as id tab name", function () {
    should.exist(student.toString);
    student.toString().should.equal(student.id+"\t"+studentName);
  });
  
  it("should increase the student's grade by 1", function () {
    student.advanceGrade();
    student.grade.should.equal(studentGrade+1);
  });
});

describe("Course tests", function () {
  var courseName = "Introduction to Mathematics"
  , courseCode = "MATH 101"
  , courseDescription = "This course teached introductory mathematics principles, including addition, subtraction, multiplication, and division"
  , course
  ;
  
  beforeEach(function () {
    course = Course.create(courseName, courseCode, courseDescription);
  });
  
  //good example.  When I first wrote the Course module, I forgot to include line 15 - "return course;"
  //what that meant was that when I ran the test, it failed
  //that made me realize there was a problem that I had to go fix
  
  it("should have saved name, code, description, and initialized empty arrays for times and students", function () {
    
    should.exist(course.name);
    course.name.should.equal(courseName);
    
    should.exist(course.code);
    course.code.should.equal(courseCode);
    
    should.exist(course.description);
    course.description.should.equal(courseDescription);
    
    //note here that if we use should.equal, it will fail
    //should.equal compares actual objects, not their values.
    //should.eql does a deep-equal value comparison
    should.exist(course.students);
    course.students.should.eql([]);
    
    should.exist(course.times);
    course.times.should.eql([]);
  });
  
  it("should add the student to the studends array", function () {
    var student = Student.create("John Doe", 3);
    
    course.registerStudent(student);
    
    course.students.length.should.equal(1);
    course.students[0].id.should.equal(student.id);
  });
  
  it("should remove the student from the students array", function () {
    var student = Student.create("John Doe", 3);
    
    course.registerStudent(student);
    
    course.students.length.should.equal(1);
    course.students[0].id.should.equal(student.id);
    
    course.unregisterStudent(student.id);
    course.students.length.should.equal(0);
  });
  
  it("should throw an error if we try to remove a student that isn't in the class", function () {
    expect(function () {
      course.unregisterStudent("asdf");
    }).to.throw();
  });
  
  it("should add the given days/times to the course", function () {
    var days = [
        "Monday"
      , "Wednesday"
      , "Friday"
      ]
    , times = [
        "10:00"
      , "14:00"
      ]
    ;
    
    course.addTimes(days, times);
    
    course.times.length.should.equal(6);
    course.times[2].should.eql({
      day: "Wednesday"
    , time: "10:00"
    });
  });
  
  //at this point we could say we were done.  It acts like we want!
  //but then we realize that hey, we should test some edge cases with our inputs
  
  it("shouldn't add a non-day to the times array", function () {
    var day = "frabjousday"
    , time = "10:00"
    ;
    
    //we don't want this to work, right?  So it should throw an error.
    expect(function () {
      course.addTimes(day, time);
    }).to.throw();
  });
  
  //shoot, our test failed.  Better head over to the course file and fix that.
  
  //now that we've made changes to our Course file, it works!  Yay completeness in testing!
});