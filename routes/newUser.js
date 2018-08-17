var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport')


var  User=require('.././db/userModel')

require('.././strategies/localStrategy')(passport);


/* GET users listing. */


router.post('/', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup'
}))

router.get('/', function(req, res){
  res.render('signup.html')
}

);
module.exports = router;
