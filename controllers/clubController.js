/*
* CONTROLLER
*   Model : CLUB
*/

// Imported modules
var async = require('async');
const validator = require('express-validator');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();
const logger = new services.logger('app');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');

/**
 * GET CLUB LIST
 */
exports.clubs_list = function (req, res, next) {
    logger._Controller('Club', 'clubs_list', req);
    db['club'].findAll({
        attributes: {
            include: [
                [db.Sequelize.fn('COUNT', db.Sequelize.col('players.id')), 'nbplayers']
            ]
        },
        include: {
            model: db['player'],
            attributes: [],
            required: false,
        },
        group: ['club.id'],
        order: [['id', 'ASC']]
    })
    .then(results => {
        logger._d(`Results sent back ${JSON.stringify(results,' ', 2)}`);
        res.render('clubs/clubsList', {
            breadcrumb: 'CLUBS',
            title: 'CLUBS', 
            list: results
        });
    })
    .catch(err =>  {next(err);})
};


/**
 * GET CLUB DETAILS
 */
exports.club_details = function(req, res, next) {
    logger._Controller('Club', 'club_details', req);
    async.parallel({
        club: function(callback){
            if(req.params.id == -1){
                callback(null, db['club'].build());
            }
            else {
                data = db['club'].findByPk(req.params.id)
                .then(data => {callback(null,data);});
            }
        }
    })
    .then(results => {
        logger._d(`Results sent back ${JSON.stringify(results,' ', 2)}`);
        res.render('clubs/clubEdit', {
            breadcrumb: ['CLUBS','EDIT'],
            data: results
        })},
        err => {return next(err);}
    )
};

/**
 * UPDATE CLUB DETAILS
 */
exports.club_update =  [
    body('shortdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubShortDescriptionIsMandatory', { value, location, path });
    }),
    body('longdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubLongDescriptionIsMandatory', { value, location, path });
    }), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            db['club'].update({
                shortdesc: req.body.shortdesc,
                longdesc: req.body.longdesc
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                req.flash('success', req.__('MSG_ClubUpdated'));
                res.status(200).jsonp({});
            })
            .catch(err =>  {next(err);})
        }
    }
];

/**
 * DELETE CLUB
 */
exports.club_delete = function(req, res, next) {
    db['club'].destroy({where:{id: id}})
    .then(()=> {
        req.flash('success', req.__('MSG_ClubDeleted'));
        res.status(200).jsonp({})
    })
    .catch(err =>  {next(err);})
};

/**
 * CREATE CLUB
 */
exports.club_create = [
    body('shortdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubShortDescriptionIsMandatory', { value, location, path });
    }),
    body('longdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
        return req.__('MSG_ClubLongDescriptionIsMandatory', { value, location, path });
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            db['club'].create({
                shortdesc: req.body.shortdesc,
                longdesc: req.body.longdesc
            })
            .then(()=>{
                req.flash('success', req.__('MSG_ClubCreated'))
                res.status(200).jsonp({})
            })
            .catch(err =>  {next(err);})
        }
    }
];
