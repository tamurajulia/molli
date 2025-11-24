import express from 'express';
import { listarProdutosPdvController } from '../controllers/ProdutosController.js';
const router = express.Router();

router.get('/', listarProdutosPdvController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).send();
});

export default router;
