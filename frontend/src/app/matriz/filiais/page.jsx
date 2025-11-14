"use client";

import React, { useState } from "react";
import {
  Edit3,
  MapPin,
  Phone,
  User,
  Activity,
  CalendarDays,
  Building2,
  X,
  Store,
  CheckCircle2,
  XCircle,
  PlusCircle,
} from "lucide-react";
import "./lojas.css";

export default function Lojas() {
  const [lojas, setLojas] = useState([
    {
      id: 1,
      nome: "Osasco",
      endereco: "Rua Vila Livieiro, 184",
      telefone: "55 11 98652-067",
      gerente: "Camila Ramos",
      status: "Ativa",
      ultimoAcesso: "05/11/2025",
    },
    {
      id: 2,
      nome: "São Paulo",
      endereco: "Av. das Flores, 214 - Centro",
      telefone: "55 11 98231-442",
      gerente: "Marcos Silva",
      status: "Inativa",
      ultimoAcesso: "01/11/2025",
    },
    {
      id: 3,
      nome: "Campinas",
      endereco: "Av. das Palmeiras, 1200",
      telefone: "55 19 99852-777",
      gerente: "Juliana Costa",
      status: "Ativa",
      ultimoAcesso: "03/11/2025",
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [lojaSelecionada, setLojaSelecionada] = useState(null);
  const [novaLoja, setNovaLoja] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    gerente: "",
    status: "Ativa",
  });

  const abrirModalEditar = (loja) => {
    setLojaSelecionada(loja);
    setModalAberto(true);
  };

  const fecharModalEditar = () => {
    setModalAberto(false);
    setLojaSelecionada(null);
  };

  const abrirModalCriar = () => setModalCriarAberto(true);
  const fecharModalCriar = () => setModalCriarAberto(false);

  const salvarEdicao = (e) => {
    e.preventDefault();
    setLojas((prev) =>
      prev.map((l) =>
        l.id === lojaSelecionada.id ? { ...lojaSelecionada } : l
      )
    );
    fecharModalEditar();
  };

  const criarLoja = (e) => {
    e.preventDefault();
    const nova = {
      id: Math.floor(Math.random() * 9000) + 1000,
      ...novaLoja,
      ultimoAcesso: "—",
    };
    setLojas((prev) => [...prev, nova]);
    setNovaLoja({
      nome: "",
      endereco: "",
      telefone: "",
      gerente: "",
      status: "Ativa",
    });
    fecharModalCriar();
  };

  const total = lojas.length;
  const ativas = lojas.filter((l) => l.status === "Ativa").length;
  const inativas = lojas.filter((l) => l.status === "Inativa").length;

  return (
    <div className="lojas-container">
      <div className="top-header">
        <h2 className="titulo">
          <Store className="iconeTitulo" size={22} />
          <span className="titulo-preto">Filiais</span>
          <span className="titulo-verde"> da Molli:</span>
        </h2>
        <button className="btn-cadastrar" onClick={abrirModalCriar}>
          Nova Loja
        </button>
      </div>

      <div className="mini-cards-container mt-5">
        <div className="mini-card">
          <Store size={26} className="mini-icon" />
          <div>
            <h3>{total}</h3>
            <p>Total de Filiais</p>
          </div>
        </div>
        <div className="mini-card">
          <CheckCircle2 size={26} className="mini-icon" />
          <div>
            <h3>{ativas}</h3>
            <p>Filiais Ativas</p>
          </div>
        </div>
        <div className="mini-card">
          <XCircle size={26} className="mini-icon" />
          <div>
            <h3>{inativas}</h3>
            <p>Filiais Inativas</p>
          </div>
        </div>
      </div>

      <div className="grid-lojas mt-5">
        {lojas.map((loja) => (
          <div key={loja.id} className="card-loja">
            <div className="header-card">
              <div className="header-info">
                <Building2 size={22} className="icone-header" />
                <h3>{loja.nome}</h3>
              </div>
              <Edit3
                className="icone-editar"
                size={18}
                title="Editar loja"
                onClick={() => abrirModalEditar(loja)}
              />
            </div>

            <div className="conteudo-card coluna-unica">
              <p className="linha">
                <span className="label">ID:</span> {loja.id}
              </p>
              <p className="linha">
                <MapPin size={15} className="icon" />
                <span>{loja.endereco}</span>
              </p>
              <p className="linha">
                <Phone size={15} className="icon" />
                <span className="label">Telefone:</span> {loja.telefone}
              </p>
              <p className="linha">
                <User size={15} className="icon" />
                <span className="label">Gerente:</span> {loja.gerente}
              </p>
              <p className="linha">
               
              </p>
             
            </div>

            <div className="acoes-card">
              <button className="btn-acessar">Acessar loja</button>
            </div>
          </div>
        ))}
      </div>

      {modalAberto && lojaSelecionada && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Filial</h3>
              <X className="fechar-modal" size={22} onClick={fecharModalEditar} />
            </div>

            <form className="form-modal" onSubmit={salvarEdicao}>
              {["nome", "endereco", "telefone", "gerente"].map((campo) => (
                <label key={campo}>
                  {campo.charAt(0).toUpperCase() + campo.slice(1)}:
                  <input
                    type="text"
                    value={lojaSelecionada[campo]}
                    onChange={(e) =>
                      setLojaSelecionada({
                        ...lojaSelecionada,
                        [campo]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}
              <label>
                Status:
                <select
                  value={lojaSelecionada.status}
                  onChange={(e) =>
                    setLojaSelecionada({
                      ...lojaSelecionada,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                </select>
              </label>

              <div className="botoes-modal">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={fecharModalEditar}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalCriarAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Nova Filial</h3>
              <X className="fechar-modal" size={22} onClick={fecharModalCriar} />
            </div>

            <form className="form-modal" onSubmit={criarLoja}>
              <label>
                Nome da Loja:
                <input
                  type="text"
                  value={novaLoja.nome}
                  onChange={(e) =>
                    setNovaLoja({ ...novaLoja, nome: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Endereço:
                <input
                  type="text"
                  value={novaLoja.endereco}
                  onChange={(e) =>
                    setNovaLoja({ ...novaLoja, endereco: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  value={novaLoja.telefone}
                  onChange={(e) =>
                    setNovaLoja({ ...novaLoja, telefone: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Gerente:
                <input
                  type="text"
                  value={novaLoja.gerente}
                  onChange={(e) =>
                    setNovaLoja({ ...novaLoja, gerente: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Status:
                <select
                  value={novaLoja.status}
                  onChange={(e) =>
                    setNovaLoja({ ...novaLoja, status: e.target.value })
                  }
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                </select>
              </label>

              <div className="botoes-modal">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={fecharModalCriar}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  Criar Filial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
