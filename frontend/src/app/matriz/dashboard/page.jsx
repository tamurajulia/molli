"use client";

import Chart from "@/components/Charts/charts";
import KpiCards from "@/components/KpiCards/kpicards";
import html2pdf from "html2pdf.js";
import "./dashboard.css";

export default function Dashboard() {
  const kpis = [
    { label: "Faturamento Loja", value: "R$ 850.000" },
    { label: "Total Vendas", value: "5.600" },
    { label: "Crescimento Mês", value: "8%" },
    { label: "Funcionários Ativos", value: "25" },
    { label: "Meta Mensal", value: "R$ 900.000" },
    { label: "Lucro Líquido", value: "R$ 450.000" },
  ];

  const handleDownloadPDF = () => {
    const element = document.getElementById("dashboard-pdf");
    const opt = {
      margin: 0.5,
      filename: "dashboard-filial.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="container" id="dashboard-pdf">
      <div className="titulo-dashboard">
        <i className="bi bi-bar-chart-fill iconeTitulo"></i>
        <span className="titulo-texto">Dashboard da Matriz</span>
      </div>

      <button onClick={handleDownloadPDF} className="btn-exportar">
        <i className="bi bi-download"></i> Baixar PDF
      </button>

      <KpiCards kpis={kpis} />
      <Chart />
    </div>
  );
}
