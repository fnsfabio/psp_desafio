const Payable = require('../models').Payable;

var calcFee = function fee(value, tax){
    return (value * tax / 100);
}

module.exports = {
    generatePayable(transaction, clientIdParam){
        try{
            var dateTransaction = new Date();
            switch(transaction.methodPayment){
                case 'debit_card':
                    var feeCalc = calcFee(transaction.valueTransaction, 3);
                    try{
                        Payable.create({
                            status: 'paid',
                            fee: feeCalc,
                            valueLiquid: (transaction.valueTransaction - feeCalc),
                            paymentDate: dateTransaction,
                            clientId: clientIdParam
                        });
                    }catch(err){
                        throw new Error(err.message);
                    } finally {
                        break;
                    }
                case 'credit_card':
                    var feeCalc = calcFee(transaction.valueTransaction, 5);
                    dateTransaction.setDate(dateTransaction.getDate() + 30);
                    try{
                        Payable.create({
                            status: 'waiting_funds',
                            fee: feeCalc,
                            valueLiquid: (transaction.valueTransaction - feeCalc),
                            paymentDate: dateTransaction,
                            clientId: clientIdParam
                        });
                    }catch(err){
                        throw new Error(err.message);
                    } finally {
                        break;
                    }
                default:
                    throw new Error('Method not defined.');
            }
        } catch(err){
            throw new Error(err.message);
        }
    }
};