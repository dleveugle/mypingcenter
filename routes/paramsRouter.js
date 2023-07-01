/*
* ROUTER : PARAMETERS
*/

// import modules
var express = require('express');
var router = express.Router();
const paramsController = global.Utils.requireControllers('paramsController');

/**
 * GET 
 */ 
// params list route
router.get('/', paramsController.params_list);

module.exports = router;
