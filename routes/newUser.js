var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require(".././strategies/localStrategy")
var  User=require('.././db/userModel')
var request = require('request');

/* GET users listing. */


router.post('/',function(req, res){
  console.log(req.body);

  var myData = new User(req.body);
  myData.save()
  debugger;
  passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login'
                                                  })
  .then(item => {
    res.send(item);
    debugger;


    // passport.serializeUser(function(user, done) {
    //   done(null, user.id);
  })
  .catch(err => {
    res.status(400).send('unable to save to database')
  })


});

router.get('/', function(req, res){
  res.render('signup.html')
}

);
module.exports = router;
