'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.transactionType);
      Transaction.belongsTo(models.transactionMedia);
      Transaction.belongsTo(models.transactionCategory);
      Transaction.belongsTo(models.transactionSubcategory);
    };
  };
  Transaction.init({
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: 1

    },
    date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
    },
    reference: {
      type: DataTypes.STRING(200)
    },
    reconciliation: {
      type: DataTypes.DATE
    },
    longdesc: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transaction'
  });
  return Transaction;
};