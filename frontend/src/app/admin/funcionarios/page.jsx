"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import "./funcionarios.css";
import { Users, XCircle, Edit3, UserCheck, AlertTriangle } from "lucide-react";

export default function Funcionarios() {
  const [isMobile, setIsMobile] = useState(false);
  const [cargoFiltro, setCargoFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [idExcluir, setIdExcluir] = useState(null);
  const [idStatus, setIdStatus] = useState(null); // ID do funcionário a ser ativado/desativado

  const dadosIniciais = [
    { id: "01", funcionario: "João Almeida", cargo: "Caixa", salario: "R$2.000,00", status: "Ativo" },
    { id: "02", funcionario: "Letícia Body", cargo: "Estoquista", salario: "R$1.800,00", status: "Desativado" },
    { id: "03", funcionario: "Miguel Touca", cargo: "Vendedor", salario: "R$2.200,00", status: "Ativo" },
    { id: "04", funcionario: "Sofia Manta", cargo: "Gerente", salario: "R$3.000,00", status: "Ativo" },
    { id: "05", funcionario: "Lucas Paninho", cargo: "Repositor", salario: "R$1.600,00", status: "Desativado" },
  ];

  useEffect(() => {
    const armazenados = localStorage.getItem("funcionarios");
    if (armazenados) {
      const lista = JSON.parse(armazenados);
      setFuncionarios(lista);
      setDadosFiltrados(lista);
    } else {
      setFuncionarios(dadosIniciais);
      setDadosFiltrados(dadosIniciais);
      localStorage.setItem("funcionarios", JSON.stringify(dadosIniciais));
    }
  }, []);

  const cargosUnicos = useMemo(() => {
    return Array.from(new Set(dadosIniciais.map((f) => f.cargo)));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtrarFuncionarios = () => {
    const filtrados = funcionarios.filter((item) => {
      const cargoMatch = cargoFiltro ? item.cargo === cargoFiltro : true;
      const statusMatch = statusFiltro ? item.status === statusFiltro : true;
      const nomeMatch = nomeFiltro
        ? item.funcionario.toLowerCase().includes(nomeFiltro.toLowerCase())
        : true;
      return cargoMatch && statusMatch && nomeMatch;
    });
    setDadosFiltrados(filtrados);
  };

  const limparFiltros = () => {
    setCargoFiltro("");
    setStatusFiltro("");
    setNomeFiltro("");
    setDadosFiltrados(funcionarios);
  };

  const excluirFuncionario = () => {
    const atualizados = funcionarios.filter((f) => f.id !== idExcluir);
    setFuncionarios(atualizados);
    setDadosFiltrados(atualizados);
    localStorage.setItem("funcionarios", JSON.stringify(atualizados));
    setIdExcluir(null);
  };

  // Alternar status do funcionário (Ativo/Desativado)
  const confirmarStatusFuncionario = () => {
    const atualizados = funcionarios.map((f) =>
      f.id === idStatus
        ? { ...f, status: f.status === "Ativo" ? "Desativado" : "Ativo" }
        : f
    );
    setFuncionarios(atualizados);
    setDadosFiltrados(atualizados);
    localStorage.setItem("funcionarios", JSON.stringify(atualizados));
    setIdStatus(null);
  };

  return (
    <div className="container">
      {/* Título */}
      <h2 className="titulo">
        <Users className="iconeTitulo" size={22} />
        <span className="titulo-preto">Gerenciamento de</span>
        <span className="titulo-verde"> Funcionários:</span>
      </h2>

      {/* FILTROS */}
      <div className="filtros">
        <div className="campo">
          <label className="tituloInput">Nome:</label>
          <input
            type="text"
            placeholder="Buscar por nome"
            className="inputFocus"
            value={nomeFiltro}
            onChange={(e) => setNomeFiltro(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloInput">Cargo:</label>
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
          <label className="tituloInput">Status:</label>
          <select
            className="inputFocus"
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Desativado">Desativado</option>
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
                    <td>{item.salario}</td>
                    <td>{item.status}</td>
                    <td className="acoes text-center">
                      <XCircle
                        className="icone icone-excluir"
                        title="Excluir"
                        onClick={() => setIdExcluir(item.id)}
                      />
                      <Link href={`/admin/funcionarios/editar/${item.id}`}>
                        <Edit3 className="icone" title="Editar" />
                      </Link>
                      <UserCheck
                        className="icone icone-status"
                        title="Alterar Status"
                        onClick={() => setIdStatus(item.id)}
                      />
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
              <div><strong>ID:</strong> {item.id}</div>
              <div><strong>Funcionário:</strong> {item.funcionario}</div>
              <div><strong>Cargo:</strong> {item.cargo}</div>
              <div><strong>Salário:</strong> {item.salario}</div>
              <div><strong>Status:</strong> {item.status}</div>
              <div className="acoes">
                <XCircle className="icone icone-excluir" onClick={() => setIdExcluir(item.id)} />
                <Link href={`/admin/funcionarios/editar/${item.id}`}>
                  <Edit3 className="icone" />
                </Link>
                <UserCheck className="icone icone-status" onClick={() => setIdStatus(item.id)} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL EXCLUIR */}
      {idExcluir && (
        <div className="modal-overlay" onClick={() => setIdExcluir(null)}>
          <div className="modal-excluir" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <AlertTriangle size={22} className="icone-modal" />
              <h3>Confirmar exclusão</h3>
            </div>
            <p>Tem certeza que deseja excluir este funcionário?</p>
            <div className="botoes-modal">
              <button className="btn-cancelar" onClick={() => setIdExcluir(null)}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={excluirFuncionario}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ATIVAR/DESATIVAR */}
      {idStatus && (
        <div className="modal-overlay" onClick={() => setIdStatus(null)}>
          <div className="modal-excluir" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <UserCheck size={22} className="icone-modal" style={{ color: "#8FAAA3" }} />
              <h3>Alterar status</h3>
            </div>
            <p>
              {funcionarios.find((f) => f.id === idStatus)?.status === "Ativo"
                ? "Tem certeza que deseja desativar este funcionário?"
                : "Tem certeza que deseja ativar este funcionário?"}
            </p>
            <div className="botoes-modal">
              <button className="btn-cancelar" onClick={() => setIdStatus(null)}>
                Cancelar
              </button>
              <button
                className="btn-confirmar"
                style={{ backgroundColor: "#8FAAA3" }}
                onClick={confirmarStatusFuncionario}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
