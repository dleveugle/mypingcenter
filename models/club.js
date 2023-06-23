'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Club.hasMany(models.player);
    };
  };
  Club.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1

    },
    shortdesc: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    longdesc: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'club'
  });
  return Club;
};