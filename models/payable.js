'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payable = sequelize.define('Payable', {
    status: {
      type: DataTypes.ENUM,
      values: ['paid','waiting_funds']
    },
    fee: DataTypes.DOUBLE,
    valueLiquid: DataTypes.DOUBLE,
    paymentDate: DataTypes.DATE
  }, {});
  Payable.associate = function(models) {
    // associations can be defined here
    Payable.belongsTo(models.Client, {
      foreignKey: 'clientId',
      onDelete: 'CASCADE'
    })
  };
  return Payable;
};