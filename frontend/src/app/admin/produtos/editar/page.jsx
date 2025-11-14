"use client";

import React from "react";
import "./editar.css";
import { Package } from "lucide-react";

export default function EditarProduto() {
  return (
    <div className="cadastroContainer">
      <h2 className="titulo">
        <Package size={24} className="iconeTitulo" />
        <span>Editar o <strong>Produto</strong> :</span>
      </h2>

      <form className="formulario">
        <div className="campo">
          <label>Nome do produto:</label>
          <input type="text" placeholder="Insira o nome do produto" />
        </div>

        <div className="campo">
          <label>Estoque:</label>
          <input type="text" placeholder="Insira o fornecedor" />
        </div>

        <div className="campo">
          <label>Categoria:</label>
          <input type="text" placeholder="Insira a categoria" />
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>Preço Custo:</label>
            <input type="number" placeholder="Quantidade em estoque" />
          </div>

          <div className="campo pequeno mt-5">
            <label>Preço Venda:</label>
            <input type="text" placeholder="Insira o preço" />
          </div>
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>SKU:</label>
            <input type="text" placeholder="Insira o código de barras" />
          </div>

      
        </div>

        <button type="submit" className="botao">
          Concluir
        </button>
      </form>
    </div>
  );
}
