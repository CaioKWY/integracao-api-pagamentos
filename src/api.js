const axios = require('axios');
const chaveApi = require('./chaveAPI');

const instanciaAxios = axios.create({
    baseURL: 'https://api.stripe.com/v1',
    headers: {
        authorization: 'Bearer ' + chaveApi,
        'Content-type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2020-08-27'
    },
})

module.exports = instanciaAxios;