/*
* CONTROLLER
*   Model : PARAMS
*/

// Imported modules
var async = require('async');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();
const logger = new services.logger('app');

/**
 * GET PARAMS LIST
 */
exports.params_list = function (req, res, next) {
    logger._Controller('Params', 'params_list', req);
    async.parallel({
        roles: function (callback) { 
            db['role'].findAll({
                order: [['ID', 'ASC']],
            })
            .then(data => {callback(null, data);})
        }
    })
    .then(results => {
        logger._d(`Results sent back ${JSON.stringify(results,' ', 2)}`);
        res.render('params/paramsList', {
            breadcrumb: [req.__('Parameters')],
            data: results
        })},
        err => {return next(err);}
    );
};



