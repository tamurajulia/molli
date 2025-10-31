"use client";

import React, { useState } from "react";
import { TrendingUp, ShoppingCart, FileText, HelpCircle } from "lucide-react";
import "./FluxoCaixaLoja.css";

const FinanceiroFluxoCaixa = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const cards = [
    { titulo: "Hoje", valor: "2.900", total: "R$10.357,98" },
    { titulo: "Semanal", valor: "2.000", total: "R$768.986,08" },
    { titulo: "Mês", valor: "2.000", total: "R$768.986,08" },
  ];

  const data = [
    { name: "Seg", vendas: 18 },
    { name: "Ter", vendas: 25 },
    { name: "Qua", vendas: 22 },
    { name: "Qui", vendas: 35 },
    { name: "Sex", vendas: 37 },
    { name: "Sáb", vendas: 28 },
    { name: "Dom", vendas: 31 },
  ];

  // Gráfico SVG
  const maxY = Math.max(...data.map((d) => d.vendas));
  const height = 150;
  const width = 400;
  const stepX = width / (data.length - 1);
  const points = data
    .map((d, i) => {
      const x = i * stepX;
      const y = height - (d.vendas / maxY) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="container">
      <h2 className="titulo d-flex align-items-center gap-2 mb-4">
        <TrendingUp className="iconeTitulo" size={22} />
        <span className="titulo-preto">Fluxo de</span>
        <span className="titulo-verde"> Caixa da Loja</span>
      </h2>

      {/* --- CARDS --- */}
      <div className="cardsContainer">
        {cards.map((item, index) => (
          <div key={index} className="cardFluxo">
            <div className="ladoVerde">
              <ShoppingCart size={26} />
              <span className="tituloCard">{item.titulo}</span>
            </div>
            <div className="ladoBranco">
              <span className="valor">{item.valor}</span>
              <span className="total">{item.total}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- GRÁFICO SVG --- */}
      <div className="graficoContainer">
        <div className="graficoHeader">Gráfico de Vendas Diário</div>
        <div className="graficoCorpo">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="graficoSVG"
          >
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1="0"
                x2={width}
                y1={(height / 4) * i}
                y2={(height / 4) * i}
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            ))}

            <polyline fill="none" stroke="#6c9087" strokeWidth="2" points={points} />

            {data.map((d, i) => {
              const x = i * stepX;
              const y = height - (d.vendas / maxY) * height;
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#6c9087" />;
            })}
          </svg>

          <div className="eixoX">
            {data.map((d, i) => (
              <span key={i}>{d.name}</span>
            ))}
          </div>
        </div>
        <div className="graficoRodape">Total: R$40.345,98</div>
      </div>

      {/* --- CARD DE RELATÓRIO --- */}
      <div className="card-relatorio">
        <div className="cabecalho-relatorio">
          <div className="titulo-relatorio">
            <FileText size={22} />
            <h2 className="">Emissão de relatórios</h2>
          </div>
          <HelpCircle
            size={20}
            className="icone-ajuda"
            onClick={() => setMostrarModal(true)}
          />
        </div>

        <div className="inputs-relatorio">
          <div className="campo">
            <label className="tituloRelatorio">Formato:</label>
            <select>
              <option value="">Escolha formato</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
            </select>
          </div>

          <div className="campo">
            <label className="tituloRelatorio">Período:</label>
            <select>
              <option value="">Escolha o período</option>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
          </div>

          <button className="btnBaixar">Baixar relatório</button>
        </div>
      </div>

     {mostrarModal && (
  <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
    <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <FileText size={22} className="iconeModal" />
        <h3>Como gerar um relatório</h3>
      </div>

      <p className="textoModal">
        Para gerar um relatório, siga os passos abaixo:
      </p>

      <ul className="listaModal">
        <li>Selecione o formato desejado (PDF ou Word).</li>
        <li>Escolha o período do relatório (Diário, Semanal ou Mensal).</li>
        <li>Clique em <strong>"Baixar relatório"</strong> para gerar automaticamente.</li>
      </ul>

      <button
        className="btnFiltrar"
        onClick={() => setMostrarModal(false)}
      >
        Fechar
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default FinanceiroFluxoCaixa;
