"use client";

import { ChartNoAxesCombined, Edit3 } from "lucide-react";
import React, { useState } from "react";

const FinanceiroFuncionarios = () => {
  const dadosFuncionarios = [
    { id: "01", dataPagamento: "05/10/2025", funcionario: "João Almeida", cargo: "Vendedor", salario: 2500, status: "Pago", metodo: "PIX" },
    { id: "02", dataPagamento: "05/10/2025", funcionario: "Letícia Santos", cargo: "Caixa", salario: 2200, status: "Pendente", metodo: "Boleto" },
    { id: "03", dataPagamento: "05/10/2025", funcionario: "Miguel Torres", cargo: "Estoquista", salario: 2000, status: "Pago", metodo: "Transferência" },
    { id: "04", dataPagamento: "05/10/2025", funcionario: "Sofia Costa", cargo: "Atendente", salario: 2850, status: "Atrasado", metodo: "PIX" },
  ];

  // Estados dos inputs de filtro
  const [filtroValor, setFiltroValor] = useState("");
  const [filtroCargo, setFiltroCargo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  // Estado que guarda o resultado filtrado
  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState(dadosFuncionarios);

  // Função chamada ao clicar no botão "Filtrar"
  const aplicarFiltros = () => {
    const filtrados = dadosFuncionarios.filter((item) => {
      const salarioMatch = filtroValor
        ? item.salario >= parseFloat(filtroValor.replace(",", "."))
        : true;
      const cargoMatch = filtroCargo ? item.cargo === filtroCargo : true;
      const statusMatch = filtroStatus ? item.status === filtroStatus : true;

      return salarioMatch && cargoMatch && statusMatch;
    });

    setFuncionariosFiltrados(filtrados);
  };

  return (
    <div className="container">
      {/* --- TÍTULO --- */}
      <h2 className="titulo d-flex align-items-center gap-2 mb-4">
        <ChartNoAxesCombined className="iconeTitulo" size={22} />
        <span className="titulo-preto">Financeiro dos</span>
        <span className="titulo-verde"> Funcionários:</span>
      </h2>

      {/* --- FILTROS --- */}
      <div className="filtros p-1">
        <div className="campo">
          <label className="tituloinput">Salário mínimo:</label>
          <input
            type="text"
            className="inputFocus"
            placeholder="Ex: 2000"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloinput">Cargo:</label>
          <select
            className="form-select"
            value={filtroCargo}
            onChange={(e) => setFiltroCargo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Caixa">Caixa</option>
            <option value="Estoquista">Estoquista</option>
            <option value="Atendente">Atendente</option>
          </select>
        </div>

        <div className="campo">
          <label className="tituloinput">Status:</label>
          <select
            className="form-select"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Pago">Pago</option>
            <option value="Pendente">Pendente</option>
            <option value="Atrasado">Atrasado</option>
          </select>
        </div>

        {/* Botão de Filtrar */}
        <button className="btnFiltrar" onClick={aplicarFiltros}>
          Filtrar
        </button>
      </div>

      <span className="titulofinanceiro mt-3 d-block">Resultados:</span>

      {/* --- TABELA (DESKTOP/TABLET) --- */}
      <div className="tabelaContainer mt-2">
        <h3 className="subtitulo">Funcionários</h3>
        <table className="tabela table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Data de Pagamento</th>
              <th>Funcionário</th>
              <th>Cargo</th>
              <th>Salário</th>
              <th>Status</th>
              <th>Método</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.length > 0 ? (
              funcionariosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td>{item.dataPagamento}</td>
                  <td>{item.funcionario}</td>
                  <td>{item.cargo}</td>
                  <td>
                    {item.salario.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{item.status}</td>
                  <td>{item.metodo}</td>
                  <td className="text-center">
                    <Edit3
                      className="icone text-secondary"
                      size={18}
                      title="Editar"
                      role="button"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Nenhum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARDS (MOBILE) --- */}
      <div className="cardsMobile">
        {funcionariosFiltrados.map((item) => (
          <div className="cardFinanceiro" key={item.id}>
            <div className="linha-info"><strong>Data de Pagamento:</strong> <span>{item.dataPagamento}</span></div>
            <div className="linha-info"><strong>Funcionário:</strong> <span>{item.funcionario}</span></div>
            <div className="linha-info"><strong>Cargo:</strong> <span>{item.cargo}</span></div>
            <div className="linha-info">
              <strong>Salário:</strong>{" "}
              <span>
                {item.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <div className="linha-info"><strong>Status:</strong> <span>{item.status}</span></div>
            <div className="linha-info"><strong>Método:</strong> <span>{item.metodo}</span></div>
            <div className="acoes">
              <Edit3 className="icone" size={18} title="Editar" role="button" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceiroFuncionarios;
