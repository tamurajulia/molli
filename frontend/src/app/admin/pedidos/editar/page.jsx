"use client";

import React from "react";
import "./editar.css";
import { ShoppingBag } from "lucide-react";

export default function CadastrarPedido() {
  return (
    <div className="cadastroContainer">
      <h2 className="titulo">
        <ShoppingBag size={24} className="iconeTitulo" />
        <span>Editar o <strong>Pedido</strong> :</span>
      </h2>

      <form className="formulario">
        <div className="campo">
          <label>N° da Venda:</label>
          <input type="text" placeholder="Insira o número da venda" />
        </div>

        <div className="campo">
          <label>Vendedor:</label>
          <input type="text" placeholder="Insira o nome do vendedor" />
        </div>

        <div className="campo">
          <label>Cliente:</label>
          <input type="text" placeholder="Insira o nome do cliente" />
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>Valor total:</label>
            <input type="text" placeholder="Insira o valor total" />
          </div>

          <div className="campo pequeno">
            <label>Quantidade:</label>
            <input type="number" placeholder="Insira a quantidade" />
          </div>
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>Status:</label>
            <input type="text" placeholder="Ex: Pendente, Concluído..." />
          </div>

          <div className="campo pequeno">
            <label>Data da venda:</label>
            <input type="date" />
          </div>
        </div>

        <button type="submit" className="botao">
          Concluir
        </button>
      </form>
    </div>
  );
}
