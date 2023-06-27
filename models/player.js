'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsTo(models.club, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        foreignKey: {
            field: 'clubId',
            allowNull: true
        }
      });
      console.log('player belongs to');
    }
};
  Player.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1
    },
    firstname: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
    birthdate: {
        type: DataTypes.DATE
    },
    ranking: {
      type: DataTypes.INTEGER,
      defaultValue: 500
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'player'
  });
  return Player;
};