"use client";

import React from "react";
import "./cadastrar.css";
import { Building2 } from "lucide-react";

export default function CadastroFornecedor() {
  return (
    <div className="cadastro-container">
      <h2 className="titulo">
        <Building2 className="iconeTitulo" size={22} />
        <span className="titulo-preto">Cadastro de</span>
        <span className="titulo-verde"> Fornecedores</span>
      </h2>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <div className="campo">
          <label>Nome do fornecedor:</label>
          <input type="text" placeholder="INSIRA O NOME DO FORNECEDOR" />
        </div>

        <div className="campo">
          <label>Endereço:</label>
          <input type="text" placeholder="INSIRA O ENDEREÇO" />
        </div>

        <div className="campo">
          <label>Produtos fornecidos:</label>
          <input type="text" placeholder="INSIRA OS PRODUTOS" />
        </div>

        <div className="linha tres-colunas">
          <div className="campo">
            <label>CNPJ:</label>
            <input type="text" placeholder="INSIRA O CNPJ" />
          </div>

          <div className="campo">
            <label>Telefone:</label>
            <input type="text" placeholder="INSIRA O TELEFONE" />
          </div>

          <div className="campo">
            <label>Email:</label>
            <input type="email" placeholder="INSIRA O EMAIL" />
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
