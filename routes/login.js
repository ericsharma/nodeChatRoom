var express = require('express');
var router = express.Router();
var passport = require('passport')


var  User=require('.././db/userModel')

require('.././strategies/localStrategy')(passport);


/* GET users listing. */


router.get('/', function(req, res){
  res.render('loginForm.html')
});

router.post('/', passport.authenticate('local-login', { successRedirect: '/profile',
                                                  failureRedirect: '/login'
                                                })
                                                  );

module.exports = router;
