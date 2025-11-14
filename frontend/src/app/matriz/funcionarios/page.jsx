"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import "./funcionarios.css";
import { Users, XCircle, Edit3, UserCheck, AlertTriangle } from "lucide-react";

export default function Funcionarios() {
  const [isMobile, setIsMobile] = useState(false);
  const [cargoFiltro, setCargoFiltro] = useState("");
  const [filialFiltro, setFilialFiltro] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [idExcluir, setIdExcluir] = useState(null);
  const [idStatus, setIdStatus] = useState(null);

  const funcionarios = [
    { id: "01", funcionario: "João Almeida", cargo: "Caixa", filial: "Loja Matriz", salario: "R$2.000,00", status: "Ativo" },
    { id: "02", funcionario: "Letícia Body", cargo: "Estoquista", filial: "Loja 1", salario: "R$1.800,00", status: "Desativado" },
    { id: "03", funcionario: "Miguel Touca", cargo: "Vendedor", filial: "Loja 2", salario: "R$2.200,00", status: "Ativo" },
    { id: "04", funcionario: "Sofia Manta", cargo: "Gerente", filial: "Matriz", salario: "R$3.000,00", status: "Ativo" },
    { id: "05", funcionario: "Lucas Paninho", cargo: "Repositor", filial: "Loja 3", salario: "R$1.600,00", status: "Desativado" },
  ];

  const cargosUnicos = useMemo(() => [...new Set(funcionarios.map(f => f.cargo))], [funcionarios]);
  const filiaisUnicas = useMemo(() => [...new Set(funcionarios.map(f => f.filial))], [funcionarios]);

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
      const cargoMatch = cargoFiltro ? item.cargo === cargoFiltro : true;
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

  const excluirFuncionario = () => {
    const atualizados = dadosFiltrados.filter((f) => f.id !== idExcluir);
    setDadosFiltrados(atualizados);
    setIdExcluir(null);
  };

  const confirmarStatusFuncionario = () => {
    const atualizados = dadosFiltrados.map((f) =>
      f.id === idStatus
        ? { ...f, status: f.status === "Ativo" ? "Desativado" : "Ativo" }
        : f
    );
    setDadosFiltrados(atualizados);
    setIdStatus(null);
  };

  return (
    <div className="container">
      <h2 className="titulo">
        <Users className="iconeTitulo" size={22} />
        <span className="titulo-preto">Gerenciamento de</span>
        <span className="titulo-verde"> Funcionários:</span>
      </h2>
      <div className="filtros">
        <div className="campo">
          <label className="titulo-preto">Cargo:</label>
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
          <label className="titulo-preto">Filial vinculada:</label>
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

        <button className="btnFiltrar" onClick={filtrarFuncionarios}>Filtrar</button>
        <button className="btnFiltrar" onClick={limparFiltros}>Limpar</button>
      </div>

      <Link href="/matriz/funcionarios/cadastrar">
        <button className="botao-cadastrar">Cadastrar</button>
      </Link>

      <div className="tabelaContainer">
        <h3 className="subtitulo">Funcionários</h3>

        {!isMobile ? (
          <table className="tabela">
            <thead>
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
                  <tr key={item.id} className={item.status === "Desativado" ? "linha-desativado" : ""}>
                    <td>{item.id}</td>
                    <td>{item.funcionario}</td>
                    <td>{item.cargo}</td>
                    <td>{item.filial}</td>
                    <td>{item.salario}</td>
                    <td className={item.status === "Ativo" ? "status-ativo" : "status-desativado"}>
                      {item.status}
                    </td>
                    <td className="acoes text-center">
                      <XCircle className="icone icone-excluir" title="Excluir" onClick={() => setIdExcluir(item.id)} />
                      <Link href={`/matriz/funcionarios/editar/${item.id}`}>
                        <Edit3 className="icone" title="Editar" />
                      </Link>
                      <UserCheck className="icone" title="Status" onClick={() => setIdStatus(item.id)} />
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
            <div className={`card-fornecedor ${item.status === "Desativado" ? "desativado" : ""}`} key={item.id}>
              <div><strong>ID:</strong> {item.id}</div>
              <div><strong>Funcionário:</strong> {item.funcionario}</div>
              <div><strong>Cargo:</strong> {item.cargo}</div>
              <div><strong>Filial:</strong> {item.filial}</div>
              <div><strong>Salário:</strong> {item.salario}</div>
              <div><strong>Status:</strong> {item.status}</div>
              <div className="acoes">
                <XCircle className="icone" onClick={() => setIdExcluir(item.id)} />
                <Link href={`/matriz/funcionarios/editar/${item.id}`}>
                  <Edit3 className="icone" />
                </Link>
                <UserCheck className="icone" onClick={() => setIdStatus(item.id)} />
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
            <p>Tem certeza que deseja excluir este funcionário?</p>
            <div className="botoes-modal">
              <button className="btn-cancelar" onClick={() => setIdExcluir(null)}>Cancelar</button>
              <button className="btn-confirmar" onClick={excluirFuncionario}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      {idStatus && (
        <div className="modal-overlay" onClick={() => setIdStatus(null)}>
          <div className="modal-excluir" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <UserCheck size={22} className="icone-modal" style={{ color: "#8FAAA3" }} />
              <h3>Alterar status</h3>
            </div>
            <p>
              {dadosFiltrados.find((f) => f.id === idStatus)?.status === "Ativo"
                ? "Tem certeza que deseja desativar este funcionário?"
                : "Tem certeza que deseja ativar este funcionário?"}
            </p>
            <div className="botoes-modal">
              <button className="btn-cancelar" onClick={() => setIdStatus(null)}>Cancelar</button>
              <button className="btn-confirmar" style={{ backgroundColor: "#8FAAA3" }} onClick={confirmarStatusFuncionario}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
