const clientController = require('../controllers/clients.js');
const transactionController = require('../controllers/transactions.js');
const payableController = require('../controllers/payables.js');

module.exports = app => {
    app.get('/api', (req, res) => 
        res.status(200).send({
            message: 'PSP API - PagarMe - desafio'
        })
    );

    app.post('/api/clients', clientController.create);
    app.get('/api/clients', clientController.list);

    app.post('/api/clients/:clientId/transactions', transactionController.create);

    app.get('/api/transactions', transactionController.listTransactions);

    app.get('/api/clients/:clientId/payables/availbles', payableController.getAvaiables);
    app.get('/api/clients/:clientId/payables/waitingFunds', payableController.getWaitingFunds);
};