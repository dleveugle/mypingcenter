var express = require('express');
var router = express.Router();
var services = global.Utils.requireServices();
const logger = new services.logger('route');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Log messages at different log levels
  logger._e("This is an error message");
  logger._w("This is an warning message");
  logger._i("This is an info message");
  logger._d("This is a debug message");
  res.render('index', { title: 'Express' });
});

module.exports = router;
