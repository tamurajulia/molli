"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./charts.css";

export default function Charts() {
  const vendasRef = useRef(null);
  const fluxoRef = useRef(null);
  const categoriaRef = useRef(null);
  const heatmapRef = useRef(null);
  const contasRef = useRef(null);

  const [lojaSelecionada, setLojaSelecionada] = useState("Todas");

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const hours = [
    "08h", "09h", "10h", "11h", "12h", "13h",
    "14h", "15h", "16h", "17h", "18h"
  ];

  const heatmapData = [
    [10, 15, 20, 35, 50, 55, 60, 65, 80, 90, 100],
    [5, 10, 20, 30, 45, 55, 60, 62, 78, 88, 95],
    [8, 14, 18, 25, 40, 53, 58, 63, 75, 85, 92],
    [12, 18, 22, 34, 48, 56, 61, 66, 82, 93, 99],
    [7, 13, 19, 29, 43, 54, 59, 64, 77, 87, 91],
    [6, 11, 17, 27, 42, 52, 57, 62, 76, 86, 90],
    [9, 15, 21, 33, 47, 55, 60, 65, 81, 89, 97],
  ];

  const scatterPoints = [];
  for (let y = 0; y < days.length; y++) {
    for (let x = 0; x < hours.length; x++) {
      scatterPoints.push({ x: hours[x], y: days[y], v: heatmapData[y][x] });
    }
  }

  function getColor(value) {
    if (value > 80) return "#566363";
    if (value > 60) return "#8faaa3";
    if (value > 40) return "#90bebb";
    return "#abded1";
  }

  const fluxoDados = {
    Todas: {
      entradas: [200000, 210000, 250000, 230000, 240000, 260000],
      saidas: [150000, 160000, 170000, 180000, 175000, 190000],
    },
    "Loja A": {
      entradas: [80000, 85000, 90000, 87000, 95000, 97000],
      saidas: [60000, 62000, 64000, 65000, 67000, 70000],
    },
    "Loja B": {
      entradas: [60000, 62000, 70000, 68000, 72000, 75000],
      saidas: [45000, 46000, 47000, 49000, 50000, 52000],
    },
    "Loja C": {
      entradas: [40000, 43000, 46000, 45000, 47000, 49000],
      saidas: [35000, 36000, 37000, 38000, 39000, 40000],
    },
    "Loja D": {
      entradas: [20000, 21000, 23000, 24000, 26000, 27000],
      saidas: [15000, 16000, 17000, 18000, 19000, 20000],
    },
  };

  useEffect(() => {
   
    Chart.getChart(vendasRef.current)?.destroy();
    Chart.getChart(fluxoRef.current)?.destroy();
    Chart.getChart(categoriaRef.current)?.destroy();
    Chart.getChart(heatmapRef.current)?.destroy();
    Chart.getChart(contasRef.current)?.destroy();

    new Chart(vendasRef.current, {
      type: "bar",
      data: {
        labels: ["Loja A", "Loja B", "Loja C", "Loja D"],
        datasets: [
          {
            label: "Vendas (R$)",
            data: [400000, 300000, 250000, 100000],
            backgroundColor: "#8faaa3",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (val) => `R$ ${val.toLocaleString()}`, color: "#566363" },
            grid: { color: "#e0f2f1" },
          },
          x: { ticks: { color: "#566363" }, grid: { display: false } },
        },
      },
    });

    const fluxo = fluxoDados[lojaSelecionada];
    new Chart(fluxoRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Entradas (R$)",
            data: fluxo.entradas,
            borderColor: "#8faaa3",
            backgroundColor: "rgba(143,170,163,0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 5,
          },
          {
            label: "Saídas (R$)",
            data: fluxo.saidas,
            borderColor: "#566363",
            backgroundColor: "rgba(86,99,99,0.15)",
            fill: true,
            tension: 0.3,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#566363" } } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => `R$ ${v.toLocaleString()}` } },
          x: { ticks: { color: "#566363" } },
        },
      },
    });

    new Chart(categoriaRef.current, {
      type: "doughnut",
      data: {
        labels: ["Roupas", "Acessórios", "Cuidados", "Conforto"],
        datasets: [
          {
            data: [500000, 200000, 300000, 150000],
            backgroundColor: ["#8faaa3", "#566363", "#abded1", "#90bebb"],
          },
        ],
      },
      options: { plugins: { legend: { position: "right", labels: { color: "#566363" } } } },
    });

    new Chart(heatmapRef.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Vendas por Dia e Horário",
            data: scatterPoints.map((p) => ({ x: p.x, y: p.y, v: p.v })),
            pointBackgroundColor: scatterPoints.map((p) => getColor(p.v)),
            pointRadius: 10,
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 1.6,
        scales: {
          x: { type: "category", labels: hours, ticks: { color: "#566363" } },
          y: { type: "category", labels: days, reverse: true, ticks: { color: "#566363" } },
        },
        plugins: { legend: { display: false } },
      },
    });

    new Chart(contasRef.current, {
      type: "bar",
      data: {
        labels: ["Fornecedores", "Salários", "Aluguel", "Marketing", "Outros"],
        datasets: [
          {
            label: "Contas a Pagar (R$)",
            data: [85000, 120000, 40000, 25000, 15000],
            backgroundColor: "#90bebb",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true }, x: { grid: { display: false } } },
      },
    });
  }, [lojaSelecionada]);

  return (
    <>
      <div className="chartsGrid">
        <div className="filtroLoja">
          <label>Filtrar por Loja:</label>
          <select value={lojaSelecionada} onChange={(e) => setLojaSelecionada(e.target.value)}>
            <option>Todas</option>
            <option>Loja A</option>
            <option>Loja B</option>
            <option>Loja C</option>
            <option>Loja D</option>
          </select>
        </div>

        <div className="chartSection">
          <h2>Vendas por Filial</h2>
          <canvas ref={vendasRef} />
        </div>

        <div className="chartSection">
          <h2>Fluxo de Caixa ({lojaSelecionada})</h2>
          <canvas ref={fluxoRef} />
        </div>

        <div className="chartSection">
          <h2>Vendas por Categoria</h2>
          <canvas ref={categoriaRef} />
        </div>

        <div className="chartSection">
          <h2>Heatmap de Vendas (Dia/Hora)</h2>
          <canvas ref={heatmapRef} />
        </div>

      </div>
      <div className="contasPagamentosWrapper flex flex-col gap-y-8 ps-5 pe-5">
        <div className="chartSection">
          <h2>Contas a Pagar</h2>
          <canvas ref={contasRef} />
        </div>

        <div className="chartSection">
          <h2>Controle de Pagamentos</h2>
          <table className="tabela-pagamentos">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Fornecedor X</td><td>R$ 35.000</td><td>10/10/2025</td><td className="pago">Pago</td></tr>
              <tr><td>Folha Salarial</td><td>R$ 120.000</td><td>05/10/2025</td><td className="pendente">Pendente</td></tr>
              <tr><td>Aluguel Loja B</td><td>R$ 40.000</td><td>15/10/2025</td><td className="atrasado">Atrasado</td></tr>
              <tr><td>Marketing</td><td>R$ 25.000</td><td>20/10/2025</td><td className="pago">Pago</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
