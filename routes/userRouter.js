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

/**
 * POST 
 */ 
router.post('/signup', u.validateSignup)

module.exports = router;
