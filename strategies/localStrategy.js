var User = require('.././db/userModel');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy(
  // { passReqToCallback : true },
  function( username, password, done) {
    var tester = "this is test";
    // debugger;
    User.findOne( { username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'incorrect username.'});
      }
      if(!user.validPassword(password)) {
        // debugger;
        return done(null, false, { message: 'Incorrect password.'});
      }

      // debugger;
      return done(null, user);

    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
  
});

module.exports = passport
