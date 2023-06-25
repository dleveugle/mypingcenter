/*
* ROUTER <CLUB>
*/
var express = require('express');
var router = express.Router();
const clubController = global.Utils.requireControllers('clubController');


/**
 * GET 
 */ 
router.get('/', clubController.clubs_list);
router.get('/edit/:id', clubController.club_details);
router.get('/new',function(req, res, next){ res.redirect('edit/-1');});

/**
 * POST 
 */
router.post('/edit/:id', clubController.club_update);
router.post('/create', clubController.club_create);

/**
 * DELETE 
 */
router.delete('/delete/:id', clubController.club_delete);
    

module.exports = router;
