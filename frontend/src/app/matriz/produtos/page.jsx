"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./produtos.css";
import { PackageSearch, XCircle, Edit3, Box, AlertTriangle } from "lucide-react";

export default function Produtos() {
  const [isMobile, setIsMobile] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [mostrarModalDetalhes, setMostrarModalDetalhes] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      produto: "Camisa Polo",
      fornecedor: "Loja Matriz",
      categoria: "Roupas",
      estoque: 3,
      preco: "R$ 120,00",
      codigo: "233949",
    },
    {
      id: 2,
      produto: "Tênis Branco",
      fornecedor: "Loja 2",
      categoria: "Calçados",
      estoque: 5,
      preco: "R$ 280,00",
      codigo: "9595005",
    },
    {
      id: 3,
      produto: "Boné Azul",
      fornecedor: "Loja Matriz",
      categoria: "Acessórios",
      estoque: 8,
      preco: "R$ 60,00",
      codigo: "5858874",
    },
    {
      id: 4,
      produto: "Calça Jeans",
      fornecedor: "Loja 3",
      categoria: "Roupas",
      estoque: 4,
      preco: "R$ 200,00",
      codigo: "998877",
    },
  ]);

  const [filtros, setFiltros] = useState({
    categoria: "",
    fornecedor: "",
  });

  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFiltrar = () => {
    const filtrados = produtos.filter((p) => {
      const categoriaOk =
        filtros.categoria === "" || p.categoria === filtros.categoria;
      const fornecedorOk =
        filtros.fornecedor === "" || p.fornecedor === filtros.fornecedor;
      return categoriaOk && fornecedorOk;
    });
    setProdutosFiltrados(filtrados);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const abrirModalExcluir = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModalExcluir(true);
  };

  const abrirModalDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModalDetalhes(true);
  };

  const fecharModal = () => {
    setMostrarModalExcluir(false);
    setMostrarModalDetalhes(false);
    setProdutoSelecionado(null);
  };

  const confirmarExclusao = () => {
    setProdutos((prev) =>
      prev.filter((p) => p.id !== produtoSelecionado.id)
    );
    setProdutosFiltrados((prev) =>
      prev.filter((p) => p.id !== produtoSelecionado.id)
    );
    fecharModal();
  };

  const categoriasUnicas = [...new Set(produtos.map((p) => p.categoria))];
  const fornecedoresUnicos = [...new Set(produtos.map((p) => p.fornecedor))];

  return (
    <div className="container">
      <h2 className="titulo">
        <PackageSearch className="iconeTitulo" size={22} />
        <span className="titulo-preto">Gerenciamento de</span>
        <span className="titulo-verde"> Produtos:</span>
      </h2>

      {/* Filtros */}
      <div className="filtros">
        <div className="campo">
          <label className="tituloInput">Categoria:</label>
          <select
            name="categoria"
            value={filtros.categoria}
            onChange={handleChange}
            className="inputFocus"
          >
            <option value="">Todas</option>
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="tituloInput">Fornecedor:</label>
          <select
            name="fornecedor"
            value={filtros.fornecedor}
            onChange={handleChange}
            className="inputFocus"
          >
            <option value="">Todos</option>
            {fornecedoresUnicos.map((forn) => (
              <option key={forn} value={forn}>
                {forn}
              </option>
            ))}
          </select>
        </div>

        <button className="btnFiltrar" onClick={handleFiltrar}>
          Filtrar
        </button>
      </div>

      <Link href="/matriz/estoque/cadastrar">
        <button className="botao-cadastrar">Cadastrar</button>
      </Link>

      {/* Tabela / Cards */}
      <div className="tabelaContainer">
        <h3 className="subtitulo">Produtos</h3>

        {!isMobile ? (
          <table className="tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Fornecedor</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Código</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produto}</td>
                  <td>{item.fornecedor}</td>
                  <td>{item.categoria}</td>
                  <td>{item.estoque}</td>
                  <td>{item.preco}</td>
                  <td>{item.codigo}</td>
                  <td className="acoes">
                    <XCircle
                      className="icone"
                      onClick={() => abrirModalExcluir(item)}
                      title="Excluir"
                    />
                    <Link href="/matriz/produtos/editar">
                      <Edit3 className="icone" title="Editar" />
                    </Link>
                    <PackageSearch
                      className="icone"
                      onClick={() => abrirModalDetalhes(item)}
                      title="Ver detalhes"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          produtosFiltrados.map((item) => (
            <div className="card-produto" key={item.id}>
              <div className="linha-info">
                <strong>ID:</strong> {item.id}
              </div>
              <div className="linha-info">
                <strong>Produto:</strong> {item.produto}
              </div>
              <div className="linha-info">
                <strong>Fornecedor:</strong> {item.fornecedor}
              </div>
              <div className="linha-info">
                <strong>Categoria:</strong> {item.categoria}
              </div>
              <div className="linha-info">
                <strong>Estoque:</strong> {item.estoque}
              </div>
              <div className="linha-info">
                <strong>Preço:</strong> {item.preco}
              </div>
              <div className="linha-info">
                <strong>Código:</strong> {item.codigo}
              </div>
              <div className="acoes">
                <XCircle
                  className="icone"
                  onClick={() => abrirModalExcluir(item)}
                  title="Excluir"
                />
                <Edit3 className="icone" title="Editar" />
                <Box
                  className="icone"
                  onClick={() => abrirModalDetalhes(item)}
                  title="Ver detalhes"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Exclusão */}
      {mostrarModalExcluir && (
        <div className="overlay">
          <div className="modal-excluir animate-modal">
            <div className="modal-header">
              <AlertTriangle className="icone-modal" size={28} />
              <h3>Confirmar Exclusão</h3>
            </div>
            <p>
              Tem certeza que deseja excluir{" "}
              <strong>{produtoSelecionado?.produto}</strong>?
            </p>
            <div className="botoes-modal">
              <button className="btn-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarExclusao}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {mostrarModalDetalhes && (
        <div className="overlay">
          <div className="modal-excluir animate-modal">
            <div className="modal-header">
              <Box className="icone-modal" size={28} />
              <h3>Detalhes do Produto</h3>
            </div>
            <div className="modal-detalhes">
              <p><strong>ID:</strong> {produtoSelecionado.id}</p>
              <p><strong>Produto:</strong> {produtoSelecionado.produto}</p>
              <p><strong>Fornecedor:</strong> {produtoSelecionado.fornecedor}</p>
              <p><strong>Categoria:</strong> {produtoSelecionado.categoria}</p>
              <p><strong>Estoque:</strong> {produtoSelecionado.estoque}</p>
              <p><strong>Preço:</strong> {produtoSelecionado.preco}</p>
              <p><strong>Código:</strong> {produtoSelecionado.codigo}</p>
            </div>
            <div className="botoes-modal">
              <button className="btn-confirmar" onClick={fecharModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
