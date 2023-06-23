/*
* CONTROLLER
*   Model : PLAYER
*/


// Imported modules
var async = require('async');
const validator = require('express-validator');
const db = global.Utils.getDb();
const services = global.Utils.requireServices();

// Display list of all ...
exports.players_list = function () {
    return new Promise((resolve, reject) => {
        db['player'].findAll({
            order: [['ID', 'ASC']],
            include: [{
                model: db['club']
            }]
        })
        .then(data => resolve(data));
    });
};


exports.player_details_get = function(req, res, next){
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
            services.logger.info(JSON.stringify(results));
            res.render('players/playerEdit', {
                breadcrumb: ['PLAYERS','EDIT'],
                data: results
            })},
            err => {return next(err);}
        )
    }
}

// update model
exports.player_update = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        services.logger.info(JSON.stringify(req.body));
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
        .then(
            data => resolve(data),
            error => reject(error));
    });
};

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


