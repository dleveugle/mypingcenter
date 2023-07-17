/*
* CONTROLLER
*   Model : PLAYER
*/

// Imported modules
var async = require('async');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();
const logger = new services.logger('app');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
const {baseController} = require('./baseController');


class playerController extends baseController {
    constructor(){
        super('player');
    }

    _getList(){
        let r = super._getList();
        r.query = () => {
            return db['player'].findAll({
                order: [['ID', 'ASC']],
                include: [{
                    model: db['club']
                }]
            })
        };
        return r;
    }

    _getDetails(req){
        let r = super._getDetails(req);
        r.query = () => {
            return async.parallel({
                clubs: function (callback){
                    db['club'].findAll()
                    .then(data => {callback(null, data);});
                },
                roles: function (callback){
                    db['role'].findAll()
                    .then(data => {callback(null, data);});
                },
                player: function(callback){
                    if(req.params.id == -1) {
                        callback(null, db['player'].build());
                    }
                    else{
                        db['player'].findByPk(req.params.id,{
                            include: [{
                                model: db['club'],
                                model: db['role']
                            }]
                        })
                        .then(data => {callback(null,data);});
                    }
                }
            })
        }
        return r;
    }

    _fillModelWithReq(req){
        return {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            clubId: req.body.clubid,
            roleId: req.body.roleid
        }
    }

    getValidationRules(action) {
        switch(action){
            case '/create':
            case '/update':
                return [
                    body('firstname').not().isEmpty().withMessage((value, { req, location, path }) => {
                        return req.__('MSG_PlayerFirstNameIsMandatory', { value, location, path });
                    }),
                    body('lastname').not().isEmpty().withMessage((value, { req, location, path }) => {
                        return req.__('MSG_PlayerLastNameIsMandatory', { value, location, path });
                    })];
                    break;
            default:
                logger._w(`No validation rule defined for action ${action} in playerController`)

        }
    }

}

module.exports = playerController;
