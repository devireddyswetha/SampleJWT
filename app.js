var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const express = require('express');
const app = express();
var router = require('./routes/index');
// var users = require('./routes/users');

mongoose.connect('mongodb://localhost/Students');

var user_api = require('./node_controller/userData');

app.listen(4000, function(){
  console.log('Example app listening on port 4000!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/getusers', user_api.get_User_Data);
app.post('/registerusers', user_api.create_Users);

app.post('/login', user_api.user_login);

app.post('/verifytoken', user_api.verifyToken);
app.post('/verifytoken', user_api.check_token);


//verify token
// function verifyToken(req,res,next){
//   //console.log('coming here also',req.headers);
//   const bearerHeader = req.headers['content-type'];
//   console.log('coming here 2222',bearerHeader);
//   console.log(typeof bearerHeader);

//   if(bearerHeader !== undefined) {
//     console.log('in if');
//     const bearer = bearerHeader.split(' ');
//     console.log('bearer',bearer,bearer.length);
//     const bearerToken = bearer[0];
//     console.log('bearToken',bearerToken);
//     req.token = bearerToken;
//     next();    
//   } else {
//     console.log('in else');
//     res.sendStatus(403);
//   }
// }


app.put('/updateusers/:id', user_api.update_Users);
app.delete('/deleteusers/:id', user_api.delete_Users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;





