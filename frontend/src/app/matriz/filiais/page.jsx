"use client";

import React from "react";
import "./lojas.css";
import { Edit3 } from "lucide-react";

export default function Lojas() {
  const lojas = [
    {
      id: 6874,
      nome: "Osasco",
      endereco: "Vila Livieiro, 184",
      telefone: "55 11 98652067",
      gerente: "Responsável local",
      status: "Ativa/Inativa",
      ultimoAcesso: "Data atividade",
    },
    {
      id: 6875,
      nome: "São Paulo",
      endereco: "Vila Livieiro, 184",
      telefone: "55 11 98652067",
      gerente: "Responsável local",
      status: "Ativa/Inativa",
      ultimoAcesso: "Data atividade",
    },
  ];

  return (
    <div className="lojas-container">
      <button className="btn-cadastrar">+ Cadastrar nova loja</button>

      {lojas.map((loja) => (
        <div key={loja.id} className="card-loja">
          <div className="header-card">
            <span className="logo">Molli</span>
            <h3>{loja.nome}</h3>
          </div>

          <div className="conteudo-card">
            <div className="coluna">
              <p><span className="label">Id</span> {loja.id}</p>
              <p><span className="label">Endereço</span></p>
              <p>{loja.endereco}</p>
              <p><span className="label">Telefone</span></p>
              <p>{loja.telefone}</p>
            </div>

            <div className="coluna">
              <p><span className="label">Status</span> {loja.status}</p>
              <p><span className="label">Gerente</span></p>
              <p>{loja.gerente}</p>
              <p><span className="label">Último acesso do gerente</span></p>
              <p>{loja.ultimoAcesso}</p>
            </div>
          </div>

          <div className="acoes-card">
            <Edit3 className="icone" size={18} />
            <button className="btn-acessar">Acessar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
