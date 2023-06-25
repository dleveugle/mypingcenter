/*
* ROUTER
*/

// import modules
var express = require('express');
var router = express.Router();
const playerController = global.Utils.requireControllers('playerController');

/**
 * GET 
 */ 
// player list route
router.get('/', playerController.players_list);
// edit player route
router.get('/edit/:id', playerController.player_details_get);
// route for new player
router.get('/new',function(req, res, next){res.redirect('edit/-1');});


/**
 * POST
 */
router.post('/create', playerController.player_create);
router.post('/edit/:id', playerController.player_update);

/**
 * DELETE
 */
router.delete('/delete/:id', playerController.player_delete);

module.exports = router;
