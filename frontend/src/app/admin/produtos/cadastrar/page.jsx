"use client";

import React from "react";
import "./cadastrar.css";
import { Search } from "lucide-react";

export default function CadastroProduto() {
  return (
    <div className="cadastro-container">
      {/* Lado esquerdo - imagem */}
      <div className="lado-esquerdo">
        <img
          src="/img/coelho-molli.png"
          alt="Molli"
          className="imagem-lateral"
        />
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
          {/* Nome do Produto */}
          <div className="campo">
            <label>Nome do produto:</label>
            <input type="text" placeholder="Insira o nome do produto" required />
          </div>

          {/* Categoria e SKU */}
          <div className="linha-dupla">
            <div className="campo metade">
              <label>Categoria:</label>
              <input type="text" placeholder="Insira a categoria" required />
            </div>
            <div className="campo metade">
              <label>SKU:</label>
              <input type="text" placeholder="Insira o código SKU" required />
            </div>
          </div>


          {/* Preço Custo e Venda */}
          <div className="linha-dupla">
            <div className="campo metade">
              <label>Preço Custo:</label>
              <input
                type="number"
                step="0.01"
                placeholder="Insira o preço do custo"
              />
            </div>
            <div className="campo metade">
              <label>Preço Venda:</label>
              <input
                type="number"
                step="0.01"
                placeholder="Insira o preço da venda"
              />
            </div>
          </div>

          {/* Estoques */}
          <div className="linha-dupla">
            <div className="campo metade">
              <label>Estoque Mínimo:</label>
              <input
                type="number"
                placeholder="Insira o estoque mínimo"
                min="0"
              />
            </div>
            <div className="campo metade">
              <label>Estoque Atual:</label>
              <input type="number" placeholder="Insira o estoque atual" />
            </div>
          </div>

          {/* Rodapé */}
          <div className="rodape">
            <span className="logo">Molli</span>
            <button type="submit" className="botao">
              Criar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
