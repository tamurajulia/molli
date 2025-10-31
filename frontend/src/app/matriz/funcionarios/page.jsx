"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import "./funcionarios.css";
import { Users, XCircle, Edit3, UserCheck } from "lucide-react";

export default function Funcionarios() {
  const [isMobile, setIsMobile] = useState(false);
  const [cargoFiltro, setCargoFiltro] = useState("");
  const [filialFiltro, setFilialFiltro] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const funcionarios = [
    { id: "01", funcionario: "João Almeida", cargo: "Caixa", filial: "Loja Matriz", salario: "R$2.000,00", status: "Ativo" },
    { id: "02", funcionario: "Letícia Body", cargo: "Estoquista", filial: "Loja 1", salario: "R$1.800,00", status: "Desativado" },
    { id: "03", funcionario: "Miguel Touca", cargo: "Vendedor", filial: "Loja 2", salario: "R$2.200,00", status: "Ativo" },
    { id: "04", funcionario: "Sofia Manta", cargo: "Gerente", filial: "Matriz", salario: "R$3.000,00", status: "Ativo" },
    { id: "05", funcionario: "Lucas Paninho", cargo: "Repositor", filial: "Loja 3", salario: "R$1.600,00", status: "Esgotado" },
  ];

  // Gera listas únicas de cargos e filiais para popular os selects
  const cargosUnicos = useMemo(() => {
    return Array.from(new Set(funcionarios.map(f => f.cargo)));
  }, [funcionarios]);

  const filiaisUnicas = useMemo(() => {
    return Array.from(new Set(funcionarios.map(f => f.filial)));
  }, [funcionarios]);

  useEffect(() => {
    setDadosFiltrados(funcionarios);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtrarFuncionarios = () => {
    const filtrados = funcionarios.filter((item) => {
      const cargoMatch = cargoFiltro ? item.cargo === cargoFiltro : true; // igualdade exata para select
      const filialMatch = filialFiltro ? item.filial === filialFiltro : true;
      return cargoMatch && filialMatch;
    });
    setDadosFiltrados(filtrados);
  };

  const limparFiltros = () => {
    setCargoFiltro("");
    setFilialFiltro("");
    setDadosFiltrados(funcionarios);
  };

  return (
    <div className="container">
      {/* Título */}
      <h2 className="titulo">
        <Users className="iconeTitulo" size={22} />
        <span className="titulo-preto">Gerenciamento de</span>
        <span className="titulo-verde"> Funcionários:</span>
      </h2>

      {/* FILTROS (SELECTS) */}
      <div className="filtros">
        <div className="campo">
          <label>Cargo:</label>
          <select
            className="inputFocus"
            value={cargoFiltro}
            onChange={(e) => setCargoFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {cargosUnicos.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Filial vinculada:</label>
          <select
            className="inputFocus"
            value={filialFiltro}
            onChange={(e) => setFilialFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {filiaisUnicas.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <button className="btnFiltrar" onClick={filtrarFuncionarios}>
          Filtrar
        </button>

     
      </div>

      {/* BOTÃO CADASTRAR */}
      <Link href="/admin/funcionarios/cadastrar">
        <button className="botao-cadastrar">Cadastrar</button>
      </Link>

      {/* TABELA */}
      <div className="tabelaContainer">
        <h3 className="subtitulo">Funcionários</h3>

        {!isMobile ? (
          <table className="tabela">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Funcionário</th>
                <th>Cargo</th>
                <th>Filial</th>
                <th>Salário</th>
                <th>Status</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.length > 0 ? (
                dadosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.funcionario}</td>
                    <td>{item.cargo}</td>
                    <td>{item.filial}</td>
                    <td>{item.salario}</td>
                    <td>{item.status}</td>
                    <td className="acoes text-center">
                      <XCircle className="icone" title="Excluir" />
                      <Link href={`/admin/funcionarios/editar/${item.id}`}>
                        <Edit3 className="icone" title="Editar" />
                      </Link>
                      <UserCheck className="icone" title="Status" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          dadosFiltrados.map((item) => (
            <div className="card-fornecedor" key={item.id}>
              <div className="linha-info"><strong>ID:</strong> {item.id}</div>
              <div className="linha-info"><strong>Funcionário:</strong> {item.funcionario}</div>
              <div className="linha-info"><strong>Cargo:</strong> {item.cargo}</div>
              <div className="linha-info"><strong>Filial:</strong> {item.filial}</div>
              <div className="linha-info"><strong>Salário:</strong> {item.salario}</div>
              <div className="linha-info"><strong>Status:</strong> {item.status}</div>
              <div className="acoes">
                <XCircle className="icone" />
                <Link href={`/admin/funcionarios/editar/${item.id}`}>
                  <Edit3 className="icone" />
                </Link>
                <UserCheck className="icone" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
