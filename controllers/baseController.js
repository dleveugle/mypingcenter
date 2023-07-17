var async = require('async');
// database
const db = global.Utils.getDb();
// instantiate logger
const services = global.Utils.requireServices();
const logger = new services.logger('app');
// validator
const validator = require('express-validator');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
// lodash
const _ = global.Utils.requireLodash();

class baseController{
    constructor(model){
        this._model = model;
        logger._d(`Controller instanciated for model : ${this._model}`);
        this.list = this.list.bind(this);
        this.details = this.details.bind(this);
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getValidationRules = this.getValidationRules.bind(this);
        this._getList = this._getList.bind(this);
        this._getDetails = this._getDetails.bind(this);
        this._getPkClause = this._getPkClause.bind(this);
        this._fillModelWithReq = this._fillModelWithReq.bind(this);
        
    }

    /**
     * render function from query
     * @param {*} o object to render
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    _render(o, req, res, next){
        o.query().then(results => {
            logger._d(`Results sent back ${JSON.stringify(results)}`);
            res.render(o.viewname, {
                breadcrumb: o.breadcrumb,
                title:  o.title, 
                data: results
            });
        })
        .catch(err =>  {next(err);})
    }

    /**
     * Get object representing a pk clause
     * @param {*} req 
     * @returns 
     */
    _getPkClause(req){
        logger._w(`Controller for model ${this._model} doesn't implement _getPkClause method`)
        return { id: req.params.id};
    }
    /**
     * Get object representing list of model
     */
    _getList() { 
        return {
            query: () => { return db[this._model].findAll()},
            viewname: `${this._model}s/` + _.camelCase(`${this._model}s-list`),
            breadcrumb: [this._model],
            title: this._model

        }
    }

    /**
     * Get object representing a detail of a model
     */
    _getDetails(req){
        return {
            query: () => { if (req.params.id == -1){
                     return new Promise((resolve, reject)=> {resolve(db[this._model].build());});
                }
                else {
                    return db[this._model].findOne({
                        where: this._getPkClause(req)});
                }},
            viewname: `${this._model}s/` + _.camelCase(`${this._model}-edit`),
            breadcrumb: [this._model, 'DETAILS'],
            title: this._model
        }
    }

    /**
     * Fill a JSON with a model
     * @param {*} req 
     * @returns JSon object 
     */
    _fillModelWithReq(req){
        logger._e(`Controller for model ${this._model} doesn't implement _fillModelWithReq method`);
        return {};
    }

    /**
     * Middleware function for list of model
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    list(req, res, next) {
        logger._Controller(this._model, 'list', req);
        // get list of model
        var l = this._getList();
        // render data
        this._render(l, req, res, next);
    }

    /**
     * Middleware function for details of a model
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    details(req, res, next) {
        logger._Controller(this._model, 'details', req);
        // get details of a model
        var d = this._getDetails(req);
        // render data
        this._render(d, req, res, next);
    }

    /**
     * Middleware function for deletion of a model
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    delete(req, res, next) {
        logger._Controller(this._model, 'delete', req);
        db[this._model].destroy({where: this._getPkClause(req)})
        .then(()=> {
            req.flash('success', req.__(`MSG_${this._model}Deleted`));
            res.status(200).jsonp({})
        })
        .catch(err =>  {next(err);})
    }

    /**
     * Middleware function for creation of a model
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    create(req, res, next){
        logger._Controller(this._model, 'create', req);
        // errors is set by validator called in the router
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            db[this._model].create(
                this._fillModelWithReq(req)
            )
            .then(()=>{
                req.flash('success', req.__(`MSG_${this._model}Created`))
                res.status(200).jsonp({})
            })
            .catch(err =>  {next(err);})
        }
    }

    /**
     * Middleware function to update model
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    update(req, res, next){
        logger._Controller(this._model, 'update', req);
        // errors is set by validator called in the router
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            db[this._model].update(
                this._fillModelWithReq(req), 
                {
                    where: this._getPkClause(req)
                }
            )
            .then(()=>{
                req.flash('success', req.__(`MSG_${this._model}Updated`))
                res.status(200).jsonp({})
            })
            .catch(err =>  {next(err);})
        }
    }

   /**
    * Middleware function for validation rules
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    * @returns 
    */
    getValidationRules() {
        logger._d(`Controller for model ${this._model} validation rules for path ${req.path}`);
        logger._e(`Controller for model ${this._model} doesn't implement getValidationRules method`);
        next();
    }

}

module.exports={baseController};