"use client";

import { ChartNoAxesCombined, Edit3 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FinanceiroFornecedor = () => {
  const router = useRouter();

  const dadosFornecedores = [
    { id: "01", data: "01/10/2025", vencimento: "10/10/2025", fornecedor: "Mimos Baby", descricao: "Compra de mantas infantis", valor: "R$ 1.200,00", status: "Pago", metodo: "PIX" },
    { id: "02", data: "03/10/2025", vencimento: "13/10/2025", fornecedor: "Cartes Distribuidora", descricao: "Reposição de bodies", valor: "R$ 950,00", status: "Pendente", metodo: "Boleto" },
    { id: "03", data: "06/10/2025", vencimento: "15/10/2025", fornecedor: "Rihappy Suprimentos", descricao: "Compra de brinquedos", valor: "R$ 2.300,00", status: "Pago", metodo: "Transferência" },
    { id: "04", data: "09/10/2025", vencimento: "14/10/2025", fornecedor: "Bebê & Cia", descricao: "Compra de roupinhas RN", valor: "R$ 1.050,00", status: "Atrasado", metodo: "Boleto" },
  ];

  const [fornecedores] = useState(dadosFornecedores);
  const [filtroValor, setFiltroValor] = useState("");
  const [filtroMetodo, setFiltroMetodo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState(dadosFornecedores);

  // Função que converte uma string de valor (pt-BR ou genérica) para Number (reais)
  const parseValorParaNumero = (valorStr) => {
    if (!valorStr && valorStr !== 0) return null;


    if (typeof valorStr === "number" && !isNaN(valorStr)) return valorStr;
    let s = String(valorStr).trim().replace(/R\$|\s/g, "");

    const hasComma = s.indexOf(",") !== -1;
    const hasDot = s.indexOf(".") !== -1;

    if (hasComma && hasDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else if (hasComma && !hasDot) {
      s = s.replace(",", ".");
    } else {
      s = s.replace(/[^\d.-]/g, "");
    }

    const n = parseFloat(s);
    return isNaN(n) ? null : n;
  };

  const aplicarFiltro = () => {
    const filtroValorNum = parseValorParaNumero(filtroValor);

    const filtrados = fornecedores.filter((item) => {
      const valorItemNum = parseValorParaNumero(item.valor);
      const matchValor = filtroValor
        ? ( 
            (filtroValorNum !== null && valorItemNum !== null && Math.abs(valorItemNum - filtroValorNum) < 0.001)
          )
        : true;

      const matchMetodo = filtroMetodo ? item.metodo === filtroMetodo : true;
      const matchStatus = filtroStatus ? item.status === filtroStatus : true;

      return matchValor && matchMetodo && matchStatus;
    });

    setFornecedoresFiltrados(filtrados);
  };

  const irParaEdicao = (item) => {
    router.push(`/financeiro/fornecedores/editar/${item.id}`);
  };

  return (
    <div className="container">
      {/* --- TÍTULO --- */}
      <h2 className="titulo d-flex align-items-center gap-2 mb-4">
        <ChartNoAxesCombined className="iconeTitulo" size={22} />
        <span className="titulo-preto">Financeiro dos</span>
        <span className="titulo-verde"> Fornecedores:</span>
      </h2>

      {/* --- FILTROS --- */}
      <div className="filtros mt-5 mb-4">
        <div className="campo">
          <label className="tituloinput">Valor:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: 1200 ou R$ 950"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloinput">Método:</label>
          <select
            className="form-select"
            value={filtroMetodo}
            onChange={(e) => setFiltroMetodo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="PIX">Pix</option>
            <option value="Boleto">Boleto</option>
            <option value="Transferência">Transferência</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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

        <button className="btnFiltrar" onClick={aplicarFiltro}>
          Filtrar
        </button>
      </div>

      <span className="titulofinanceiro mt-5">Histórico de Pagamentos:</span>

      {/* --- TABELA (DESKTOP/TABLET) --- */}
      <div className="tabelaContainer mt-2">
        <h3 className="subtitulo">Fornecedores</h3>
        <table className="tabela table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Vencimento</th>
              <th>Fornecedor</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Método</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresFiltrados.length > 0 ? (
              fornecedoresFiltrados.map((item) => (
                <tr key={item.id}>
                  <td>{item.data}</td>
                  <td>{item.vencimento}</td>
                  <td>{item.fornecedor}</td>
                  <td>{item.descricao}</td>
                  <td>{item.valor}</td>
                  <td className={`${
                      item.status === "Pago"
                        ? "text-success"
                        : item.status === "Atrasado"
                        ? "text-danger"
                        : "text-warning"
                    } fw-semibold`}>{item.status}</td>
                  <td>{item.metodo}</td>
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
                <td colSpan="8" className="text-center text-muted py-3">Nenhum resultado encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARDS (MOBILE) --- */}
      <div className="cardsMobile">
        {fornecedoresFiltrados.length > 0 ? (
          fornecedoresFiltrados.map((item) => (
            <div className="cardFinanceiro" key={item.id}>
              <div className="linha-info"><strong>Data:</strong> <span>{item.data}</span></div>
              <div className="linha-info"><strong>Vencimento:</strong> <span>{item.vencimento}</span></div>
              <div className="linha-info"><strong>Fornecedor:</strong> <span>{item.fornecedor}</span></div>
              <div className="linha-info"><strong>Descrição:</strong> <span>{item.descricao}</span></div>
              <div className="linha-info"><strong>Valor:</strong> <span>{item.valor}</span></div>
              <div className="linha-info"><strong>Status:</strong> <span>{item.status}</span></div>
              <div className="linha-info"><strong>Método:</strong> <span>{item.metodo}</span></div>
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
          <p className="text-center text-muted mt-3">Nenhum resultado encontrado</p>
        )}
      </div>
    </div>
  );
};

export default FinanceiroFornecedor;
