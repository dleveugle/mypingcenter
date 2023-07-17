'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };
  };
  User.init({
    id : {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'user'
  });
  return User;
};