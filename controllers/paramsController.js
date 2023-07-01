/*
* CONTROLLER
*   Model : PARAMS
*/

// Imported modules
const services = global.Utils.requireServices();
const logger = new services.logger('app');

/**
 * GET PARAMS LIST
 */
exports.params_list = function (req, res, next) {
    logger._Controller('Params', 'params_list', req);
    res.render('params/paramsList', {
        breadcrumb: [req.__('PARAMETERS')],
    });
};


