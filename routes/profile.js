var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    debugger;
    res.render('profile', { user: req.user });
  });

module.exports = router;
