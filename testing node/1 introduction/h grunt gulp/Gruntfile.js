'use strict';

module.exports = function (grunt) {
  
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.initConfig({
    
    watch: {
      scripts: {
        files: ['**/*.js']
      , tasks: ['mochaTest']
      }
    }
    
  , mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        }
      , src: ['test/**/*.js']
      }
    }
  });
  
  grunt.registerTask('default', 'watch');
};