const Client = require('../models').Client;
const Payable = require('../models').Payable;
const Transaction = require('../models').Transaction;

module.exports = {
    create(req, res){
        return Client.create({
            name: req.body.name
        })
        .then(client => res.status(201).send(client))
        .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Client.findAll({
            include: [
                {
                    model: Payable,
                    as: 'payableItems'
                }, {
                    model: Transaction,
                    as: 'transactionItems'
                }
            ]
        })
        .then(clients => res.status(201).send(clients))
        .catch(error => res.status(400).send(error));
    }
}