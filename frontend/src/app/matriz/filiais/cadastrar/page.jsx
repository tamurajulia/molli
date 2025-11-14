"use client";

import React from "react";
import "./cadastro.css";

export default function CadastroFilial() {
  return (
    <div className="cadastro-filial-container">
      <div className="lado-esquerdo">
        <img src="/img/molli-loja.png" alt="Loja Molli" className="imagem-loja" />
      </div>
      <div className="lado-direito">
        <h2 className="titulo">
          Cadastre sua <span className="titulo-destaque">filial</span>
        </h2>
        <p className="subtitulo">preencha os dados abaixo</p>

        <form className="formulario-filial">
          <div className="campo">
            <input type="text" placeholder="Nome da filial" />
          </div>

          <div className="linha-dupla">
            <input type="text" placeholder="CNPJ" />
            <input type="text" placeholder="Telefone" />
          </div>

          <div className="linha-dupla">
            <input type="text" placeholder="Gerente" />
            <input type="date" placeholder="Data de abertura" />
          </div>

          <div className="campo">
            <input type="text" placeholder="Endereço" />
          </div>

          <button type="submit" className="botao-cadastrar">Cadastrar loja</button>
        </form>
      </div>
    </div>
  );
}
