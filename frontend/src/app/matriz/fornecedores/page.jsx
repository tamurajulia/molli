"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./fornecedoresMatriz.css";
import { Settings, Edit3, Trash2, AlertTriangle } from "lucide-react";

export default function FornecedoresTable() {
  const [isMobile, setIsMobile] = useState(false);
  const [filtroFornecedor, setFiltroFornecedor] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [fornecedorExcluir, setFornecedorExcluir] = useState(null);

  const dados = [
    {
      id: "01",
      fornecedor: "Rihappy",
      cnpj: "12.345.678/0001-90",
      telefone: "(21) 99999-8888",
      endereco: "Rua das Flores, 123 - RJ",
      tipoProduto: "Roupas de Bebê",
    },
    {
      id: "02",
      fornecedor: "Cartes",
      cnpj: "98.765.432/0001-10",
      telefone: "(21) 98888-7777",
      endereco: "Av. Central, 890 - SP",
      tipoProduto: "Roupas de Bebê",
    },
    {
      id: "03",
      fornecedor: "Toca baby",
      cnpj: "11.222.333/0001-55",
      telefone: "(21) 97777-6666",
      endereco: "Rua Verde, 45 - RJ",
      tipoProduto: "Acessórios",
    },
    {
      id: "04",
      fornecedor: "Luminos",
      cnpj: "44.555.666/0001-22",
      telefone: "(21) 96666-5555",
      endereco: "Rua Azul, 67 - MG",
      tipoProduto: "Cobertores",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDadosFiltrados(dados);
  }, []);

  const aplicarFiltro = () => {
    const filtrados = dados.filter((item) => {
      const matchFornecedor = filtroFornecedor
        ? item.fornecedor
            .toLowerCase()
            .includes(filtroFornecedor.toLowerCase())
        : true;

      const matchCategoria = filtroCategoria
        ? item.tipoProduto.toLowerCase().includes(filtroCategoria.toLowerCase())
        : true;

      return matchFornecedor && matchCategoria;
    });

    setDadosFiltrados(filtrados);
  };

  const confirmarExclusao = () => {
    setDadosFiltrados((prev) =>
      prev.filter((item) => item.id !== fornecedorExcluir.id)
    );
    setFornecedorExcluir(null);
  };

  return (
    <div className="container">
      <h2 className="titulo">
        <Settings className="iconeTitulo" size={22} />
        <span className="titulo-preto">Gerenciamento de</span>
        <span className="titulo-verde"> Fornecedores:</span>
      </h2>

      <div className="filtros mt-5">
        <div className="campo">
          <label className="tituloInput">Nome do Fornecedor:</label>
          <input
            type="text"
            className="inputFocus"
            placeholder="Insira o fornecedor"
            value={filtroFornecedor}
            onChange={(e) => setFiltroFornecedor(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloInput">Categoria:</label>
          <select
            className="inputFocus"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Roupas de Bebê">Roupas de Bebê</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Cobertores">Cobertores</option>
          </select>
        </div>

        <button className="btnFiltrar" onClick={aplicarFiltro}>
          Filtrar
        </button>
      </div>

      <Link href="/matriz/fornecedores/cadastrar">
        <button className="botao-cadastrar">Cadastrar</button>
      </Link> 

      <div className="tabelaContainer">
        <h3 className="subtitulo">Fornecedores</h3>

        {!isMobile ? (
          <div className="tabela-wrapper">
            <table className="tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fornecedor</th>
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th>Categoria</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead> 
              <tbody>
                {dadosFiltrados.length > 0 ? (
                  dadosFiltrados.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.fornecedor}</td>
                      <td>{item.cnpj}</td>
                      <td>{item.telefone}</td>
                      <td>{item.endereco}</td>
                      <td>{item.tipoProduto}</td>
                      <td className="acoes text-center">
                        <Link href="/matriz/fornecedores/editar">
                          <Edit3 className="icone" title="Editar" />
                        </Link>
                        <Trash2
                          className="icone icone-excluir"
                          title="Excluir"
                          onClick={() => setFornecedorExcluir(item)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-3">
                      Nenhum resultado encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          dadosFiltrados.map((item) => (
            <div className="card-fornecedor" key={item.id}>
              <div><strong>ID:</strong> {item.id}</div>
              <div><strong>Fornecedor:</strong> {item.fornecedor}</div>
              <div><strong>CNPJ:</strong> {item.cnpj}</div>
              <div><strong>Telefone:</strong> {item.telefone}</div>
              <div><strong>Endereço:</strong> {item.endereco}</div>
              <div><strong>Tipo de Produto:</strong> {item.tipoProduto}</div>
              <div className="acoes">
                <Edit3 className="icone" />
                <Trash2
                  className="icone icone-excluir"
                  onClick={() => setFornecedorExcluir(item)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {fornecedorExcluir && (
        <div className="modal-overlay">
          <div className="modal-excluir">
            <div className="modal-header">
              <AlertTriangle size={26} className="icone-modal" />
              <h3>Excluir Fornecedor</h3>
            </div>
            <p>
              Tem certeza que deseja excluir{" "}
              <strong>{fornecedorExcluir.fornecedor}</strong>?
            </p>
            <div className="botoes-modal">
              <button
                className="btn-cancelar"
                onClick={() => setFornecedorExcluir(null)}
              >
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarExclusao}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
