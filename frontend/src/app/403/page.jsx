'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer/footer";
import NavClient from "../../components/NavClient/navClient";
import "./403.css";

export default function Forbidden() {
  const router = useRouter();

  const goProfile = () => {
    router.push('/perfil');
  };

  return (
    <>
      <NavClient />
      <div className="forbidden-container">
        <main className="forbidden-content">
          <div className="illustration-403">
            <span className="num">4</span>
            <div className="door">
              <div className="door-arch"></div>
              <div className="door-tape tape1"></div>
              <div className="door-tape tape2"></div>
              <div className="door-tape tape3"></div>
              <div className="handle"></div>
            </div>
            <span className="num">3</span>
          </div>
          <p className="text">
            Desculpe, mas você não tem acesso a esta página ou recurso por algum motivo
          </p>
          <button onClick={goProfile}>Ir para minha página de perfil</button>
        </main>
        <Footer />
      </div>
    </>
  );
}
