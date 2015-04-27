'use strict';

var fs = require("fs")
;

//this is a wrapper for a data loader.  
//a wrapper is very useful for testability as well as refactoring
//from a usage and testing standpoint, we don't know HOW this gets a student
//just that it does

//this gets info from a file.  It could very well be getting it from a database or wherever.

function DataLoader () {}

DataLoader.getStudent = function (studentId, cb) {
  var filePath = "./students/"+studentId+".json";
  
  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.code && "ENOENT" === err.code) {
        throw new Error("Student "+studentId+" does not exist");
      }
      throw err;
    }
    
    cb(JSON.parse(data));
  });
};

DataLoader.getStudentSync = function (studentId) {
  var filePath = "./students/"+studentId+".json";
  
  return JSON.parse(fs.readFileSync(filePath));
};

module.exports = DataLoader;