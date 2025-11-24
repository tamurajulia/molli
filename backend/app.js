import express from 'express';
const app = express();
const port = 3001;
import authRotas from './routes/authRotas.js';
import produtoRotas from './routes/produtosRotas.js';
import estoqueRotas from './routes/estoqueRotas.js';
import cors from 'cors';

app.use(cors());
app.use(express.json());

app.use('/auth', authRotas);
app.use('/produtos', produtoRotas);
app.use('/estoque', estoqueRotas);

app.get('/', (req, res) => {
  res.status(200).send('API Molli funcionando!');
});

app.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota inválida ou não encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
