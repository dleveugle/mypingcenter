
console.log('This script populates some test data');

var async = require('async')


/**
 * Import the database connection file.
 */
//const {db, datatypes} = require("./config/database");

//const Club = require('./models/club')(db, datatypes);
//const Player = require('./models/player')(db, datatypes);

const db = require('./models');

db.sequelize.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`);
  async.series([
    createClubs,
    createPlayers
  ],
  // Optional callback
  function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Insertions des données : OK');
        
    }
  });
  
});

  var Clubs =  [];
  var Players = [];

  // Create an club record
  function clubCreate(id, shortdesc, longdesc, cb){
    clubDetails = {id:id, shortdesc:shortdesc, longdesc:longdesc};
    var club = db['club'].create(clubDetails)
    .then(club=> {
      console.log('New club: ' + JSON.stringify(club, null, 4));
      Clubs.push(club);
      cb(null, club);
    })   
    .catch(err=>{
      cb(err, null);
      return;
    })
  }

  // Create an player record
  function playerCreate(id, firstname, lastname, birthdate, club, ranking=null, cb){
    playerDetails = {id:id, firstname:firstname, lastname:lastname, birthdate:birthdate, clubId:club, ranking: ranking};
    var player = db['player'].create(playerDetails)
    .then(player=> {
      console.log('New player: ' + JSON.stringify(player, null, 4));
      Players.push(player);
      cb(null, player);
    })   
    .catch(err=>{
      cb(err, null);
      return;
    })
  }

  // Seed clubs
  function createClubs(cb){
    console.log('Creating CLUBS ...');
    async.series([
      function (callback){clubCreate(1, 'MTT', 'MUZILLAC TT', callback)},
      function(callback) {clubCreate(2, 'SENE TT', 'SENE TT', callback);}
    ], 
    cb
    );
  }

   // Seed players
   function createPlayers(cb){
    console.log('Creating PLAYERS ...');
    async.series([
      function(callback){playerCreate(null, 'Damien', 'LEVEUGLE', new Date('1969-12-13'), 1, 931, callback);},
      function(callback){playerCreate(null, 'Stéphane', 'JULLIOT', null, 1, null, callback);},
      function(callback){playerCreate(null, 'Christophe', 'COUTURE', null, 1, null, callback)},
      function(callback){playerCreate(null, 'David', 'WAUTHIER', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Frédéric', 'LAMOUR', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Nicolas', 'DELOMEZ', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Guy', 'COLOMBEL', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Luc', 'BAUDAIS', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Clément', 'VILAIN', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Benjamin', 'VILAIN', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Dominique', 'PERON', null, 1, null, callback)},
      function(callback){playerCreate(null, 'Rémi', 'SAIL', null, 1, null, callback)}
        
    ], 
    cb
    );
  }










