"use client";

import React from "react";
import "./editar.css";
import { Boxes } from "lucide-react";

export default function EditarEstoque() {
  return (
    <div className="cadastroContainer">
      <h2 className="titulo">
        <Boxes size={24} className="iconeTitulo" />
        <span>Editar o <strong>Estoque</strong> :</span>
      </h2>

      <form className="formulario">
        <div className="campo">
          <label>Produto:</label>
          <input type="text" placeholder="Insira o nome do produto" />
        </div>

        <div className="campo">
          <label>Categoria:</label>
          <input type="text" placeholder="Insira a categoria" />
        </div>

        <div className="campo">
          <label>Origem:</label>
          <input type="text" placeholder="Insira a origem" />
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>Estoque atual:</label>
            <input type="number" placeholder="Insira a quantidade atual" />
          </div>

          <div className="campo pequeno">
            <label>Preço:</label>
            <input type="text" placeholder="Insira o preço" />
          </div>
        </div>

        <div className="linha">
          <div className="campo pequeno">
            <label>Status:</label>
            <input type="text" placeholder="Insira o status" />
          </div>

          <div className="campo pequeno">
            <label>ID:</label>
            <input type="text" placeholder="Insira o ID do produto" />
          </div>
        </div>

        <button type="submit" className="botao">
          Concluir
        </button>
      </form>
    </div>
  );
}
