/*
* CONTROLLER
*   Model : PARAMS
*/

// Imported modules
var async = require('async');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();
const logger = new services.logger('app');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
const {baseController} = require('./baseController');


class paramsController extends baseController {
    constructor(){
        super('param');
    }

    _getList(){
        let r = super._getList();
        r.query = () => {
            return async.parallel({
                roles: function (callback) { 
                    db['role'].findAll({
                        order: [['ID', 'ASC']],
                    })
                    .then(data => {callback(null, data);})
                },
                seasons: function(callback){
                    db['season'].findAll({
                        order: ['startYear']
                    })
                    .then(data => {callback(null, data);})
                }
            })
        };
        return r;
    }

}

module.exports = paramsController;


