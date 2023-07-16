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
const {baseController} = require('./baseController');


class clubController extends baseController {
    constructor(){
        super('club');
    }

    _getList(){
        let r = super._getList();
        r.query = () => {return db['club'].findAll({
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
            })};
        return r;
    }

    _fillModelWithReq(req){
        return {
            shortdesc: req.body.shortdesc,
            longdesc: req.body.longdesc
        }
    }

    getValidationRules(action) {
        switch(action){
            case '/create':
            case '/update':
                return [
                    body('shortdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
                            return req.__('MSG_ClubShortDescriptionIsMandatory', { value, location, path });
                        }),
                    body('longdesc').not().isEmpty().withMessage((value, { req, location, path }) => {
                            return req.__('MSG_ClubLongDescriptionIsMandatory', { value, location, path });
                        })];
                    break;
            default:
                logger._w(`No validation rule defined for action ${action} in clubController`)

        }
    }

}

module.exports = clubController;
