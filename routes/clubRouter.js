/*
* ROUTER <CLUB>
*/
var express = require('express');
var router = express.Router();
//TODO Suppress 'Controller' string in requireController call
var clubController = global.Utils.requireControllers('club');
const c = new clubController();

/**
 * GET 
 */ 
router.get('/', c.list);
router.get('/edit/:id', c.details);
router.get('/new',function(req, res, next){ res.redirect('edit/-1');});

/**
 * POST 
 */
router.post('/create', c.getValidationRules('/create'), c.create);
router.post('/edit/:id', c.getValidationRules('/update'), c.update);

/**
 * DELETE 
 */
router.delete('/delete/:id', c.delete);
    

module.exports = router;
