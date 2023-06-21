/*
* CONTROLLER
*   Model : PLAYER
*/


// Imported modules
var async = require('async');
const validator = require('express-validator');
const Player = global.Utils.requireDataModel('player');

// Display list of all ...
exports.players_list = function () {
    return new Promise((resolve, reject) => {
        Player.findAll({
            order: [['ID', 'ASC']]
            })
            .then(data => resolve(data));
    });
};

// Get details by pk
exports.player_details = function(id) {
    return new Promise((resolve, reject) => {
        Player.findByPk(id)
            .then(data => resolve(data));
    });
};

// update model
exports.player_update = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        Player.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            clubid: req.body.clubid
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
        Player.destroy({where:{id: id}})
            .then(data => resolve(data),
            error => reject(error));
    });
};

// create model
exports.player_create = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        Player.create({
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

// Instantiate model
exports.player_new = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        resolve(Player.build())
    });
};

