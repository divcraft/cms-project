var createError = require('http-errors');
const cookieSession = require('cookie-session')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config')
const database = require('./mongoose')
database()

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({ // metoda pobrana z biblioteki cookie-session
  name: 'session',
  keys: config.keySession,
  // cookie options
  maxAge: config.maxAgeSession
}))

app.use((req, res, next) => { // deklarujemy wartość path w obiekcie local żeby później użyć tego w templatce pug
  res.locals.path = req.path
  next()
})

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);

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