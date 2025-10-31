"use client";

import React, { useState } from "react";
import { ChartNoAxesCombined, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import "./FinanceiroAdmSaida.css";

export default function FinanceiroSaida() {
  const router = useRouter();

  const dadosIniciais = [
    { id: "01", data: "2025-10-01", descricao: "Compra de Material de Escritório", valor: "R$ 150,00", status: "Pago" },
    { id: "02", data: "2025-10-03", descricao: "Conta de Energia Elétrica", valor: "R$ 420,00", status: "Pendente" },
    { id: "03", data: "2025-10-05", descricao: "Serviço de Limpeza", valor: "R$ 200,00", status: "Pago" },
    { id: "04", data: "2025-10-07", descricao: "Compra de Insumos", valor: "R$ 310,00", status: "Atrasado" },
  ];

  const [despesas, setDespesas] = useState(dadosIniciais);
  const [filtroValor, setFiltroValor] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [despesasFiltradas, setDespesasFiltradas] = useState(dadosIniciais);

  const aplicarFiltro = () => {
    const filtradas = despesas.filter((item) => {
      const matchValor = filtroValor
        ? item.valor.replace(/[^\d,]/g, "").includes(filtroValor.replace(/[^\d,]/g, ""))
        : true;
      const matchStatus = filtroStatus ? item.status === filtroStatus : true;
      return matchValor && matchStatus;
    });
    setDespesasFiltradas(filtradas);
  };

  return (
    <div className="container">
      <h2 className="titulo d-flex align-items-center gap-2 mb-4">
        <ChartNoAxesCombined className="iconeTitulo" size={22} />
        <span className="titulo-preto">Saídas do</span>
        <span className="titulo-verde">Caixa:</span>
      </h2>

      {/* FILTROS */}
      <div className="filtros mt-5">
        <div className="campo">
          <label className="tituloinput">Valor da Despesa:</label>
          <input
            type="text"
            className="inputFocus"
            placeholder="Ex: 150,00"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
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
            <option value="Pago">Pago</option>
            <option value="Pendente">Pendente</option>
            <option value="Atrasado">Atrasado</option>
          </select>
        </div>

        <button className="btnFiltrar" onClick={aplicarFiltro}>
          Filtrar
        </button>
      </div>

      <span className="titulofinanceiro">Resultados:</span>

      {/* TABELA */}
      <div className="tabelaContainer mt-2">
        <h3 className="subtitulo">Despesas</h3>
        <table className="tabela table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Descrição da despesa</th>
              <th>Valor da despesa</th>
              <th>Status de pagamento</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesasFiltradas.length > 0 ? (
              despesasFiltradas.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                  <td>{item.descricao}</td>
                  <td>{item.valor}</td>
                  <td
                    className={`${
                      item.status === "Pago"
                        ? "text-success"
                        : item.status === "Atrasado"
                        ? "text-danger"
                        : "text-warning"
                    } fw-semibold`}
                  >
                    {item.status}
                  </td>
                  <td className="text-center">
                    <Edit3
                      className="icone text-secondary"
                      size={18}
                      title="Editar"
                      role="button"
                      onClick={() => irParaEdicao(item)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  Nenhum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CARDS MOBILE */}
      <div className="cardsMobile">
        {despesasFiltradas.length > 0 ? (
          despesasFiltradas.map((item) => (
            <div className="cardFinanceiro" key={item.id}>
              <div className="linha-info">
                <strong>Data:</strong>{" "}
                <span>{new Date(item.data).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="linha-info">
                <strong>Descrição:</strong> <span>{item.descricao}</span>
              </div>
              <div className="linha-info">
                <strong>Valor:</strong> <span>{item.valor}</span>
              </div>
              <div className="linha-info">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    item.status === "Pago"
                      ? "text-success"
                      : item.status === "Atrasado"
                      ? "text-danger"
                      : "text-warning"
                  } fw-semibold`}
                >
                  {item.status}
                </span>
              </div>
              <div className="acoes">
                <Edit3
                  className="icone"
                  size={18}
                  title="Editar"
                  role="button"
                  onClick={() => irParaEdicao(item)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-3">
            Nenhum resultado encontrado
          </p>
        )}
      </div>
    </div>
  );
}
