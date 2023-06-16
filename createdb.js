
console.log('This script populates some test data');

var async = require('async')


/**
 * Import the database connection file.
 */
const {db, datatypes} = require("./config/database");

const Club = require('./models/club')(db, datatypes);

db.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`);
  async.series([
    createClubs
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

  // Create an club record
  function clubCreate(id, shortdesc, longdesc, cb){
    clubDetails = {id:id, shortdesc:shortdesc, longdesc:longdesc};
    var club = Club.create(clubDetails)
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

  // Seed clubs
  function createClubs(cb){
    console.log('Creating CLUBS ...');
    async.series([
      function (callback){
        clubCreate(1, 'MTT', 'MUZILLAC TT', callback)
        
      },
      function(callback) {
        clubCreate(2, 'SENE TT', 'SENE TT', callback);
      }
    ], 
    cb
    );
  }










