var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const flash = require('connect-flash');

const i18n = require('i18n');
var services = require('./services'); // i18n & logger
const logger = new services.logger('app');

/**
 * Load utilities
 */
global.Utils = require(__dirname + '/utils');


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
app.use('/services', express.static(__dirname + '/services/'));
app.use('/jszip', express.static(__dirname + '/node_modules/jszip/dist/'));
app.use('/lodash', express.static(__dirname + '/node_modules/lodash/'));


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
    t = i18n.__.apply(req, arguments);
    return t;
  };
  res.locals.moment = require('moment');
  var path = req.url.split('/');
  res.locals.path = path[1] ? path[1] : '';
  res.locals.url = require('./services/myUrl');
  res.locals._ = require('lodash');
  res.locals.session = req.session;
  next();
});

// express-messages middleware 
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
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

/**
 * Middleware function to check if user has signed in
 * @param {*} req 
 * @param {*} res 
 */
function checkSignIn(req, res, next){
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
     console.log(req.session.user);
     next(err);  //Error, trying to access unauthorized page!
  }
}

// Routers
app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger._i(`Received a ${req.method} request for ${req.url}`);
  logger._iRequestParams(req);
  next();
});

app.use('/user', global.Utils.requireRoutes('user'));
app.use('/', global.Utils.requireRoutes('index'));

app.use('/clubs', checkSignIn, global.Utils.requireRoutes('club'));
app.use('/players', checkSignIn, global.Utils.requireRoutes('player'));
app.use('/params', checkSignIn, global.Utils.requireRoutes('params'));

/**
 * Database 
 */ 
app.db = require('./models').sequelize;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger._e(err.stack);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
