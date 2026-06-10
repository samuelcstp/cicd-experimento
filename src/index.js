const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ mensagem: 'CI/CD funcionando!' });
});

app.get('/palindromo/:texto', (req, res) => {
  const texto = req.params.texto.toLowerCase();
  const invertido = texto.split('').reverse().join('');
  const palindromo = texto === invertido;

  res.json({
    texto: req.params.texto,
    palindromo,
    dica: palindromo ? 'Lê igual de trás pra frente!' : 'Não é palíndromo.',
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
