const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let messages = [];

// Enviar mensagem
app.post('/api/messages', (req, res) => {
  const { username, text } = req.body;
  const message = { username, text, timestamp: new Date() };
  messages.push(message);
  res.status(201).json(message);
});

// Obter mensagens
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});