const cashbackRequestModel = require('../models/cashbackRequest');

async function requestCashBack(userKey, value){
    const today = new Date();
    const requestCashBack = {
        user: userKey,
        requestedWhen: today,
        value: parseFloat(value)
    }

    balance = new cashbackRequestModel(requestCashBack, "u"+userKey+"t"+today)
    return await balance.save()
}

module.exports = {
    requestCashBack
}


