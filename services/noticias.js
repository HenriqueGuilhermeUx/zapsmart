async function obterNoticias() {
  return [
    {
      titulo: "Mercado financeiro fecha em alta",
      resumo: "Ibovespa sobe 1,2% com otimismo externo.",
      fonte: "Agência Brasil",
    },
    {
      titulo: "Dólar recua frente ao real",
      resumo: "Moeda americana cai para R$ 4,85.",
      fonte: "Valor Econômico",
    },
  ];
}

module.exports = { obterNoticias };
