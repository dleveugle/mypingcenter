/*
* ROUTER <CLUB>
*/
var express = require('express');
var router = express.Router();
//TODO Suppress 'Controller' string in requireController call
var clubController = global.Utils.requireControllers('clubController');
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

/*router.post('/edit/:id', clubController.club_update);
router.post('/create', clubController.club_create);

/**
 * DELETE 
 */
router.delete('/delete/:id', c.delete);
    

module.exports = router;
