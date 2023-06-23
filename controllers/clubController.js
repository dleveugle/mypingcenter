/*
* CONTROLLER
*   Model : CLUB
*/


// Imported modules
var async = require('async');
const validator = require('express-validator');

const db = global.Utils.getDb();

// Display list of all Clubs.
exports.clubs_list = function () {
    return new Promise((resolve, reject) => {
        db['club'].findAll({
            order: [['ID', 'ASC']]
            })
            .then(data => resolve(data));
    });
};

// Get club details by pk
exports.club_details = function(id) {
    return new Promise((resolve, reject) => {
        db['club'].findByPk(id)
            .then(data => resolve(data));
    });
};

exports.club_update = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        db['club'].update({
            shortdesc: req.body.shortdesc,
            longdesc: req.body.longdesc
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

exports.club_delete = function(id) {
    return new Promise((resolve, reject)=> {
        db['club'].destroy({where:{id: id}})
            .then(data => resolve(data),
            error => reject(error));
    });
};

exports.club_create = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        db['club'].create({
            shortdesc: req.body.shortdesc,
            longdesc: req.body.longdesc
        })
        .then(
            data => resolve(data),
            error => reject(error));
    });
};

exports.club_new = function(req, res, next) {
    return new Promise((resolve, reject) =>{
        resolve(db['club'].build())
    });
};

