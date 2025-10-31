"use client";
import KpiCards from "@/components/Kpi/kpicards";
import Charts from "@/components/Grafico/charts";
import "./dashboard.css";
import html2pdf from "html2pdf.js"; 

export default function DashboardPage() {
  const kpis = [
    { label: "Faturamento Loja", value: "R$ 850.000", icon: "bi-cash-stack" },
    { label: "Total Vendas", value: "5.600", icon: "bi-cart3" },
    { label: "Crescimento Mês", value: "8%", icon: "bi-arrow-up-right" },
    { label: "Funcionários Ativos", value: "25", icon: "bi-people" },
    { label: "Meta Mensal", value: "R$ 900.000", icon: "bi-bullseye" },
    { label: "Lucro Líquido", value: "R$ 450.000", icon: "bi-wallet2" },
  ];

  const handleDownloadPDF = () => {
    const element = document.getElementById("dashboard-pdf"); 
    const opt = {
      margin:       0.5,
      filename:     "dashboard-filial.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="dashboard-container">
  <h1 className="dashboard-title">
   <i className="bi bi-bar-chart-fill" style={{ marginRight: "10px", color: "#8faaa3" }}></i>
      Dashboard da Filial
     </h1>
     <button onClick={handleDownloadPDF} className="pdf-button">
        <i className="bi bi-download" style={{ marginRight: "8px" }}></i>
            Baixar PDF
     </button>
      <div id="dashboard-pdf">
        <KpiCards kpis={kpis} />
        <Charts />
      </div>
    </div>
  );
}
