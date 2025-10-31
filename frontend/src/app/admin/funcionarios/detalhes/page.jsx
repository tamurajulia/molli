"use client";

import React from "react";
import "./detalhes.css";
import { UserRound } from "lucide-react"; // Ícone do título

export default function DetalhesFuncionario() {
  return (
    <div className="detalhes-container">
      <h2 className="detalhes-titulo">
        <UserRound size={22} />
        <strong>Detalhes do</strong> <span>funcionário</span>
      </h2>

      <div className="detalhes-grid">
        <div className="campo">
          <label>Nome:</label>
          <input type="text" placeholder="insira o nome completo" disabled />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="insira o email" disabled />
        </div>

        <div className="campo">
          <label>Telefone:</label>
          <input type="text" placeholder="insira o telefone" disabled />
        </div>

        <div className="campo">
          <label>CNH:</label>
          <input type="text" placeholder="insira o número da CNH" disabled />
        </div>

        <div className="campo">
          <label>Salário:</label>
          <input type="text" placeholder="insira o salário" disabled />
        </div>

        <div className="campo">
          <label>Função:</label>
          <input type="text" placeholder="insira a função" disabled />
        </div>

        <div className="campo campo-funcao">
          <label>Descrição da função:</label>
          <input type="text" placeholder="detalhe as responsabilidades do cargo" disabled />
        </div>
      </div>
    </div>
  );
}
