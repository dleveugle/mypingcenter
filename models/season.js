'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Season.belongsToMany(models.club, {through: 'clubseasons', timestamps: false})
    };
  };
  Season.init({
    startYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    longdesc: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'season'
  });
  return Season;
};