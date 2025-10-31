"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./pedidos.css";
import { BarChart3, Edit3 } from "lucide-react";

export default function PedidosTable() {
  const [isMobile, setIsMobile] = useState(false);

  const dados = [
    { id: "01", vendedor: "João Almeida", valor: "R$ 320,00", status: "Concluído", quantidade: 4 },
    { id: "02", vendedor: "Maria Fernanda", valor: "R$ 150,00", status: "Pendente", quantidade: 3 },
    { id: "03", vendedor: "Lucas Ribeiro", valor: "R$ 200,00", status: "Cancelado", quantidade: 2 },
    { id: "04", vendedor: "Sofia Martins", valor: "R$ 480,00", status: "Concluído", quantidade: 5 },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container">
      {/* Título */}
      <h2 className="titulo">
        <BarChart3 className="iconeTitulo" size={22} />
        <span className="titulo-preto">Controle de</span>
        <span className="titulo-verde"> Pedidos:</span>
      </h2>
         {/* Filtros */}
         <div className="filtros">
        <div className="campo">
          <label>Vendedor:</label>
          <input type="text" placeholder="SELECIONE O VENDEDOR" />
        </div>
        <div className="campo">
          <label>Status:</label>
          <input type="text" placeholder="SELECIONE O STATUS" />
        </div>
        <button className="btnFiltrar">Filtrar</button>
      </div>
      <Link href="/admin/estoque/cadastrar">
  <button className="botao-cadastrar">Cadastrar</button>
</Link>

      {/* Resultados */}
      <p className="resultado-label">resultados:</p>

      <div className="tabelaContainer">
        <h3 className="subtitulo">Pedidos</h3>

        {!isMobile ? (
          <table className="tabela">
            <thead>
              <tr>
                <th>N° Venda</th>
                <th>Vendedor</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Quantidade</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.vendedor}</td>
                  <td>{item.valor}</td>
                  <td>{item.status}</td>
                  <td>{item.quantidade}</td>
                  <td className="acoes">
                  <Link href="/admin/pedidos/editar">
  <Edit3 className="icone" title="Editar" />
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          dados.map((item) => (
            <div className="card-pedido" key={item.id}>
              <div className="linha-info"><strong>N° Venda:</strong> {item.id}</div>
              <div className="linha-info"><strong>Vendedor:</strong> {item.vendedor}</div>
              <div className="linha-info"><strong>Valor:</strong> {item.valor}</div>
              <div className="linha-info"><strong>Status:</strong> {item.status}</div>
              <div className="linha-info"><strong>Quantidade:</strong> {item.quantidade}</div>
              <div className="acoes">
                <Edit3 className="icone" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
