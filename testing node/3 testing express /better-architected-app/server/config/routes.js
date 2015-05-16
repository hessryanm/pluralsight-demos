'use strict';

// var mongoose = require('mongoose')
//   , User = mongoose.model('User')
//   ;
  
//in the other version, users and courses were required in here.  Therefore, even if we only load this module, we can't mock out the users.
//instead, if we pass the users here (required in the server file), we can mock that out for tests.  Then, we can just check that the right functions get called with a stub.

module.exports = function(app, users, courses, auth) {

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.get('/api/courses', courses.getCourses);

  app.get('/partials/*', function(req, res) {

    res.render('../../public/app/' + req.params);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};