var User = require('.././db/userModel');
var LocalStrategy = require('passport-local').Strategy;



module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    // passport.use('local-logout', new LocalStrategy(
    //   function(username, password, done) {
    //
    //   }
    // ))

    passport.use('local-login', new LocalStrategy(

      function( username, password, done) {

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


  passport.use('local-signup', new LocalStrategy(

    function(username, password, done) {

      process.nextTick(function() {
        debugger;
        User.findOne({'local.username' : username}, function(err, user){
          if (err)
            return done(err);

          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken'));
          } else {
            var newUser = new User();
            debugger;
            newUser.username = username;
            newUser.password = password;

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));
};
