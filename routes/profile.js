var express = require('express');
var router = express.Router();
var  User=require('.././db/userModel')
var passport= require('passport')

require('.././strategies/localStrategy')(passport);

/* GET users listing. */


router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    debugger;
    res.render('profile', { user: req.user });
  });

  router.get('/logout', function(req, res){
    res.send('thisssss')
    req.logout();
    // req.redirect('/');
  })


module.exports = router;
