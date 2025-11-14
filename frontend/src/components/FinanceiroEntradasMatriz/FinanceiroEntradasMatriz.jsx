"use client";

import { ChartNoAxesCombined, Edit3 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./financeiroMatriz.css";

export default function FinanceiroEntradaMatriz() {
  const router = useRouter();

  // Lista geral de entradas (todas as lojas)
  const [dadosEntradas] = useState([
    {
      id: "01",
      loja: "Loja Centro",
      data: "2025-10-01",
      descricao: "Venda balcão",
      valor: 350.0,
      formaPagamento: "Cartão Crédito",
      tipoEntrada: "Venda",
      pedidoId: "PED-4587",
      Registro: "João Almeida",
    },
    {
      id: "02",
      loja: "Loja Norte",
      data: "2025-10-01",
      descricao: "Pedido Delivery",
      valor: 620.0,
      formaPagamento: "Pix",
      tipoEntrada: "Pedido",
      pedidoId: "PED-4621",
      Registro: "Mariana Costa",
    },
    {
      id: "03",
      loja: "Loja Sul",
      data: "2025-10-02",
      descricao: "Mensalidade Plano VIP",
      valor: 500.0,
      formaPagamento: "Cartão Débito",
      tipoEntrada: "Mensalidade",
      pedidoId: null,
      caixa: "CX-01",
      Registro: "Carlos Pinto",
      observacao: "Renovação anual",
    },
    {
      id: "04",
      loja: "Loja Centro",
      data: "2025-10-02",
      descricao: "Ajuste de Caixa",
      valor: 120.0,
      formaPagamento: "Dinheiro",
      tipoEntrada: "Ajuste",
      pedidoId: null,
      caixa: "CX-03",
      Registro: "Larissa Melo",
      observacao: "Diferença de conferência",
    },
    {
      id: "05",
      loja: "Loja Oeste",
      data: "2025-10-03",
      descricao: "Venda balcão",
      valor: 890.0,
      formaPagamento: "Cartão Crédito",
      tipoEntrada: "Venda",
      pedidoId: "PED-4710",
      caixa: "CX-02",
      Registro: "Beatriz Ramos",
      observacao: "",
    },
  ]);

  // Filtros
  const [filtroLoja, setFiltroLoja] = useState("");
  const [filtroRegistro, setFiltroRegistro] = useState("");
  const [filtroValor, setFiltroValor] = useState("");
  const [entradasFiltradas, setEntradasFiltradas] = useState(dadosEntradas);

  const filtrarEntradas = () => {
    let filtradas = dadosEntradas;

    if (filtroLoja) {
      filtradas = filtradas.filter((item) =>
        item.loja.toLowerCase().includes(filtroLoja.toLowerCase())
      );
    }

    if (filtroRegistro) {
      filtradas = filtradas.filter((item) =>
        item.Registro.toLowerCase().includes(filtroRegistro.toLowerCase())
      );
    }

    if (filtroValor) {
      filtradas = filtradas.filter((item) =>
        item.valor.toString().includes(filtroValor)
      );
    }

    setEntradasFiltradas(filtradas);
  };

  const irParaEdicao = (id) => {
    router.push(`/financeiro/entradas/editar/${id}`);
  };

  

  return (
    <div className="container">
      {/* ======== TÍTULO + SOMATÓRIO ======== */}
      <h2 className="titulo d-flex align-items-center gap-2 mb-2">
        <ChartNoAxesCombined className="iconeTitulo" size={22} />
        <span className="titulo-preto">Entradas de Todas as</span>
        <span className="titulo-preto1">Lojas:</span>
      </h2>

   
    

      {/* ======== FILTROS ======== */}
      <div className="filtros mt-4">
        <div className="campo">
          <label className="tituloinput">Filtrar por Loja:</label>
          <input
            type="text"
            placeholder="Ex: Loja Centro"
            className="inputFocus"
            value={filtroLoja}
            onChange={(e) => setFiltroLoja(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloinput">Registro Funcionário:</label>
          <input
            type="text"
            placeholder="Ex: João"
            className="inputFocus"
            value={filtroRegistro}
            onChange={(e) => setFiltroRegistro(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloinput">Valor:</label>
          <input
            type="text"
            placeholder="Ex: 150"
            className="inputFocus"
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
          />
        </div>

        <button className="btnFiltrarMatriz" onClick={filtrarEntradas}>
          Filtrar
        </button>
      </div>

      {/* ======= TABELA COMPLETA ======= */}
      <h3 className="subtituloMatriz mt-4">Entradas</h3>

      <div className="tabelaContainer">
        <table className="tabelaMatriz table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Loja</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Forma Pgto</th>
              <th>Valor</th>
              <th>Pedido</th>
              <th>Registro</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {entradasFiltradas.length > 0 ? (
              entradasFiltradas.map((item) => (
                <tr key={item.id}>
                  <td>{item.loja}</td>
                  <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                  <td>{item.descricao}</td>
                  <td>{item.tipoEntrada}</td>
                  <td>{item.formaPagamento}</td>
                  <td>R$ {item.valor.toFixed(2)}</td>
                  <td>{item.pedidoId ?? "-"}</td>
                  <td>{item.Registro}</td>

                  <td className="text-center">
                    <Edit3
                      className="iconeMatriz text-secondary"
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
                <td colSpan="9" className="text-center text-muted">
                  Nenhuma entrada encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARDS MOBILE --- */}
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
                <strong>Valor:</strong> R$ {item.valor.toFixed(2)}
              </div>
              <div className="linha-info">
                <strong>Registro Funcionário:</strong> <span>{item.Registro}</span>
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
