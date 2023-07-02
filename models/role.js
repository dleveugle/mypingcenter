'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.player);
    };
  };
  Role.init({
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
    },
    icon: {
      type: DataTypes.STRING(30)
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'role'
  });
  return Role;
};