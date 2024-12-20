const axios = require('axios');
const doom = require('./doom.helper');

const apiKey = process.env.EXCHANGERATE_API_KEY;
async function getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.conversion_rates && response.data.conversion_rates[toCurrency]) {
            return response.data.conversion_rates[toCurrency];
        } else {
            return doom.error.pairNotFound(fromCurrency, toCurrency)
        }
    } catch (error) {
        console.error('Помилка при отриманні курсу:', error.message);
    }
}
 module.exports = {
    getExchangeRate
 }
