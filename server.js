const express = require('express');
const bodyParser = require('body-parser');
const financas = require('./modules/financas');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', async (req, res) => {
  const msg = req.body.Body;
  let resposta = '';

  if (msg.includes('1')) {
    resposta = await financas.menu();
  } else {
    resposta = 'Digite 1 para ver as finanças.';
  }

  res.set('Content-Type', 'text/xml');
  res.send(`<Response><Message>${resposta}</Message></Response>`);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
