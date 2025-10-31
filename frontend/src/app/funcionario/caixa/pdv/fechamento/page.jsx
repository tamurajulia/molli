"use client";

import React from "react";
import { Printer, Download } from "lucide-react";
import "./fechamento.css";

export default function FechamentoCaixa() {
  return (
    <div className="fechamento-container">
      {/* --- TÍTULO --- */}
      <div className="titulo">
        <img
          src="/IMG/icones/caixa.png"
          alt="Ícone caixa"
          className="icone-caixa"
        />
        <h1>
          Fechamento <span>do caixa</span>
        </h1>
      </div>

      {/* --- RESUMO DO DIA --- */}
      <div className="card">
        <div className="card-header">
          <span className="esquerda">Resumo do dia</span>
          <span className="direita">01/03/2025</span>
        </div>

        <div className="card-body">
          <div className="linha">
            <div className="col">
              <p>Total de vendas</p>
              <h2>R$1.002,99</h2>
            </div>
            <div className="col">
              <p>Qnt de vendas</p>
              <h2>23</h2>
            </div>
            <div className="col">
              <p>Tiket médio</p>
              <h2>R$199,00</h2>
            </div>
          </div>
        </div>
      </div>

      {/* --- FORMA DE PAGAMENTO --- */}
      <div className="card">
        <div className="card-header">
          <span className="esquerda">Forma de pagamento</span>
        </div>

        <div className="card-body">
          {/* Cabeçalho de colunas */}
          <div className="linha cabecalho-forma">
            <div className="col">
              <p>Forma</p>
            </div>
            <div className="col">
              <p>Valor total</p>
            </div>
            <div className="col">
              <p>Qnt transação</p>
            </div>
          </div>

          {/* Cartão de crédito */}
          <div className="linha">
            <div className="col">
              <p>Cartão de crédito</p>
            </div>
            <div className="col">
              <h2>R$199,00</h2>
            </div>
            <div className="col">
              <h2>23</h2>
            </div>
          </div>

          {/* Cartão de débito */}
          <div className="linha">
            <div className="col">
              <p>Cartão de débito</p>
            </div>
            <div className="col">
              <h2>R$350,00</h2>
            </div>
            <div className="col">
              <h2>14</h2>
            </div>
          </div>

          {/* Pix */}
          <div className="linha">
            <div className="col">
              <p>Pix</p>
            </div>
            <div className="col">
              <h2>R$453,99</h2>
            </div>
            <div className="col">
              <h2>9</h2>
            </div>
          </div>

          {/* Total geral */}
          <div className="linha total-geral">
            <div className="col">
              <p><strong>Total geral</strong></p>
            </div>
            <div className="col">
              <h2><strong>R$1.002,99</strong></h2>
            </div>
            <div className="col">
              <h2><strong>46</strong></h2>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTÕES --- */}
      <div className="botoes">
        <button className="btn-relatorio">
          <Printer size={18} />
          Imprimir relatório
          <Download size={18} className="icone-baixar" />
        </button>

        <button className="btn-finalizar">Finalizar caixa</button>
      </div>
    </div>
  );
}
