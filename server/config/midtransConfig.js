const midtransClient = require('midtrans-client');

const midtrans = new midtransClient.Snap({
    isProduction: false, 
    serverKey: 'SB-Mid-server-w1tIigJTRv-443e-w5UevKgw',
    clientKey: 'SB-Mid-client-IqF1zwcmMclxTBvZ'
});

module.exports = midtrans;