"use client";
import "./page.css";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="IMG/login/imgLogin.png"
          alt="Loja infantil"
          className="background-image"
        />
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="logo">
            <span className="molli-text">
              <img
                src="IMG/login/logoLogin.png"
                alt="Logo Molli"
                className="background-image"
              />
            </span>
          </div>

          <label className="label">CPF:</label>
          <div className="input-group">
            <input type="text" placeholder="Insira seu cpf" />
            <FaUser className="icon" />
          </div>

          <label className="label">Senha:</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Insira sua senha"
            />
            {showPassword ? (
              <FaEye 
                className="icon clickable"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className="icon clickable"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
            <div className="link-container-center">
            <a href="/cliente/Home" className="link-sem-acesso">
                Entrar sem acesso
            </a>
        </div>
          <a href="/cliente/Home"><button className="btn-entrar">ENTRAR</button></a>
        </div>
      </div>

      
    </div>
  );
}



