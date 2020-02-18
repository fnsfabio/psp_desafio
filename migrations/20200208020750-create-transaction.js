'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valueTransaction: {
        type: Sequelize.DOUBLE
      },
      description: {
        type: Sequelize.STRING
      },
      methodPayment: {
        type: Sequelize.ENUM,
        values: ['debit_card', 'credit_card']
      },
      cardNumber: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dtValid: {
        type: Sequelize.DATE
      },
      cvv: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      clientId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Clients',
          key: 'id',
          as: 'clientId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};