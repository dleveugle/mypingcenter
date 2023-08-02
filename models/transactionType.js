'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class TransactionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionType.hasMany(models.transaction);
    };
  };
  TransactionType.init({
    code: {
      type: DataTypes.STRING(1),
      allowNull: false,
      primaryKey: true
    },
    longdesc: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    sign: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transactionType'
  });
  return TransactionType;
};