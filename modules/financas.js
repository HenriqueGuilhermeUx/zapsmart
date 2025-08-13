const axios = require('axios');

async function menu() {
  try {
    const dolarRes = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const dolar = parseFloat(dolarRes.data.USDBRL.bid).toFixed(2);

    const criptoRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl');
    const bitcoin = criptoRes.data.bitcoin.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const ethereum = criptoRes.data.ethereum.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const acoes = 'Petrobras: R$28, Vale: R$65 (dados simulados)';

    return `💰 Finanças:\n\n💵 Dólar: R$${dolar}\n₿ Bitcoin: ${bitcoin}\nΞ Ethereum: ${ethereum}\n📈 Ações: ${acoes}`;
  } catch (err) {
    console.error(err);
    return 'Erro ao buscar dados financeiros.';
  }
}

module.exports = { menu };
