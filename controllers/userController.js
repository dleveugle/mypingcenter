/*
* CONTROLLER
*   Model : USER
*/

// Imported modules
var async = require('async');
const db = global.Utils.getDb();
const Op = global.Utils.requireDB().Op;
const services = global.Utils.requireServices();
const logger = new services.logger('app');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
const {baseController} = require('./baseController');

class userController extends baseController {
    constructor(){
        super('user');
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.ajaxValidateSignup = this.ajaxValidateSignup.bind(this);
        this.ajaxValidateLogin = this.ajaxValidateLogin.bind(this);
    }

    /**
     * Middleware function to display signup page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    signup(req, res, next){
        logger._Controller(this._model, '/signup', req);
        res.render('signup');
    }

    /**
     * Middleware function for login
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    login(req, res, next) {
        logger._Controller(this._model, '/login', req);
        res.render('user/login');
    }

    /**
     * Middleware function for logout
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    logout(req, res, next) {
        logger._Controller(this._model, '/logout', req);
        req.session.destroy(function(){
            logger._i('User logged out');
        });
        res.redirect('/');
    }

    /**
     * Middleware function to validate signup form
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     ajaxValidateSignup(req, res, next){
        logger._Controller(this._model, '/signup', req);
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            const user = db['user'].findOne({where: { id : req.body.username }});
            if(user.id) {
                return res.status(422).jsonp([{path:'username', msg:'MSG_UsernameAlreadyExist'}]);
            }
            else {
                let e = new services.encrypter();
                e.encrypt(req.body.password)
                .then((data) => {
                    const newUser = {
                        id: req.body.username, 
                        password: data
                    }
                    db['user']
                    .create(newUser)
                    .then(()=> {
                        req.session.user = newUser;
                        req.flash('success', req.__(`MSG_userSignedUp`, newUser.id));
                        res.status(200).jsonp({});
                    });
                })
                .catch(() =>{
                    req.flash('error', req.__(`MSG_encryptionError`))
                    res.redirect('/');
                })
            }
        }
    }

    /**
     * Middleware function for login form validation
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async ajaxValidateLogin (req, res, next) {
        logger._Controller(this._model, '/validateLogin', req);
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            const user = await db['user'].findOne({where: { id : req.body.username }});
            logger._d(JSON.stringify(user));
            if(user.id) {
                let e = new services.encrypter();
                logger._d(`Testing password ${req.body.password} versus ${user.password}` );
                e.compare(req.body.password, user.password)
                .then(()=>{
                    req.session.user = user;
                    req.flash('success', req.__(`MSG_WelcomeUser`, user.id));
                    res.status(200).jsonp({});
                });
            }
            else {
                return res.status(422).jsonp([{path:'username', msg:'MSG_UsernameDoesNotExist'}]);
            }
            
//            res.render('login', {message: "Invalid credentials!"});
        }
    }

    getValidationRules(action) {
        switch(action){
            case '/validateLogin':
            case '/validateSignup':
                return [
                    body('username').not().isEmpty().withMessage((value, { req, location, path }) => {
                            return req.__('MSG_UsernameIsMandatory', { value, location, path });
                        }),
                    body('password').not().isEmpty().withMessage((value, { req, location, path }) => {
                            return req.__('MSG_PasswordIsMandatory', { value, location, path });
                        })];
                    break;
            default:
                logger._w(`No validation rule defined for action ${action} in ${this._model}Controller`)

        }
    }

}

module.exports = userController;