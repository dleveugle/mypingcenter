/*
* CONTROLLER
*   Model : USER
*/

// Imported modules
var async = require('async');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();
const logger = new services.logger('app');
const { body, validationResult } = global.Utils.requireNodeModule('express-validator');
const {baseController} = require('./baseController');

class userController extends baseController {
    constructor(){
        super('user');
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


    validateSignup(req, res, next){
        logger._Controller(this._model, '/signup', req);
        if(!req.body.id || !req.body.password){
            res.status("400");
            res.send("Invalid details!");
         } else {
            Users.filter(function(user){
               if(user.id === req.body.id){
                  res.render('signup', {
                     message: "User Already Exists! Login or choose another user id"});
               }
            });
            var newUser = {id: req.body.id, password: req.body.password};
            Users.push(newUser);
            req.session.user = newUser;
            res.redirect('/protected_page');
         }

    }
}

module.exports={signupController};