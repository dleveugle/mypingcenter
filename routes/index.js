var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //req.setLocale(req.cookies.i18n);
  res.render('index', { title: 'Express' });
});

module.exports = router;
