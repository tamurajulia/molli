"use client";

import React from "react";
import "./cadastrar.css";
import { Search } from "lucide-react";

export default function CadastroProduto() {
  return (
    <div className="cadastro-container">
      {/* Lado esquerdo - imagem */}
      <div className="lado-esquerdo">
        <img src="/img/coelho-molli.png" alt="Molli" className="imagem-lateral" />
      </div>

      {/* Lado direito - formulário */}
      <div className="lado-direito">
        <h2 className="titulo">
          <Search size={20} className="iconeTitulo" />
          <span className="titulo-preto">Cadastro de</span>
          <span className="titulo-verde"> Produto:</span>
        </h2>

        <hr className="linha" />

        <form className="formulario">
          <div className="campo">
            <label>Nome do produto:</label>
            <input type="text" placeholder="INSIRA O NOME COMPLETO" />
          </div>

          <div className="linha-dupla">
            <div className="campo metade">
              <label>Categoria:</label>
              <input type="text" placeholder="SELECIONE A CATEGORIA" />
            </div>
            <div className="campo metade">
              <label>Código de barras:</label>
              <input type="text" placeholder="INSIRA O CÓDIGO" />
            </div>
          </div>

          <div className="campo">
            <label>Fornecedor:</label>
            <input type="text" placeholder="SELECIONE O FORNECEDOR" />
          </div>

          <div className="campo">
            <label>Preço:</label>
            <input type="text" placeholder="INSIRA O VALOR" />
          </div>

          <div className="rodape">
            <span className="logo">Molli</span>
            <button type="submit" className="botao">Criar Produto</button>
          </div>
        </form>
      </div>
    </div>
  );
}
