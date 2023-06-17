var express = require('express');
var router = express.Router();
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
const clubController = global.Utils.requireControllers('clubController');


/**
 * GET clubs listing. 
 */ 
router.get('/', function(req, res, next){
  clubController.clubs_list()
      .then(results => {
          res.render('clubs/clubsList', {
                breadcrumb: 'CLUBS',
                title: 'CLUBS', 
                list: results
          });
      })
      .catch(next);
});

/**
 * GET club detail
 * @param {number} id
 */
router.get('/edit/:id', function(req, res, next){
    if (id = -1){
        console.log("Creating a new club !!");
        clubController.club_new()
            .then(results => {
                res.render('clubs/clubEdit', {
                    breadcrumb: ['CLUBS','EDIT'],
                    details: results
                });
            })
            .catch((err)=>{
                console.log("Error : "+ err);
               next(err)});
    }
    else{
        clubController.club_details(req.params.id)
            .then(results => {
                res.render('clubs/clubEdit', {
                    breadcrumb: ['CLUBS','EDIT'],
                    details: results
                });
            })
            .catch(next);
    }
});

router.get('/new',function(req, res, next){
    res.redirect('edit/-1');
})

/**
 * POST club edit
 */
router.post('/edit/:id',  [
    body('shortdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubShortDescriptionIsMandatory', { value, location, path });
    }),
    body('longdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubLongDescriptionIsMandatory', { value, location, path });
    })
]
, function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        clubController.club_update(req)
        .then(res.status(200).jsonp({}))
        .catch(next);
      }
});

/**
 * 
 */
router.post('/create', [
    body('shortdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubShortDescriptionIsMandatory', { value, location, path });
    }),
    body('longdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubLongDescriptionIsMandatory', { value, location, path });
    })
],
function(req, res, next)
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        clubController.club_create(req)
        .then(res.status(200).jsonp({}))
        .catch(next);
      } 
});


/**
 * DELETE a club by id
 */
router.delete('/delete/:id',
    function(req, res, next) {
        clubController.club_delete(req.params.id)
        .then(res.status(200).jsonp({}))
        .catch(next);
});

module.exports = router;
