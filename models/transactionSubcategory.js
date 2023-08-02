'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class TransactionSubcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionSubcategory.hasMany(models.transaction);
    };
  };
  TransactionSubcategory.init({
    code: {
      type: DataTypes.STRING(5),
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
    modelName: 'transactionSubcategory'
  });
  return TransactionSubcategory;
};