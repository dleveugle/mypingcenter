
/*
* Import Sequelize
*/
const Sequelize = require('sequelize');

/* Create new sequelize instance */
const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'pingcenter',
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: 'Etc/GMT-1' //for writing to database;
},
timezone: 'Etc/GMT-1' //for writing to database;
});

module.exports.datatypes = Sequelize.DataTypes;
module.exports.db = sequelize;