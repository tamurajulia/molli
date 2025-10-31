"use client";

import React from "react";
import "./cadastro.css";
import { Boxes } from "lucide-react";

export default function CadastroEstoque() {
  return (
    <div className="cadastro-container">
      <h2 className="titulo">
        <Boxes className="iconeTitulo" size={22} />
        <span className="titulo-preto">Cadastro de</span>
        <span className="titulo-verde"> Estoque</span>
      </h2>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <div className="campo">
          <label>Produto:</label>
          <input type="text" placeholder="INSIRA O NOME DO PRODUTO" />
        </div>

        <div className="linha tres-colunas">
          <div className="campo">
            <label>Categoria:</label>
            <input type="text" placeholder="INSIRA A CATEGORIA" />
          </div>

          <div className="campo">
            <label>Origem:</label>
            <input type="text" placeholder="INSIRA A ORIGEM" />
          </div>

          <div className="campo">
            <label>Status:</label>
            <input type="text" placeholder="INSIRA O STATUS" />
          </div>
        </div>

        <div className="linha tres-colunas">
          <div className="campo">
            <label>Estoque atual:</label>
            <input type="number" placeholder="INSIRA A QUANTIDADE" />
          </div>

          <div className="campo">
            <label>Preço:</label>
            <input type="text" placeholder="INSIRA O PREÇO" />
          </div>

          <div className="campo">
            <label>ID:</label>
            <input type="text" placeholder="INSIRA O ID" />
          </div>
        </div>

        <div className="rodape">
          <span className="logo">Molli</span>
          <button type="submit" className="botao-criar">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
