const axios = require('axios');

async function getFinancas() {
  try {
    const dolarRes = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const dolar = parseFloat(dolarRes.data.USDBRL.bid).toFixed(2);

    const criptoRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl');
    const bitcoin = criptoRes.data.bitcoin.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const ethereum = criptoRes.data.ethereum.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const ouro = 'R$ 360,00/g (simulado)';
    const acoes = 'Petrobras: R$28, Vale: R$65 (simulado)';

    return { dolar, bitcoin, ethereum, ouro, acoes };
  } catch (err) {
    console.error('Erro ao buscar dados financeiros:', err.message);
    return {
      dolar: 'Erro',
      bitcoin: 'Erro',
      ethereum: 'Erro',
      ouro: 'Erro',
      acoes: 'Erro'
    };
  }
}

module.exports = { getFinancas };

