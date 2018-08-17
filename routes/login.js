var express = require('express');
var router = express.Router();
var passport = require(".././strategies/localStrategy")


/* GET users listing. */


router.get('/', function(req, res){
  res.render('loginForm.html')
});

router.post('/', passport.authenticate('local', { successRedirect: '/',
                                                  failureRedirect: '/login'
                                                })
                                                  );

module.exports = router;
