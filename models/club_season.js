'use strict';
const {Model} = require('sequelize');
const season = require('./season');
const club = require('./club');

module.exports = (sequelize, DataTypes)  => {
  class ClubSeason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };
  };
  ClubSeason.init({
    startYear: {
      type: DataTypes.INTEGER,
      references: {
        model: season,
        key: 'startYear'
      }
    },
    clubId: {
        type: DataTypes.INTEGER,
        references: {
            model: club,
            key: 'id'
        }
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'clubseason'
  });
  return ClubSeason;
};