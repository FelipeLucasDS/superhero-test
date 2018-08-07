const gstore = require('gstore-node')();
const Schema = gstore.Schema;

const productSchema = new Schema({
    user: { type: 'string', required: true },
    value: { type: 'double', required: true, excludeFromIndexes: true  },
    requestedWhen: { type: 'datetime', required: false, excludeFromIndexes: true },
    paidWhen: { type: 'datetime', required: false, excludeFromIndexes: true }
});

module.exports = gstore.model('CashbackRequest', productSchema);
