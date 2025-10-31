"use client";

import React from "react";
import "./editar.css";
import { Building2 } from "lucide-react";

export default function CadastroFornecedor() {
  return (
    <div className="cadastroContainer">
      <h2 className="titulo">
        <Building2 size={24} className="iconeTitulo" />
        <span>Editar o <strong>Fornecedor</strong> :</span>
      </h2>

      <form className="formulario">
        <div className="campo">
          <label>Nome do fornecedor:</label>
          <input type="text" placeholder="Insira o usuario" />
        </div>

        <div className="campo">
          <label>Endereço:</label>
          <input type="text" placeholder="Insira o endereço" />
        </div>

        <div className="campo">
          <label>Produtos fornecidos:</label>
          <input type="text" placeholder="Insira o produto" />
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>CNPJ:</label>
            <input type="text" placeholder="Insira o CNPJ" />
          </div>

          <div className="campo pequeno">
            <label>Telefone:</label>
            <input type="text" placeholder="Insira o senha" />
          </div>
        </div>

        <button type="submit" className="botao">
          Concluir
        </button>
      </form>
    </div>
  );
}