"use client";

import React from "react";
import "./editar.css";
import { Users } from "lucide-react";

export default function EditarFuncionario() {
  return (
    <div className="cadastroContainer">
      <h2 className="titulo">
        <Users size={24} className="iconeTitulo" />
        <span>Editar o <strong>Funcionário</strong> :</span>
      </h2>

      <form className="formulario">
        <div className="campo">
          <label>Nome do funcionário:</label>
          <input type="text" placeholder="Insira o nome completo" />
        </div>

        <div className="campo">
          <label>Cargo:</label>
          <input type="text" placeholder="Insira o cargo" />
        </div>

        <div className="campo">
          <label>Filial vinculada:</label>
          <input type="text" placeholder="Insira a filial vinculada" />
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>Salário:</label>
            <input type="text" placeholder="Insira o salário" />
          </div>

          <div className="campo pequeno">
            <label>Status:</label>
            <input type="text" placeholder="Insira o status" />
          </div>
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>ID:</label>
            <input type="text" placeholder="Insira o ID" />
          </div>

          <div className="campo pequeno">
            <label>Email:</label>
            <input type="email" placeholder="Insira o email" />
          </div>
        </div>

        <button type="submit" className="botao">
          Concluir
        </button>
      </form>
    </div>
  );
}
