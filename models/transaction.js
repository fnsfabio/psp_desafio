'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    valueTransaction: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    methodPayment: {
      type: DataTypes.ENUM,
      values: ['debit_card', 'credit_card']
    },
    cardNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    dtValid: DataTypes.DATE,
    cvv: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Client, {
      foreignKey: 'clientId',
      onDelete: 'CASCADE'
    })
  };
  return Transaction;
};