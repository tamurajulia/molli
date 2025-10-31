"use client";

import React from "react";
import "./cadastro.css";
import { Users, Mail } from "lucide-react";

export default function CadastroFuncionario() {
    return (
      <div className="cadastro-container">
        <h2 className="titulo">
          <Users className="iconeTitulo" size={22} />
          <span className="titulo-preto">Cadastro de</span>
          <span className="titulo-verde"> Funcionários</span>
        </h2>
  
        <form className="formulario" onSubmit={(e) => e.preventDefault()}>
          <div className="campo">
            <label>Nome completo:</label>
            <input type="text" placeholder="INSIRA O NOME COMPLETO" />
          </div>
  
          <div className="linha tres-colunas">
            <div className="campo">
              <label>Salário:</label>
              <input type="text" placeholder="INSIRA O SALÁRIO" />
            </div>
  
            <div className="campo">
              <label>CPF:</label>
              <input type="text" placeholder="INSIRA O CPF" />
            </div>
  
            <div className="campo">
              <label>Cargo:</label>
              <input type="text" placeholder="INSIRA O CARGO" />
            </div>
          </div>
  
          <div className="campo iconeEmail">
            <label>Email:</label>
            <div className="inputIcone">
              <input type="email" placeholder="INSIRA O EMAIL" />
              <Mail className="icone-email" size={18} />
            </div>
          </div>
  
          <div className="campo">
            <label>Filial vinculada:</label>
            <input type="text" placeholder="INSIRA A FILIAL" />
          </div>
  
          <div className="rodape">
            <span className="logo">Molli</span>
            <button type="submit" className="botao-criar">Criar</button>
          </div>
        </form>
      </div>
    );
  }