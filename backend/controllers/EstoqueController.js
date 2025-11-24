import {
  lerEstoquePorFilial,
  atualizarEstoque,
  excluirEstoque,
  criarEstoque,
} from '../models/Estoque.js';
import { obterProdutoPorId, listarProdutos } from '../models/Produtos.js';
import { obterCategoriaPorId } from '../models/Categoria.js';

const lerEstoquePorFilialController = async (req, res) => {
  try {
    const franquia = req.params.id;
    const estoque = await lerEstoquePorFilial(franquia);

    const promises = estoque.map(async (estoque) => {
      const dadosProduto = await obterProdutoPorId(estoque.id_produto);
      const categoria = await obterCategoriaPorId(dadosProduto.id_categoria);

      const quantidade = Number(estoque.quantidade);

      return {
        id: estoque.id,
        produto: dadosProduto.nome,
        quantidade: quantidade,
        categoria: categoria.nome,
        status:
          quantidade > 15
            ? 'Em estoque'
            : quantidade <= 15 && quantidade > 0
            ? 'Atenção'
            : 'Sem estoque',
        preco: dadosProduto.preco_venda,
        atualizado_por: estoque.atualizado_por,
      };
    });

    const estoqueComDados = await Promise.all(promises);

    res.status(200).json(estoqueComDados);
  } catch (err) {
    console.error('Erro ao listar estoque por filial: ', err);
    res.status(500).json({ mensagem: 'Erro ao listar estoque por filial' });
  }
};

const atualizarEstoqueController = async (req, res) => {
  try {
    const funcionario = req.usuario.nome;
    const id_estoque = Number(req.params.id);
    const quantidade = Number(req.query.quantidade);

    const novaQtd = { quantidade, atualizado_por: funcionario };

    const atualizado = await atualizarEstoque(id_estoque, novaQtd);

    res.status(201).json('Sucesso ao atualizar estoque !!!', atualizado);
  } catch (err) {
    console.error('Erro ao atualizar estoque: ', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar estoque' });
  }
};

const deletarEstoqueController = async (req, res) => {
  try {
    const id_estoque = Number(req.params.id);

    await excluirEstoque(id_estoque);
    res.status(201).json('Sucesso ao excluir estoque !!!');
  } catch (err) {
    console.error('Erro ao excluir estoque: ', err);
    res.status(500).json({ mensagem: 'Erro ao excluir estoque' });
  }
};

const listarProdutosSemEstoqueController = async (req, res) => {
  try {
    const id_filial = req.usuario.id_filial;

    const todosProdutos = await listarProdutos();
    const estoqueAtual = await lerEstoquePorFilial(id_filial);
    const idsProdutosComEstoque = estoqueAtual.map((item) => item.id_produto);

    const produtosDisponiveis = todosProdutos
      .filter((produto) => !idsProdutosComEstoque.includes(produto.id))
      .map((produto) => ({
        id: produto.id,
        nome: produto.nome,
      }));

    res.status(200).json(produtosDisponiveis);
  } catch (err) {
    console.error('Erro ao listar produtos para cadastro: ', err);
    res.status(500).json({ mensagem: 'Erro ao buscar produtos disponíveis' });
  }
};

const criarEstoqueController = async (req, res) => {
  try {
    const id_filial = req.usuario.id_filial;
    const nome = req.usuario.nome;
    const { id_produto, quantidade } = req.query;

    const data = {
      id_produto: id_produto,
      id_filial: id_filial,
      quantidade: quantidade,
      atualizado_por: nome,
    };

    const criar = await criarEstoque(data);

    res.status(200).json(`Estoque criado ${criar}`);
  } catch (err) {
    console.error('Erro ao criar estoque: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar estoque' });
  }
};

export {
  lerEstoquePorFilialController,
  atualizarEstoqueController,
  deletarEstoqueController,
  listarProdutosSemEstoqueController,
  criarEstoqueController,
};
