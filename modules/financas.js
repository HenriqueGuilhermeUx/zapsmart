const axios = require('axios');

async function getFinancas() {
  try {
    // Cotação do dólar via AwesomeAPI
    const dolarRes = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');

    // Verifica se a cota foi excedida
    if (dolarRes.status === 429 || dolarRes.data?.codigo === 'CotaExcedida') {
      console.warn('⚠️ Limite da AwesomeAPI excedido');
      return {
        dolar: 'Limite excedido',
        bitcoin: 'Limite excedido',
        ethereum: 'Limite excedido',
        ouro: 'Erro',
        acoes: 'Erro'
      };
    }

    const dolar = parseFloat(dolarRes.data.USDBRL.bid).toFixed(2);

    // Cotação de criptomoedas via CoinGecko
    const criptoRes = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl'
    );

    const bitcoin = criptoRes.data.bitcoin.brl.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const ethereum = criptoRes.data.ethereum.brl.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    // Dados simulados
    const ouro = 'R$ 360,00/g (simulado)';
    const acoes = 'Petrobras: R$28, Vale: R$65 (simulado)';

    return { dolar, bitcoin, ethereum, ouro, acoes };
  } catch (err) {
    console.error('❌ Erro ao buscar dados financeiros:', err.message);
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
