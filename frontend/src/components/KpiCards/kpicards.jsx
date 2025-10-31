"use client";

import "./kpicards.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function KpiCards({ kpis }) {

  const iconMap = {
    "Faturamento Loja": "bi-cash-stack",
    "Total Vendas": "bi-cart3",
    "Crescimento Mês": "bi-bar-chart-line",
    "Funcionários Ativos": "bi-people-fill",
    "Meta Mensal": "bi-calendar-check",
    "Lucro Líquido": "bi-wallet2",
  };

  return (
    <div className="kpiGrid">
      {kpis.map(({ label, value }) => (
        <div key={label} className="kpiCard">
          <div className="kpiLabel">
            <i className={`bi ${iconMap[label] || "bi-circle"}`}></i>
            {label}
          </div>
          <span className="kpiValue">{value}</span>
        </div>
      ))}
    </div>
  );
}

