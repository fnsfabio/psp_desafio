const Payable = require('../models').Payable;
const Sequelize = require('sequelize');

module.exports = {
    getAvaiables(req, res) {
        return Payable.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('valueLiquid')), 'avalible']
            ],
            where: {
                status: 'paid'
            }
        })
        .then(avaiable => res.status(201).send(avaiable))
        .catch(err => res.status(400).send(err));
    },
    getWaitingFunds(req, res){
        return Payable.findAll({
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('valueLiquid')), 'waitingFunds']
            ],
            where: {
                status: 'waiting_funds'
            }
        })
        .then(waitingFunds => res.status(201).send(waitingFunds))
        .catch(err => res.status(400).send(err));
    }
};