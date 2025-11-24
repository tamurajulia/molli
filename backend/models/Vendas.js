import { create } from '../config/database.js';

const criarVenda = async (vendaData) => {
  try {
    const venda = create('pedidos', vendaData);
    return venda;
  } catch (err) {
    console.error('Erro model ao criar venda', err);
  }
};
