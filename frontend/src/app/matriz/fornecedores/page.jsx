"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./fornecedores.css";
import { Settings, Edit3 } from "lucide-react";

export default function FornecedoresTable() {
  const [isMobile, setIsMobile] = useState(false);
  const [filtroFornecedor, setFiltroFornecedor] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const dados = [
    { id: "01", fornecedor: "João Almeida", cnpj: "12.345.678/0001-90", telefone: "(21) 99999-8888", status: "Ativo" },
    { id: "02", fornecedor: "Body Letícia", cnpj: "98.765.432/0001-10", telefone: "(21) 98888-7777", status: "Inativo" },
    { id: "03", fornecedor: "Touca Miguel", cnpj: "11.222.333/0001-55", telefone: "(21) 97777-6666", status: "Ativo" },
    { id: "04", fornecedor: "Manta Sofia", cnpj: "44.555.666/0001-22", telefone: "(21) 96666-5555", status: "Ativo" },
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
        ? item.fornecedor.toLowerCase().includes(filtroFornecedor.toLowerCase())
        : true;
      const matchStatus = filtroStatus ? item.status === filtroStatus : true;
      return matchFornecedor && matchStatus;
    });
    setDadosFiltrados(filtrados);
  };

  return (
    <div className="container">
      <h2 className="titulo">
        <Settings className="iconeTitulo" size={22} />
        <span className="titulo-preto">Gerenciamento de</span>
        <span className="titulo-verde"> Fornecedores:</span>
      </h2>

      {/* FILTROS */}
      <div className="filtros mt-5">
        <div className="campo">
          <label className="tituloinput">Nome do Fornecedor:</label>
          <input
            type="text"
            className="inputFocus"
            placeholder="Insira o fornecedor"
            value={filtroFornecedor}
            onChange={(e) => setFiltroFornecedor(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloinput">Status:</label>
          <select
            className="inputFocus"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <button className="btnFiltrar" onClick={aplicarFiltro}>
          Filtrar
        </button>
      </div>

      <Link href="/admin/estoque/cadastrar">
        <button className="botao-cadastrar">Cadastrar</button>
      </Link>

      {/* TABELA */}
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
                  <th>Status</th>
                  <th className="text-center">Ação</th>
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
                      <td
                        className={`${
                          item.status === "Ativo"
                            ? "text-success"
                            : "text-danger"
                        } fw-semibold`}
                      >
                        {item.status}
                      </td>
                      <td className="acoes text-center">
                        <Link href="/admin/fornecedores/editar">
                          <Edit3 className="icone" title="Editar" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-3">
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
              <div className="linha-info"><strong>ID:</strong> {item.id}</div>
              <div className="linha-info"><strong>Fornecedor:</strong> {item.fornecedor}</div>
              <div className="linha-info"><strong>CNPJ:</strong> {item.cnpj}</div>
              <div className="linha-info"><strong>Telefone:</strong> {item.telefone}</div>
              <div className="linha-info">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    item.status === "Ativo" ? "text-success" : "text-danger"
                  } fw-semibold`}
                >
                  {item.status}
                </span>
              </div>
              <div className="acoes">
                <Edit3 className="icone" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
