const midtransClient = require('midtrans-client');
require('dotenv').config();  

const isProduction = process.env.MIDTRANS_MODE === 'production';

const serverKey = isProduction 
    ? process.env.MIDTRANS_SERVER_KEY_PRODUCTION 
    : process.env.MIDTRANS_SERVER_KEY_SANDBOX;
const clientKey = isProduction 
    ? process.env.MIDTRANS_CLIENT_KEY_PRODUCTION 
    : process.env.MIDTRANS_CLIENT_KEY_SANDBOX;

const midtrans = new midtransClient.Snap({
    isProduction: isProduction,
    serverKey: serverKey,
    clientKey: clientKey
});
module.exports = midtrans;