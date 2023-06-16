var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

const i18n = require('i18n');
var services = require('./services');

/**
 * Load utilities
 */
global.Utils = require(__dirname + '/utils');


// instantiate routers
//var indexRouter = global.Utils.requireRoutes('index');
//var clubsRouter = global.Utils.requireRoutes('clubRouter');

var app = express();

// application settings
services.i18nUrls.configure(app, i18n, {
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  directory: './locales',
  cookie: process.env.npm_package_name + '_i18n_cookie',
  indent: ' '
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.locals.basedir = path.join(__dirname, 'views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("mypingcenter"));
app.use(express.static(path.join(__dirname, 'public')));

// Dedicated modules directories
app.use('/boxicons', express.static(__dirname + '/node_modules/boxicons/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/datatables', express.static(__dirname + '/node_modules/datatables.net/'));
app.use('/datatables-dt', express.static(__dirname + '/node_modules/datatables.net-dt/'));
app.use('/datatables-bs5', express.static(__dirname + '/node_modules/datatables.net-bs5/'));
app.use('/datatables-buttons', express.static(__dirname + '/node_modules/datatables.net-buttons/'));
app.use('/datatables-buttons-bs5', express.static(__dirname + '/node_modules/datatables.net-buttons-bs5/'));
app.use('/datatables-select-bs5', express.static(__dirname + '/node_modules/datatables.net-select-bs5/'));
app.use('/jszip', express.static(__dirname + '/node_modules/jszip/dist/'));


app.use(session({
  secret: "mypingcenter",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(i18n.init);
app.use(services.i18nUrls.init);

app.use(function(req, res, next) {
  // express helper for natively supported engines
  res.locals.__ = res.__ = function() {
      return i18n.__.apply(req, arguments);
  };

  next();
});

/***************************************************************************************
 * // Custom middleware to convert empty string to null
 * @param {*} obj 
 * @returns obj
 */
function setEmptyToNull(obj) {
  Object.keys(obj).forEach(key => {
      if (Array.isArray(obj[key])) {
          obj[key].map(o => {
              if (typeof o === 'object') {
                  setEmptyToNull(o);
              }
          })
      } else if(typeof obj[key] ==='string') {
        if(obj[key].trim() === '') {
          obj[key] = null;
        }  
      } else if(typeof obj[key] === 'object') {
        setEmptyToNull(obj[key]);
      }
  });
  return obj;
}

app.use((req, res, next) => {
  if(req.body) {
    setEmptyToNull(req.body);
  };
  next();
});
//***************************************************************************************

// Routers
console.log(global.Utils);
app.use('/', global.Utils.requireRoutes('index'));
app.use('/clubs', global.Utils.requireRoutes('clubRouter'));

/**
 * Database 
 */ 
app.db = require("./config/database").db;

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


module.exports = app;
