const Sequelize = require('sequelize');
const Transaction = require('../models').Transaction;
const ProcessTransaction = require('../services/ProcessTransaction.js');

module.exports = {
    create(req, res) {
        var partCardNumber = req.body.cardNumber.substring(req.body.cardNumber.length - 4, req.body.cardNumber.length);
        return Transaction.create({
            valueTransaction: req.body.valueTransaction,
            description: req.body.description,
            methodPayment: req.body.methodPayment,
            cardNumber: partCardNumber,
            name: req.body.name,
            dtValid: req.body.dtValid,
            cvv: req.body.cvv,
            clientId: req.params.clientId
        })
        .then(transaction => {
            try{
                ProcessTransaction.generatePayable(transaction, req.params.clientId);
            }catch(err){
                console.log(err);
            }
            res.status(201).send(transaction);
        })
        .catch(error => res.status(400).send(error));
    },
    listTransactions(req, res) {
        return Transaction.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('description')), 'transaction']
            ]
        })
        .then(descriptions => {
            res.status(201).send(descriptions);
        })
        .catch(error => res.status(400).send(error));
    }
};