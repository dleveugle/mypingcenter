'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };
  };
  BankAccount.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1

    },
    longdesc: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    iban: {
        type: DataTypes.STRING(34)
    },
    mainaccount: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'bankAccount'
  });
  return BankAccount;
};