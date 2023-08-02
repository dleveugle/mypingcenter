/*
* ROUTER : SIGNUP
*/

// import modules
var express = require('express');
var router = express.Router();
var userController = global.Utils.requireControllers('user');
const u = new userController();

/**
 * GET 
 */ 
// params list route
router.get('/signup', u.signup);
router.get('/login', u.login);
router.get('/logout', u.logout);

/**
 * POST 
 */ 
router.post('/signup', u.getValidationRules('/validateSignup'), u.ajaxValidateSignup);
router.post('/login', u.getValidationRules('/validateLogin'), u.ajaxValidateLogin);
module.exports = router;
