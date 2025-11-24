import { listarProdutos } from '../models/Produtos.js';
import { lerEstoquePorProdutoFilial } from '../models/Estoque.js';

const listarProdutosPdvController = async (req, res) => {
  try {
    const produtos = await listarProdutos();
    const franquia = req.query.franquia;

    const promises = produtos.map(async (produto) => {
      const dadosEstoque = await lerEstoquePorProdutoFilial(
        produto.id,
        franquia
      );
      const qtd = dadosEstoque ? dadosEstoque.quantidade : 0;

      return {
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco_venda),
        id_categoria: produto.id_categoria,
        imagem: produto.imagem,
        estoque: qtd,
      };
    });

    const produtosComDados = await Promise.all(promises);
    const produtosDisponiveis = produtosComDados.filter((p) => p.estoque > 0);

    res.status(200).json(produtosDisponiveis);
  } catch (err) {
    console.error('Erro ao listar produtos: ', err);
    res.status(500).json({ mensagem: 'Erro ao listar produtos' });
  }
};

export { listarProdutosPdvController };
