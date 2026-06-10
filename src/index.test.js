const request = require('supertest');
const app = require('./index');

test('GET / retorna mensagem correta', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body.mensagem).toBe('CI/CD funcionando!');
});

test('GET /palindromo/radar detecta palíndromo', async () => {
  const res = await request(app).get('/palindromo/radar');
  expect(res.statusCode).toBe(200);
  expect(res.body.palindromo).toBe(true);
  expect(res.body.dica).toBe('Lê igual de trás pra frente!');
});

test('GET /palindromo/cursor rejeita não-palíndromo', async () => {
  const res = await request(app).get('/palindromo/cursor');
  expect(res.statusCode).toBe(200);
  expect(res.body.palindromo).toBe(false);
  expect(res.body.dica).toBe('Não é palíndromo.');
});
