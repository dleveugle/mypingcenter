
console.log('This script populates some test data');

var async = require('async')


/**
 * Import the database connection file.
 */

const db = require('./models');

db.sequelize.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`);
  async.series([
    createParams,
    createDatas
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

  var Datas = [];
  Datas.push(
    {model:'club', data:{id:1, shortdesc:'MTT', longdesc:'MUZILLAC TT'}},
    {model:'club', data:{id:2, shortdesc:'SENE TT', longdesc:'SENE TT'}},


    {model:'player', data:{id:null, firstname:'Damien', lastname:'LEVEUGLE', birthdate:new Date('1969-12-13'), 
      clubId:1, ranking:931, roleId:2}},
    {model:'player', data:{id:null, firstname:'Stéphane', lastname:'JULLIOT', birthdate:null, 
      clubId:1, ranking:591, roleId:1}},
    {model:'player', data:{id:null, firstname:'Christophe', lastname:'COUTURE', birthdate:null, 
      clubId:1, ranking:983, roleId:null}},
    {model:'player', data:{id:null, firstname:'David', lastname:'WAUTHIER', birthdate:null, 
      clubId:1, ranking:1102, roleId:null}},
    {model:'player', data:{id:null, firstname:'Frédéric', lastname:'LAMOUR', birthdate:null, 
      clubId:1, ranking:502, roleId:null}},
    {model:'player', data:{id:null, firstname:'Nicolas', lastname:'DELOMEZ', birthdate:null, 
      clubId:1, ranking:879, roleId:null}},
    {model:'player', data:{id:null, firstname:'Guy', lastname:'COLOMBEL', birthdate:null, 
      clubId:1, ranking:917, roleId:null}},
    {model:'player', data:{id:null, firstname:'Luc', lastname:'BAUDAIS', birthdate:null, 
      clubId:1, ranking:872, roleId:null}},
    {model:'player', data:{id:null, firstname:'Clément', lastname:'VILAIN', birthdate:null, 
      clubId:1, ranking:867, roleId:null}},
    {model:'player', data:{id:null, firstname:'Benjamin', lastname:'VILAIN', birthdate:null, 
      clubId:1, ranking:762, roleId:null}},
    {model:'player', data:{id:null, firstname:'Dominique', lastname:'PERON', birthdate:null, 
      clubId:1, ranking:932, roleId:null}},
    {model:'player', data:{id:null, firstname:'Rémi', lastname:'SAIL', birthdate:null, 
      clubId:1, ranking:1105, roleId:null}},

    {model: 'season', data: {startYear:2022, longdesc: 'Saison 2022-2023'}},
    {model: 'season', data: {startYear:2023, longdesc: 'Saison 2023-2024'}},

    {model: 'user', data: {id: 'damien', password: '$2b$10$j.5VzdIwAKGscPTTF.I0qexeOQ6M6.I8chA9wrC5GdOAQlKpGU12W'}}

   
  );

  var Params = [];
  Params.push(
    {model:'role', data: {id:1, shortdesc:'P', longdesc: 'Président', icon:'crown'}},
    {model:'role', data: {id:2, shortdesc:'T', longdesc: 'Trésorier', icon:'coin'}},
    {model:'role', data: {id:3, shortdesc:'S', longdesc: 'Secrétaire', icon:'notepad'}},

    {model:'transactionType', data: {code: 'R', longdesc: 'Revenu', sign: 1}},
    {model:'transactionType', data: {code: 'D', longdesc: 'Dépense', sign: -1}},

    {model:'transactionMedia', data: {code: 'V', longdesc: 'Virement'}},
    {model:'transactionMedia', data: {code: 'C', longdesc: 'Chèque'}},
    {model:'transactionMedia', data: {code: 'E', longdesc: 'Espèce'}}
  );

   // create a param record
   function paramCreate(param, cb){
    var param = db[param.model].create(param.data)
    .then(p => {
      console.log(`New ${p.constructor.name} : ` + JSON.stringify(p, null, 4));
      cb(null, p);
    })
    .catch(err=>{
      cb(err, null);
      return;
    })
  }

     // create a data record
     function dataCreate(data, cb){
      var data = db[data.model].create(data.data)
      .then(d => {
        console.log(`New ${d.constructor.name} : ` + JSON.stringify(d, null, 4));
        cb(null, d);
      })
      .catch(err=>{
        cb(err, null);
        return;
      })
    }

 

   // Seed Params
   function createParams(cb){
    console.log('Creating Params ...');
    async.mapSeries(Params, (p, cb) => {paramCreate(p, cb)}, cb);
   }

    // Seed Datas
    function createDatas(cb){
      console.log('Creating Datas ...');
      async.mapSeries(Datas, (d, cb) => {dataCreate(d, cb)}, cb);
     }










