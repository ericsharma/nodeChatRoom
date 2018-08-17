

var express = require('express'),
    path = require('path'),
    app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require("express-session")
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var profileRouter = require('./routes/profile');
var newUserRouter= require('./routes/newUser')
var loginRouter = require('./routes/login')
var indexRouter = require('./routes/index')
var passport = require('./strategies/localStrategy')








app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(logger('dev'));
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats "}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('html', require('ejs').renderFile);




app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', indexRouter)

app.use('/profile', profileRouter);



app.use("/new", newUserRouter);

app.use("/login", loginRouter)






io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
