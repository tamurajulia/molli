import express from 'express';
import { listarFilialController } from '../controllers/FilialController.js';
const router = express.Router();

router.get('/', listarFilialController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).send();
});

export default router;
