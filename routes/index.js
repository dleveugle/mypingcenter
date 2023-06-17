var express = require('express');
var router = express.Router();
var services = global.Utils.requireServices();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Log messages at different log levels
  services.logger.log("error", "This is an error message");
  services.logger.log("warn", "This is a warning message");
  services.logger.log("info", "This is an info message");
  services.logger.log("verbose", "This is a verbose message");
  services.logger.log("debug", "This is a debug message");
  services.logger.log("silly", "This is a silly message");
  req.flash("success", "your flash messages are working");
  res.render('index', { title: 'Express' });
});

module.exports = router;
