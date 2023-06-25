/*
* CONTROLLER
*   Model : PLAYER
*/


// Imported modules
var async = require('async');
const validator = require('express-validator');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();
const logger = new services.logger('app');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');

// Display list of all ...
exports.players_list = function (req, res, next) {
    logger._Controller('Player', 'players_list', req);
    db['player'].findAll({
        order: [['ID', 'ASC']],
        include: [{
            model: db['club']
        }]
    })
    .then(results =>{
        res.render('players/playersList', {
            breadcrumb: 'PLAYERS',
            title: 'PLAYERS', 
            data: results
        });
    },
        err => {next(err);}
    );
};


/**
 * GET PLAYER DETAILS
 */
exports.player_details_get = function(req, res, next){
    logger._Controller('Player', 'player_details_get', req);
    async.parallel({
        clubs: function (callback){
            db['club'].findAll()
            .then(data => {callback(null, data);});
        },
        player: function(callback){
            if(req.params.id == -1) {
                callback(null, db['player'].build());
            }
            else{
                db['player'].findByPk(req.params.id,{
                    include: [{
                        model: db['club']
                    }]
                })
                .then(data => {callback(null,data);});
            }
        }
    })
    .then(results => {
        logger._d(`Results sent back ${JSON.stringify(results,' ', 2)}`);
        res.render('players/playerEdit', {
            breadcrumb: ['PLAYERS','EDIT'],
            data: results
        })},
        err => {return next(err);}
    )
}


// update model
exports.player_update = [
    body('firstname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerFirstNameIsMandatory', { value, location, path });
    }),
    body('lastname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerLastNameIsMandatory', { value, location, path });
    }),
    (req, res, next) => {
        logger._Controller('Player', 'player_update', req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            db['player'].update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate,
                clubId: req.body.clubid
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                req.flash('success', req.__('MSG_PlayerUpdated'));
                res.status(200).jsonp({});
            })
            .catch(err =>  {next(err);})
        } 
    }
];


/**
 * DELETE PLAYER
 */
exports.player_delete = function(req, res, next) {
    logger._Controller('Player', 'player_delete', req);
    db['player']
    .destroy({where:{id: req.params.id}})
    .then(()=> {
        req.flash('success', req.__('MSG_PlayerDeleted'));
        res.status(200).jsonp({})
    })
    .catch(err => {next(err);})
};

/**
 * CREATE PLAYER
 */
exports.player_create = [
    // Validation rules
    body('firstname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerFirstNameIsMandatory', { value, location, path });
    }),
    body('lastname').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_PlayerLastNameIsMandatory', { value, location, path });
    }),
    function (req, res, next) {
        logger._Controller('Player', 'player_create', req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            db['player'].create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate,
                clubid: req.body.clubid
            })
            .then(() =>{
                req.flash('success', req.__('MSG_PlayerCreated'))
                res.status(200).jsonp({})
            })
            .catch(err => {next(err);})
        }
    }
];


