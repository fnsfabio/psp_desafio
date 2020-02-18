'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    Client.hasMany(models.Transaction, {
      foreignKey: 'clientId',
      as: 'transactionItems'
    });
    Client.hasMany(models.Payable, {
      foreignKey: 'clientId',
      as: 'payableItems'
    });
  };
  return Client;
};