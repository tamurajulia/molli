"use client";

import { ChartNoAxesCombined, Edit3, Search } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./financeiroAdm.css";

export default function FinanceiroEntradas() {
  const router = useRouter();

  // Lista de entradas
  const [dadosEntradas] = useState([
    { id: "01", data: "2025-10-01", descricao: "Venda de Produto A", valor: "R$ 100,00", totalEntradas: "R$ 100,00", Registro: "João Almeida" },
    { id: "02", data: "2025-10-02", descricao: "Venda de Produto B", valor: "R$ 200,00", totalEntradas: "R$ 200,00", Registro: "Letícia Body" },
    { id: "03", data: "2025-10-03", descricao: "Venda de Produto C", valor: "R$ 150,00", totalEntradas: "R$ 150,00", Registro: "Miguel Touca" },
    { id: "04", data: "2025-10-04", descricao: "Venda de Produto D", valor: "R$ 250,00", totalEntradas: "R$ 250,00", Registro: "Sofia Manta" },
  ]);

  // Estados dos filtros
  const [filtroData, setFiltroData] = useState("");
  const [filtroRegistro, setFiltroRegistro] = useState("");
  const [filtroValor, setFiltroValor] = useState("");
  const [entradasFiltradas, setEntradasFiltradas] = useState(dadosEntradas);

  // Função de filtro
  const filtrarEntradas = () => {
    let filtradas = dadosEntradas;

    if (filtroData) {
      filtradas = filtradas.filter((item) => item.data === filtroData);
    }

    if (filtroRegistro) {
      filtradas = filtradas.filter((item) =>
        item.Registro.toLowerCase().includes(filtroRegistro.toLowerCase())
      );
    }

    if (filtroValor) {
      filtradas = filtradas.filter((item) =>
        item.valor.toLowerCase().includes(filtroValor.toLowerCase())
      );
    }

    setEntradasFiltradas(filtradas);
  };

 

  return (
    <div className="container">
      {/* --- TÍTULO --- */}
      <h2 className="titulo d-flex align-items-center gap-2 mb-4">
        <ChartNoAxesCombined className="iconeTitulo" size={22} />
        <span className="titulo-preto">Entradas do</span>
        <span className="titulo-verde">Caixa:</span>
      </h2>

      {/* --- FILTROS --- */}
      <div className="filtros mt-5">
        

        <div className="campo">
          <label className="tituloinput">Registro Funcionário:</label>
          <input
            type="text"
            placeholder="Ex: 293846565"
            className="inputFocus"
            value={filtroRegistro}
            onChange={(e) => setFiltroRegistro(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloinput">Valor da Venda:</label>
          <input
            type="text"
            placeholder="Ex: R$ 150"
            className="inputFocus"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
          />
        </div>

        <button className="btnFiltrar" onClick={filtrarEntradas}>
           Filtrar
        </button>
      </div>

      <span className="titulofinanceiro">Resultados:</span>

      {/* --- TABELA (DESKTOP/TABLET) --- */}
      <div className="tabelaContainer mt-2">
        <h3 className="subtitulo">Entradas</h3>
        <table className="tabela table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Descrição da Venda</th>
              <th>Valor da Venda</th>
              <th>Total de Entradas</th>
              <th>Registro Funcionário</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {entradasFiltradas.length > 0 ? (
              entradasFiltradas.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                  <td>{item.descricao}</td>
                  <td>{item.valor}</td>
                  <td>{item.totalEntradas}</td>
                  <td>{item.Registro}</td>
                  <td className="text-center">
                    <Edit3
                      className="icone text-secondary"
                      size={18}
                      title="Editar"
                      role="button"
                      onClick={() => irParaEdicao(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Nenhuma entrada encontrada com os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARDS (MOBILE) --- */}
      <div className="cardsMobile">
        {entradasFiltradas.length > 0 ? (
          entradasFiltradas.map((item) => (
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
                <strong>Total:</strong> <span>{item.totalEntradas}</span>
              </div>
              <div className="linha-info">
                <strong>Registro Funcionário:</strong>{" "}
                <span>{item.Registro}</span>
              </div>
              <div className="acoes">
                <Edit3
                  className="icone"
                  size={18}
                  title="Editar"
                  role="button"
                  onClick={() => irParaEdicao(item.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Nenhuma entrada encontrada.</p>
        )}
      </div>
    </div>
  );
}
