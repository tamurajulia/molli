import express from 'express';
import {
  lerEstoquePorFilialController,
  atualizarEstoqueController,
  deletarEstoqueController,
  listarProdutosSemEstoqueController,
  criarEstoqueController,
} from '../controllers/EstoqueController.js';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddlewares.js';

router.get('/semestoque', authMiddleware, listarProdutosSemEstoqueController);
router.post('/', authMiddleware, criarEstoqueController);
router.get('/:id', lerEstoquePorFilialController);
router.put('/:id', authMiddleware, atualizarEstoqueController);
router.delete('/:id', authMiddleware, deletarEstoqueController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).send();
});

router.options('/:id', (req, res) => {
  res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
  res.status(204).send();
});

export default router;
