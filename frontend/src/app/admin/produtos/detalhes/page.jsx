"use client";

import React from "react";
import "./detalhes.css";
import { Package, Barcode, Euro, Folder, Building2, CheckCircle2 } from "lucide-react";

export default function ProdutoDetalhes() {
  return (
    <div className="detalhes-container">
      {/* Título */}
      <h2 className="titulo">
        <Package className="iconeTitulo" size={22} />
        <span className="titulo-preto">Detalhes do</span>
        <span className="titulo-verde"> produto:</span>
      </h2>

      <hr className="linha" />

      {/* Formulário */}
      <form className="formulario">
        <div className="linha-inputs">
          <div className="campo">
            <label>Nome:</label>
            <div className="input-wrapper">
              <input type="text" placeholder="Insira o nome" />
              <Barcode className="icone-input" size={18} />
            </div>
          </div>

          <div className="campo">
            <label>Preço:</label>
            <div className="input-wrapper">
              <input type="text" placeholder="Insira o preço" />
              <Euro className="icone-input" size={18} />
            </div>
          </div>
        </div>

        <div className="linha-inputs">
          <div className="campo">
            <label>Código de barras:</label>
            <div className="input-wrapper">
              <input type="text" placeholder="Insira o codigo de barras" />
              <Barcode className="icone-input" size={18} />
            </div>
          </div>

          <div className="campo">
            <label>Categoria:</label>
            <div className="input-wrapper">
              <input type="text" placeholder="Insira a categoria" />
              <Folder className="icone-input" size={18} />
            </div>
          </div>
        </div>

        <div className="campo full">
          <label>Fornecedor:</label>
          <div className="input-wrapper">
            <input type="text" placeholder="Insira o fornecedor" />
            <CheckCircle2 className="icone-input" size={18} />
          </div>
        </div>
      </form>
    </div>
  );
}
