"use client";

import React from "react";
import { Printer, Download } from "lucide-react";
import "./fechamento.css";

export default function FechamentoCaixa() {
  return (
    <div className="fechamento-container">
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

      <div className="card">
        <div className="card-header">
          <span className="esquerda">Forma de pagamento</span>
        </div>

        <div className="card-body">
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
