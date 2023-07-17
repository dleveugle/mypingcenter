/*
* ROUTER : PARAMETERS
*/

// import modules
var express = require('express');
var router = express.Router();
var paramsController = global.Utils.requireControllers('params');
const p = new paramsController();

/**
 * GET 
 */ 
// params list route
router.get('/', p.list);

module.exports = router;
