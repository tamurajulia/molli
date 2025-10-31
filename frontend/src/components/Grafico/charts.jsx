"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Charts() {
  const vendasDiaRef = useRef(null);
  const fluxoCaixaRef = useRef(null);
  const desempenhoFuncRef = useRef(null);
  const vendasCategoriaRef = useRef(null);

  useEffect(() => {
    if (Chart.getChart(vendasDiaRef.current)) Chart.getChart(vendasDiaRef.current).destroy();
    if (Chart.getChart(fluxoCaixaRef.current)) Chart.getChart(fluxoCaixaRef.current).destroy();
    if (Chart.getChart(desempenhoFuncRef.current)) Chart.getChart(desempenhoFuncRef.current).destroy();
    if (Chart.getChart(vendasCategoriaRef.current)) Chart.getChart(vendasCategoriaRef.current).destroy();

    new Chart(vendasDiaRef.current, {
      type: "line",
      data: {
        labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        datasets: [
          {
            label: "Vendas (R$)",
            data: [70000, 85000, 90000, 80000, 95000, 100000, 110000],
            borderColor: "#8faaa3",
            backgroundColor: "rgba(143,170,163,0.3)",
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: "#8faaa3",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#566363" } } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#566363", callback: (val) => `R$ ${val.toLocaleString()}` },
            grid: { color: "#e0f2f1" },
          },
          x: {
            ticks: { color: "#566363" },
            grid: { display: false },
          },
        },
      },
    });

    new Chart(fluxoCaixaRef.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Entradas (R$)",
            data: [150000, 160000, 175000, 170000, 180000, 190000],
            backgroundColor: "#8faaa3",
            borderRadius: 5,
          },
          {
            label: "Saídas (R$)",
            data: [90000, 100000, 110000, 115000, 105000, 95000],
            backgroundColor: "#566363",
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#566363" } } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#566363", callback: (val) => `R$ ${val.toLocaleString()}` },
            grid: { color: "#e0f2f1" },
          },
          x: {
            ticks: { color: "#566363" },
            grid: { display: false },
          },
        },
      },
    });

    new Chart(desempenhoFuncRef.current, {
      type: "bar",
      data: {
        labels: ["João", "Maria", "Carlos", "Ana", "Lucas", "Fernanda", "Pedro"],
        datasets: [
          {
            label: "Vendas (R$)",
            data: [120000, 110000, 95000, 90000, 85000, 80000, 78000],
            backgroundColor: "#8faaa3",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#566363", callback: (val) => `R$ ${val.toLocaleString()}` },
            grid: { color: "#e0f2f1" },
          },
          x: {
            ticks: { color: "#566363" },
            grid: { display: false },
          },
        },
      },
    });

    new Chart(vendasCategoriaRef.current, {
      type: "doughnut",
      data: {
        labels: ["Roupas", "Acessórios", "Calçados", "Eletrônicos", "Outros"],
        datasets: [
          {
            data: [300000, 150000, 120000, 100000, 80000],
            backgroundColor: ["#8faaa3", "#566363", "#abded1", "#90bebb", "#c3d5d0"],
            borderColor: "#f0f7f6",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "right", labels: { color: "#566363" } },
        },
      },
    });
  }, []);

  return (
    <div className="charts-grid">
      <div className="chart-box">
        <h3>Vendas por Dia da Semana</h3>
        <canvas ref={vendasDiaRef} />
      </div>

      <div className="chart-box">
        <h3>Fluxo de Caixa Local</h3>
        <canvas ref={fluxoCaixaRef} />
      </div>

      <div className="chart-box">
        <h3>Desempenho dos Funcionários</h3>
        <canvas ref={desempenhoFuncRef} />
      </div>

      <div className="chart-box">
        <h3>Vendas por Categoria</h3>
        <canvas ref={vendasCategoriaRef} />
      </div>
    </div>
  );
}
