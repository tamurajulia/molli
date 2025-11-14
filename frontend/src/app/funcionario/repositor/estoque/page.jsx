"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./estoque.css";
import { BarChart3, Edit3, PackageSearch, XCircle, AlertTriangle } from "lucide-react";

export default function EstoqueTable() {
  const [isMobile, setIsMobile] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFornecedor, setFiltroFornecedor] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [idExcluir, setIdExcluir] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); 
  const dados = [
    { id: "01", produto: "Touca Miguel", quantidade: 8, categoria: "Touca", fornecedor: "Mimos Baby", status: "Disponível", preco: "R$ 45,00" },
    { id: "02", produto: "Body Letícia", quantidade: 3, categoria: "Body", fornecedor: "Rihappy", status: "Crítico", preco: "R$ 39,00" },
    { id: "03", produto: "Manta Sofia", quantidade: 1, categoria: "Manta", fornecedor: "Mimos Baby", status: "Sem estoque", preco: "R$ 59,00" },
    { id: "04", produto: "Sapatinho Enzo", quantidade: 5, categoria: "Sapato", fornecedor: "Cartes", status: "Disponível", preco: "R$ 49,00" },
    { id: "05", produto: "Macacão Estela", quantidade: 2, categoria: "Macacão", fornecedor: "Rihappy", status: "Crítico", preco: "R$ 69,00" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDadosFiltrados(dados);
  }, []);

  const filtrar = () => {
    const filtrados = dados.filter((item) => {
      const categoriaMatch = filtroCategoria ? item.categoria === filtroCategoria : true;
      const fornecedorMatch = filtroFornecedor ? item.fornecedor === filtroFornecedor : true;
      return categoriaMatch && fornecedorMatch;
    });
    setDadosFiltrados(filtrados);
  };

  const categorias = [...new Set(dados.map((item) => item.categoria))];
  const fornecedores = [...new Set(dados.map((item) => item.fornecedor))];

  const excluirItem = () => {
    const atualizados = dadosFiltrados.filter((f) => f.id !== idExcluir);
    setDadosFiltrados(atualizados);
    setIdExcluir(null);
  };

  const abrirDetalhes = (item) => {
    setProdutoSelecionado(item);
  };

  return (
    <div className="container">
      <h2 className="titulo">
        <BarChart3 className="iconeTitulo" size={22} />
        <span className="titulo-preto">Controle de</span>
        <span className="titulo-verde"> Estoque:</span>
      </h2>

      <div className="filtros">
        <div className="campo">
          <label className="tituloInput">Categoria:</label>
          <select
            className="inputFocus"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="tituloInput">Fornecedor:</label>
          <select
            className="inputFocus"
            value={filtroFornecedor}
            onChange={(e) => setFiltroFornecedor(e.target.value)}
          >
            <option value="">Todos</option>
            {fornecedores.map((forn, index) => (
              <option key={index} value={forn}>
                {forn}
              </option>
            ))}
          </select>
        </div>

        <button className="btnFiltrar" onClick={filtrar}>
          Filtrar
        </button>
      </div>

      <Link href="/admin/estoque/cadastrar">
        <button className="botao-cadastrar">Cadastrar</button>
      </Link>

      <div className="tabelaContainer">
        <h3 className="subtitulo">Estoque</h3>

        {!isMobile ? (
          <table className="tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Fornecedor</th>
                <th>Status</th>
                <th>Preço</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produto}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.categoria}</td>
                  <td>{item.fornecedor}</td>
                  <td>{item.status}</td>
                  <td>{item.preco}</td>
                  <td className="acoes">
                    <XCircle
                      className="icone icone-excluir"
                      title="Excluir"
                      onClick={() => setIdExcluir(item.id)}
                    />
                    <Link href="/admin/estoque/editar">
                      <Edit3 className="icone" title="Editar" />
                    </Link>
                    <PackageSearch
                      className="icone"
                      title="Detalhes"
                      onClick={() => abrirDetalhes(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          dadosFiltrados.map((item) => (
            <div className="card-estoque" key={item.id}>
              <div><strong>ID:</strong> {item.id}</div>
              <div><strong>Produto:</strong> {item.produto}</div>
              <div><strong>Quantidade:</strong> {item.quantidade}</div>
              <div><strong>Categoria:</strong> {item.categoria}</div>
              <div><strong>Fornecedor:</strong> {item.fornecedor}</div>
              <div><strong>Status:</strong> {item.status}</div>
              <div><strong>Preço:</strong> {item.preco}</div>
              <div className="acoes">
                <XCircle className="icone icone-excluir" onClick={() => setIdExcluir(item.id)} />
                <Edit3 className="icone" />
                <PackageSearch className="icone" onClick={() => abrirDetalhes(item)} />
              </div>
            </div>
          ))
        )}
      </div>

      {idExcluir && (
        <div className="modal-overlay" onClick={() => setIdExcluir(null)}>
          <div className="modal-excluir" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <AlertTriangle size={22} className="icone-modal" />
              <h3>Confirmar exclusão</h3>
            </div>
            <p>Tem certeza que deseja excluir este produto do estoque?</p>
            <div className="botoes-modal">
              <button className="btn-cancelar" onClick={() => setIdExcluir(null)}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={excluirItem}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {produtoSelecionado && (
        <div className="modal-overlay" onClick={() => setProdutoSelecionado(null)}>
          <div className="modal-excluir" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <PackageSearch size={22} className="icone-modal" />
              <h3>Detalhes do Produto</h3>
            </div>
            <div className="detalhes-produto">
              <p><strong>ID:</strong> {produtoSelecionado.id}</p>
              <p><strong>Produto:</strong> {produtoSelecionado.produto}</p>
              <p><strong>Categoria:</strong> {produtoSelecionado.categoria}</p>
              <p><strong>Fornecedor:</strong> {produtoSelecionado.fornecedor}</p>
              <p><strong>Quantidade:</strong> {produtoSelecionado.quantidade}</p>
              <p><strong>Status:</strong> {produtoSelecionado.status}</p>
              <p><strong>Preço:</strong> {produtoSelecionado.preco}</p>
            </div>
            <div className="botoes-modal">
              <button className="btn-confirmar" onClick={() => setProdutoSelecionado(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
