require("dotenv").config();
require("./config/dbconnect");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// SESSION SETUP for authentification (cookies)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 600000
    }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);


// ACCESS THE USER INFO FROM THE VIEWS THANKS TO res.locals.variable
app.use((req, res, next) => {
  // console.log(req.session.currentUser, "----- user session");
  // we defined this key inside router.post("/signin").
  if (req.session.currentUser) {
    // res.locals.YOURVARIABLE is a way to define variables accessible
    // to the template (hbs) during the request / response cycle.
    // We can reference this variable in our template, it allows us to 
    // Know if a user is loggedIn, can be used to do render certain parts of the layout :)
    res.locals.user = req.session.currentUser // Allows us to access user info with the user key in the template
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', require('./routes/crud'));
app.use("/allevents", require("./routes/allevents"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;