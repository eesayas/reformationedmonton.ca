require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const User = require("./model/user");

//mount routes
const indexRouter = require('./routes/index');
const sermonsRouter = require('./routes/sermons');
const eventsRouter = require('./routes/events');
const visitRouter = require('./routes/visit');

const app = express();
// const port = process.env.PORT;

// connect to mongo db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

const db = mongoose.connection;

//handle connection events
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log("you're connected to Reformation Baptist Church of Edmonton db...");
});

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect routers into routes
app.use('/', indexRouter);
app.use('/sermons', sermonsRouter);
app.use('/events', eventsRouter);
app.use('/visits', visitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(port);

module.exports = app;
