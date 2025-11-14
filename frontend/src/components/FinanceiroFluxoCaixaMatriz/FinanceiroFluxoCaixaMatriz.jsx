
import React, { useMemo, useState } from "react";
import { TrendingUp, ShoppingCart, FileText, HelpCircle, Calendar, Landmark, Home } from "lucide-react";



export default function DashboardFluxoCaixaMatriz() {
  const [selectedBranch, setSelectedBranch] = useState("Matriz");
  const [period, setPeriod] = useState("mensal");
  const [showModal, setShowModal] = useState(false);

  // Exemplo de filiais com dados resumidos
  const branches = [
    { id: "Matriz", label: "Matriz", color: "bg-emerald-500" },
    { id: "Filial A", label: "Filial A", color: "bg-cyan-500" },
    { id: "Filial B", label: "Filial B", color: "bg-rose-500" },
    { id: "Filial C", label: "Filial C", color: "bg-indigo-500" },
  ];

  const sampleData = useMemo(() => {
    // Gerar dados por filial (semana)
    const base = {
      "Matriz": [2900, 3200, 2800, 4000, 3600, 4200, 3900],
      "Filial A": [1200, 1500, 1400, 1600, 1700, 1800, 1750],
      "Filial B": [900, 1100, 1000, 1300, 1250, 1400, 1350],
      "Filial C": [700, 900, 850, 1200, 1100, 1150, 1250],
    };
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    return days.map((d, i) => ({
      day: d,
      Matriz: base.Matriz[i],
      "Filial A": base["Filial A"][i],
      "Filial B": base["Filial B"][i],
      "Filial C": base["Filial C"][i],
    }));
  }, []);

  const totals = useMemo(() => {
    // somar por filial
    return branches.reduce((acc, b) => {
      const sum = sampleData.reduce((s, row) => s + (row[b.id] || 0), 0);
      acc[b.id] = sum;
      return acc;
    }, {});
  }, [branches, sampleData]);

  const overallTotal = Object.values(totals).reduce((s, v) => s + v, 0);

  return (
    <div className="p-6 min-h-screentext-slate-800">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <TrendingUp size={20} />
          </div>
          <div>
          <h2 className="titulo d-flex align-items-center gap-2 ">
        
        <span className="titulo-preto">Entradas de Todas as</span>
        <span className="titulo-preto1">Lojas:</span>
      </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="rounded-md border px-3 py-2 bg-white shadow-sm"
          >
            <option value="Matriz">Matriz (Consolidado)</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-md border px-3 py-2 bg-white shadow-sm"
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-white px-3 py-2 shadow-sm flex items-center gap-2"
            title="Ajuda"
          >
            <HelpCircle size={16} />
            <span className="text-sm">Ajuda</span>
          </button>
        </div>
      </header>

      {/* Top cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Consolidado" value={`R$ ${formatNumber(overallTotal)}`} icon={<Landmark size={20} />} foot="Últimos 7 dias" />
        <Card title="Transações" value={`1.245`} icon={<ShoppingCart size={20} />} foot="Hoje: 312" />
        <Card title="Relatórios" value={`Exportar`} icon={<FileText size={20} />} foot={<ExportControls />} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Charts and branch cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Gráfico de Vendas</h3>
              <div className="text-sm text-slate-500">Período: {period}</div>
            </div>
            <div className="flex gap-6 items-start flex-col md:flex-row">
              <div className="flex-1">
                <LineSpark data={sampleData} branch={selectedBranch} branches={branches} />
              </div>
              <div className="w-full md:w-56">
                <h4 className="text-sm font-medium mb-2">Filiais</h4>
                <div className="space-y-3">
                  {branches.map((b) => (
                    <div key={b.id} className="flex items-center justify-between bg-slate-50 rounded-md p-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${b.color}`} />
                        <div>
                          <div className="text-sm font-medium">{b.label}</div>
                          <div className="text-xs text-slate-500">Total: R$ {formatNumber(totals[b.id])}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">{b.id === selectedBranch ? "Ativa" : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Comparativo por Filial (Barra)</h3>
            <BarGrouped data={sampleData} branches={branches} />
          </div>

        </div>

        {/* Right: Calendar + resumo por filial */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Calendário</h3>
              <div className="text-sm text-slate-500">Dezembro 2019</div>
            </div>
            <SmallCalendar />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Resumo por Filial</h3>
            <div className="space-y-3">
              {branches.map((b) => (
                <div key={b.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${b.color}`} />
                    <div>
                      <div className="text-sm">{b.label}</div>
                      <div className="text-xs text-slate-500">Transações: {Math.round(totals[b.id] / 100)}</div>
                    </div>
                  </div>
                  <div className="font-semibold">R$ {formatNumber(totals[b.id])}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <FileText size={18} />
              <h3 className="text-lg font-semibold">Como gerar relatórios</h3>
            </div>
            <ol className="list-decimal list-inside text-sm space-y-2 text-slate-600">
              <li>Escolha o período e a filial (ou consolidado).</li>
              <li>Selecione o formato (PDF / Excel / CSV).</li>
              <li>Clique em <strong>Exportar</strong> para baixar.</li>
            </ol>
            <div className="mt-6 text-right">
              <button className="px-4 py-2 rounded-md bg-slate-100" onClick={() => setShowModal(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Card({ title, value, icon, foot }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded p-2 bg-slate-50">{icon}</div>
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
      </div>
      <div className="text-sm text-slate-400">{foot}</div>
    </div>
  );
}

function ExportControls() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-sm">PDF</button>
      <button className="px-3 py-1 rounded bg-slate-50 text-slate-700 text-sm">CSV</button>
    </div>
  );
}

function formatNumber(n) {
  if (!n && n !== 0) return "0,00";
  return n.toLocaleString('pt-BR');
}

// --- Simple line chart (SVG) ---
function LineSpark({ data, branch, branches }) {
  // data: [{day, Matriz, 'Filial A', ...}, ...]
  const width = 680;
  const height = 160;

  const series = (branch === "Matriz")
    ? branches.map((b) => ({ id: b.id, values: data.map((d) => d[b.id]) }))
    : [{ id: branch, values: data.map((d) => d[branch]) }];

  const maxY = Math.max(...series.flatMap((s) => s.values));
  const stepX = width / (data.length - 1);

  const makePath = (values) => {
    return values.map((v, i) => {
      const x = i * stepX;
      const y = height - (v / maxY) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');
  };

  const colorMap = ["#6c9087", "#f59e0b", "#ef4444", "#6366f1"];

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* grid */}
        {[0,1,2,3,4].map((i) => (
          <line key={i} x1={0} x2={width} y1={(height/4)*i} y2={(height/4)*i} stroke="#eef2f7" strokeWidth={1} />
        ))}

        {/* series */}
        {series.map((s, idx) => (
          <g key={s.id}>
            <path d={makePath(s.values)} fill="none" stroke={colorMap[idx % colorMap.length]} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            {s.values.map((v, i) => (
              <circle key={i} cx={i*stepX} cy={height - (v/maxY)*height} r={3.5} fill={colorMap[idx % colorMap.length]} />
            ))}
          </g>
        ))}
      </svg>

      <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
        {data.map((d) => <div key={d.day}>{d.day}</div>)}
      </div>
    </div>
  );
}

// --- Grouped bar chart ---
function BarGrouped({ data, branches }) {
  const width = 680;
  const height = 140;
  const days = data.map(d => d.day);

  // For each day, compute group bars (one per branch)
  const maxY = Math.max(...data.flatMap((row) => branches.map((b) => row[b.id] || 0)));
  const groupWidth = width / data.length;
  const barWidth = Math.max(6, (groupWidth - 8) / branches.length);

  const colors = ["#6c9087", "#f59e0b", "#ef4444", "#6366f1"];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {[0,1,2,3].map((i) => (
          <line key={i} x1={0} x2={width} y1={(height/4)*i} y2={(height/4)*i} stroke="#f1f5f9" strokeWidth={1} />
        ))}

        {data.map((row, dayIdx) => (
          <g key={row.day}>
            {branches.map((b, j) => {
              const value = row[b.id] || 0;
              const x = dayIdx * groupWidth + 4 + j * barWidth;
              const h = (value / maxY) * (height - 10);
              const y = height - h;
              return (
                <rect key={b.id} x={x} y={y} width={barWidth - 2} height={h} rx={3} fill={colors[j % colors.length]} />
              );
            })}
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
        {days.map((d) => <div key={d}>{d}</div>)}
      </div>
    </div>
  );
}

// --- Simple calendar visual (non-interactive) ---
function SmallCalendar() {
  const weeks = [
    [24,25,26,27,28,29,30],
    [1,2,3,4,5,6,7],
    [8,9,10,11,12,13,14],
    [15,16,17,18,19,20,21],
    [22,23,24,25,26,27,28],
    [29,30,31,null,null,null,null]
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1 text-xs text-center text-slate-500 mb-2">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((d, i) => (
          <div key={i} className={`min-h-[36px] rounded-md flex items-center justify-center ${d===20? 'bg-emerald-100 font-semibold' : 'bg-transparent'} text-sm`}>{d || ''}</div>
        ))}
      </div>
    </div>
  );
}
