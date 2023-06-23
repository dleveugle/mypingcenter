/*
* ROUTER
*/

// import modules
var express = require('express');
var router = express.Router();
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
const playerController = global.Utils.requireControllers('playerController');
const services = global.Utils.requireServices();




/**
 * GET clubs listing. 
 */ 
router.get('/', function(req, res, next){
    playerController.players_list()
      .then(results => {
            services.logger.info(JSON.stringify(results));
          res.render('players/playersList', {
                breadcrumb: 'PLAYERS',
                title: 'PLAYERS', 
                list: results
          });
      })
      .catch(next);
});

/**
 * GET player detail
 * @param {number} id
 */

router.get('/edit/:id', playerController.player_details_get);

// route for new player
router.get('/new',function(req, res, next){
    res.redirect('edit/-1');
})

/**
 * POST player edit
 */
router.post('/edit/:id', [
    body('firstname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerFirstNameIsMandatory', { value, location, path });
    }),
    body('lastname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerLastNameIsMandatory', { value, location, path });
    })
]
, function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        playerController.player_update(req)
        .then(res.status(200).jsonp({}))
        .catch((err)=>{
            services.logger.error(err);
            next(err)});
      }
});

/**
 * 
 */
router.post('/create', [
    body('firstname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerFirstNameIsMandatory', { value, location, path });
    }),
    body('lastname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerLastNameIsMandatory', { value, location, path });
    })
],
function(req, res, next)
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        playerController.player_create(req)
        .then(()=>{
            req.flash('success', req.__('MSG_PlayerCreated'))
            res.status(200).jsonp({})
        })
        .catch((err)=>{
            services.logger.error(err);
           next(err)});
      } 
});


/**
 * DELETE a club by id
 */
router.delete('/delete/:id',
    function(req, res, next) {
        playerController.player_delete(req.params.id)
        .then(()=> {
            req.flash('success', req.__('MSG_PlayerDeleted'));
            res.status(200).jsonp({})
        })
        .catch((err)=>{
            services.logger.error(err);
           next(err)});
});

module.exports = router;
