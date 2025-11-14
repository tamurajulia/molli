"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./pedidos.css";
import { BarChart3, Edit3 } from "lucide-react";

export default function PedidosTable() {
  const [isMobile, setIsMobile] = useState(false);
  const [filtroVendedor, setFiltroVendedor] = useState("");
  const [filtroMetodo, setFiltroMetodo] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const dados = [
    {
      id: "01",
      vendedor: "João Almeida",
      valorTotal: "R$ 320,00",
      precoUnitario: "R$ 80,00",
      quantidade: 4,
      metodoPagamento: "Cartão de Crédito",
      data: "2025-10-01",
    },
    {
      id: "02",
      vendedor: "Maria Fernanda",
      valorTotal: "R$ 150,00",
      precoUnitario: "R$ 50,00",
      quantidade: 3,
      metodoPagamento: "Pix",
      data: "2025-10-05",
    },
    {
      id: "03",
      vendedor: "Lucas Ribeiro",
      valorTotal: "R$ 200,00",
      precoUnitario: "R$ 100,00",
      quantidade: 2,
      metodoPagamento: "Dinheiro",
      data: "2025-10-09",
    },
    {
      id: "04",
      vendedor: "Sofia Martins",
      valorTotal: "R$ 480,00",
      precoUnitario: "R$ 96,00",
      quantidade: 5,
      metodoPagamento: "Cartão de Débito",
      data: "2025-10-12",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setDadosFiltrados(dados);
  }, []);

  const aplicarFiltro = () => {
    const filtrados = dados.filter((item) => {
      const vendedorMatch = filtroVendedor
        ? item.vendedor.toLowerCase().includes(filtroVendedor.toLowerCase())
        : true;

      const metodoMatch = filtroMetodo
        ? item.metodoPagamento.toLowerCase().includes(filtroMetodo.toLowerCase())
        : true;

      return vendedorMatch && metodoMatch;
    });
    setDadosFiltrados(filtrados);
  };

  return (
    <div className="container">
    
      <h2 className="titulo">
        <BarChart3 className="iconeTitulo" size={22} />
        <span className="titulo-preto">Controle de</span>
        <span className="titulo-verde"> Pedidos:</span>
      </h2>

      <div className="filtros">
        <div className="campo">
          <label className="tituloInput">Vendedor:</label>
          <input
            type="text"
            placeholder="Digite o vendedor"
            className="inputFocus"
            value={filtroVendedor}
            onChange={(e) => setFiltroVendedor(e.target.value)}
          />
        </div>

        <div className="campo">
          <label className="tituloInput">Método de Pagamento:</label>
          <select
            className="inputFocus"
            value={filtroMetodo}
            onChange={(e) => setFiltroMetodo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
          </select>
        </div>

        <button className="botao-cadastrar" onClick={aplicarFiltro}>
          Filtrar
        </button>
      </div>

      <p className="resultado-label">Resultados:</p>

      <div className="tabelaContainer">
        <h3 className="subtitulo">Pedidos</h3>

        {!isMobile ? (
          <table className="tabela">
            <thead>
              <tr>
                <th>N° Venda</th>
                <th>Vendedor</th>
                <th>Data do Pedido</th>
                <th>Preço Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Método de Pagamento</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.vendedor}</td>
                  <td>{item.data}</td>
                  <td>{item.precoUnitario}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.valorTotal}</td>
                  <td>{item.metodoPagamento}</td>
                  <td className="acoes">
                    <Link href="/matriz/pedidos/editar">
                      <Edit3 className="icone" title="Editar" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          dadosFiltrados.map((item) => (
            <div className="card-pedido" key={item.id}>
              <div className="linha-info"><strong>N° Venda:</strong> {item.id}</div>
              <div className="linha-info"><strong>Vendedor:</strong> {item.vendedor}</div>
              <div className="linha-info"><strong>Data:</strong> {item.data}</div>
              <div className="linha-info"><strong>Preço Unitário:</strong> {item.precoUnitario}</div>
              <div className="linha-info"><strong>Quantidade:</strong> {item.quantidade}</div>
              <div className="linha-info"><strong>Total:</strong> {item.valorTotal}</div>
              <div className="linha-info"><strong>Método:</strong> {item.metodoPagamento}</div>
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
