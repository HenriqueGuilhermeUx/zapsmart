const express = require('express');
const { getFinancas } = require('./services/financas');
const { getNoticias } = require('./services/noticias');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const mensagem = req.body.Body?.trim();
  let resposta = '';

  // Menu principal
  if (mensagem === '1') {
    resposta = `📊 *Menu Financeiro*\n\nEscolha uma opção:\n\n1️⃣ Cotação do Dólar\n2️⃣ Criptomoedas\n3️⃣ Ouro\n4️⃣ Ações\n5️⃣ Notícias do Mercado\n\n🔙 Digite *menu* para voltar`;
  }

  // Subopções do menu financeiro
  else if (mensagem === '1.1') {
    const { dolar } = await getFinancas();
    resposta = `💵 *Cotação do Dólar*\n\nValor atual: R$${dolar}`;
  } else if (mensagem === '1.2') {
    const { bitcoin, ethereum } = await getFinancas();
    resposta = `₿ *Criptomoedas*\n\nBitcoin: ${bitcoin}\nEthereum: ${ethereum}`;
  } else if (mensagem === '1.3') {
    const { ouro } = await getFinancas();
    resposta = `🪙 *Ouro*\n\nValor atual: ${ouro}`;
  } else if (mensagem === '1.4') {
    const { acoes } = await getFinancas();
    resposta = `📈 *Ações (simulado)*\n\n${acoes}`;
  } else if (mensagem === '1.5') {
    const noticias = await getNoticias();
    resposta = `📰 *Notícias do Mercado:*\n\n${noticias}`;
  }

  // Voltar ao menu principal
  else if (mensagem.toLowerCase() === 'menu') {
    resposta = `👋 Olá! Bem-vindo ao *ZapSmart*.\n\nEscolha uma opção:\n\n1️⃣ Finanças\n2️⃣ Outra funcionalidade...`;
  }

  // Mensagem padrão
  else {
    resposta = `🤖 Digite *menu* para ver as opções disponíveis.`;
  }

  res.set('Content-Type', 'text/plain');
  res.send(resposta);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZapSmart rodando na porta ${PORT}`);
});
