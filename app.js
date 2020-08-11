const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')

// validator
const flash = require('connect-flash');
const validator = require('express-validator');
const session = require('express-session');
const messages = require('express-messages')

const indexRouter = require('./routes/index');
const addRouter = require('./routes/musicAdd');
const musicsRouter = require('./routes/musics');
const editRouter = require('./routes/musicEdit');
const deleteRouter = require('./routes/musicDelete');
const singerRouter = require('./routes/singers');
const albumRouter = require('./routes/albums');
// const songsRouter = require('./routes/singerSongs');
const usersRouter = require('./routes/user');
const accountRouter = require('./routes/accountEdit');
// const fileMiddleware = require('./middleware/file');

const app = express();

// for navigation messages 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  next();
});

// express sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// app.use(fileMiddleware.single('accountImg'))

// express validator
app.use(validator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

// mongoDB connection
const db2 = require('./cf/db');
mongoose.connect(db2.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDb global connected');
});

// passport connection
require('./cf/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

// user init 
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})


app.use('/index', indexRouter);
app.use('/music/add', addRouter);
app.use('/musics', musicsRouter);
app.use('/edit/', editRouter);
app.use('/music/delete/', deleteRouter);
app.use('/artists/', singerRouter);
app.use('/albums/', albumRouter);
// app.use(`/musics/`, songsRouter);
app.use(`/`, usersRouter);
app.use(`/accountEdit/`, accountRouter);

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