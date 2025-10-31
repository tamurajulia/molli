'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer/footer";
import NavClient from "../components/NavClient/navClient";
import "./not-found.css";

export default function NotFound() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <>
      <NavClient />
      <div className="notfound-container">
        <main className="notfound-content">
          <div className="illustration">
            <span className="num">4</span>
            <div className="bunny-zero">
              <div className="ear left"></div>
              <div className="ear right"></div>
              <div className="inner-hole">
                <div className="eyes">
                  <div className="eye left"></div>
                  <div className="eye right"></div>
                </div>
                <div className="nose"></div>
                <div className="mouth"></div>
              </div>
            </div>
            <span className="num">4</span>
          </div>
          <p className="text">
            A página que você está procurando não existe ou foi movida.
          </p>
          <button onClick={goHome}>Voltar para a página inicial</button>
        </main>
        <Footer />
      </div>
    </>
  );
}
