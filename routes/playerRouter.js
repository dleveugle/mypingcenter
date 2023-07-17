/*
* ROUTER
*/

// import modules
var express = require('express');
var router = express.Router();
var playerController = global.Utils.requireControllers('player');
const p = new playerController();
/**
 * GET 
 */ 
router.get('/', p.list);
router.get('/edit/:id', p.details);
router.get('/new',function(req, res, next){res.redirect('edit/-1');});


/**
 * POST
 */
router.post('/create', p.getValidationRules('/create'), p.create);
router.post('/edit/:id', p.getValidationRules('/update'), p.update);

/**
 * DELETE
 */
router.delete('/delete/:id', p.delete);

module.exports = router;
