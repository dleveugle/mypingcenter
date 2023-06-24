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
    logger._d('Player controller called for players list');
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
 * Getting details of...
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.player_details_get = function(req, res, next){
    logger._d('Player controller called for details of player ');
    logger._iRequestParams(req);
    if (req.params.id == -1){
        db['player']
        .build()
        .exec(function(err, results){
            if(err) {return next(err);}
            res.render('players/playerEdit', {
                breadcrumb: ['PLAYERS','EDIT'],
                details: results
            });
        });
    }
    else{
        async.parallel({
            clubs: function (callback){
               db['club'].findAll()
               .then(data => {callback(null, data);});
            },
            player: function(callback){
                db['player'].findByPk(req.params.id,{
                    include: [{
                        model: db['club']
                    }]
                })
                .then(data => {callback(null,data);});
                
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
            .then(res.status(200).jsonp({}))
            .catch(err =>  {next(err);})
        } 
    }
];

// delete model
exports.player_delete = function(id) {
    return new Promise((resolve, reject)=> {
        db['player'].destroy({where:{id: id}})
            .then(data => resolve(data),
            error => reject(error));
    });
};

// create model
exports.player_create = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        db['player'].create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            clubid: req.body.clubid
        })
        .then(
            data => resolve(data),
            error => reject(error));
    });
};


