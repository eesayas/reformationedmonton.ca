require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//mount routes
const indexRouter = require('./routes/index');
const sermonsRouter = require('./routes/sermons');
const eventsRouter = require('./routes/events');
const visitorsLogRouter = require('./routes/visitors-log');

const app = express();
// const port = process.env.PORT;

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect routers into routes
app.use('/', indexRouter);
app.use('/sermons', sermonsRouter);
app.use('/events', eventsRouter);
app.use('/visitors-log', visitorsLogRouter);

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
