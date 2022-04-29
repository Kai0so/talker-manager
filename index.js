const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json');

  return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json');
  const talker = JSON.parse(talkers).find((t) => t.id === parseFloat(id));

  if (!talker) {
    return res.status(HTTP_NOTFOUND_STATUS).json(
      {
        message: 'Pessoa palestrante não encontrada',
      },
    );
  }

  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', (req, res) => {
  const token = randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
