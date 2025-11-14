"use client";

import React from "react";
import "./cadastrar.css";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  DollarSign,
  Building2,
  UserCheck,
} from "lucide-react";

export default function CadastroFuncionarioMatriz() {
  return (
    <div className="cadastro-container">
      <h2 className="titulo">
        <Users className="iconeTitulo" size={26} />
        <span className="titulo-preto">Cadastro de</span>
        <span className="titulo-verde"> Funcionário – Matriz</span>
      </h2>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        {/* DADOS PESSOAIS */}
        <div className="secao">
          <h3>
            <UserCheck size={18} /> Dados Pessoais
          </h3>

          <div className="campo1">
            <label>Nome completo:</label>
            <input type="text" placeholder="Insira o nome completo" required />
          </div>

          <div className="linha tres-colunas">
            <div className="campo1">
              <label>CPF:</label>
              <input type="text" placeholder="Insira o cpf" required />
            </div>

            <div className="campo1">
              <label>Data de Nascimento:</label>
              <div className="inputIcone">
                <input type="date" required />
              </div>
            </div>

            <div className="campo1">
              <label>Telefone:</label>
              <div className="inputIcone">
                <input type="tel" placeholder="(00) 00000-0000" required />
                <Phone className="icone-input" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* DADOS PROFISSIONAIS */}
        <div className="secao">
          <h3>
            <Briefcase size={18} /> Dados Profissionais
          </h3>

          <div className="linha tres-colunas">
            <div className="campo1">
              <label>Cargo:</label>
              <input type="text" placeholder="Insira o cargo" required />
            </div>

            <div className="campo1">
              <label>Departamento:</label>
              <input type="text" placeholder="Insira o departamento" />
            </div>

            <div className="campo1">
              <label>Salário (R$):</label>
              <div className="inputIcone">
                <input type="number" placeholder="0,00" required />
                <DollarSign className="icone-input" size={18} />
              </div>
            </div>
          </div>

          <div className="linha duas-colunas">
            <div className="campo1">
              <label>Data de Admissão:</label>
              <input type="date" required />
            </div>
          </div>
        </div>

        {/* CONTATO E LOCAL */}
        <div className="secao">
          <h3>
            <Mail size={18} /> Contato e Local
          </h3>

          <div className="campo1 iconeEmail">
            <label>Email corporativo:</label>
            <div className="inputIcone">
              <input type="email" placeholder="Insira o email" required />
              <Mail className="icone-input" size={18} />
            </div>
          </div>

          <div className="campo1">
            <label>Endereço:</label>
            <div className="inputIcone">
              <input type="text" placeholder="Rua, numero e bairro" required />
              <MapPin className="icone-input" size={18} />
            </div>
          </div>

          <div className="campo1">
            <label>Filial vinculada:</label>
            <div className="inputIcone">
              <select required>
                <option value="">Selecione a filial vinculada</option>
                <option value="filial1">Filial 1</option>
                <option value="filial2">Filial 2</option>
                <option value="filial3">Filial 3</option>
                <option value="matriz">Matriz</option>
              </select>
              <Building2 className="icone-input" size={18} />
            </div>
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="rodape">
          <span className="logo">Molli</span>
          <button type="submit" className="botao-criar">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
