"use client";

import React from "react";
import "./cadastrar.css";
import { ShoppingBag, DollarSign } from "lucide-react";

export default function CadastroPedido() {
  return (
    <div className="cadastro-container">
      <h2 className="titulo">
        <ShoppingBag className="iconeTitulo" size={22} />
        <span className="titulo-preto">Cadastro de</span>
        <span className="titulo-verde"> Pedidos</span>
      </h2>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <div className="campo">
          <label>N° da Venda:</label>
          <input type="text" placeholder="INSIRA O NÚMERO DA VENDA" />
        </div>

        <div className="linha tres-colunas">
          <div className="campo">
            <label>Vendedor:</label>
            <input type="text" placeholder="INSIRA O NOME DO VENDEDOR" />
          </div>

          <div className="campo">
            <label>Valor Total:</label>
            <input type="text" placeholder="INSIRA O VALOR TOTAL" />
          </div>

          <div className="campo">
            <label>Quantidade:</label>
            <input type="number" placeholder="INSIRA A QUANTIDADE" />
          </div>
        </div>

        <div className="linha tres-colunas">
          <div className="campo">
            <label>Status:</label>
            <input type="text" placeholder="INSIRA O STATUS DO PEDIDO" />
          </div>

          <div className="campo">
            <label>Data do Pedido:</label>
            <input type="date" />
          </div>

          <div className="campo">
            <label>Forma de Pagamento:</label>
            <input type="text" placeholder="INSIRA A FORMA DE PAGAMENTO" />
          </div>
        </div>

        <div className="rodape">
          <span className="logo">Molli</span>
          <button type="submit" className="botao-criar">Criar</button>
        </div>
      </form>
    </div>
  );
}
