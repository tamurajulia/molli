import { read, readAll } from '../config/database.js';

const listarProdutos = async () => {
  try {
    const produtos = await readAll('produtos');
    return produtos;
  } catch (err) {
    console.error('Erro ao buscar produtos: ', err);
  }
};

const obterProdutoPorId = async (id_produto) => {
  try {
    const produtos = await read('produtos', `id = ${id_produto}`);
    return produtos;
  } catch (err) {
    console.error('Erro ao buscar produtos: ', err);
  }
};

export { listarProdutos, obterProdutoPorId };
