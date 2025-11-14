"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navmatriz.css";
import ProfileModal from "../ProfileModal/ProfileModal";

export default function NavMatriz() {
  const [isOpen, setIsOpen] = useState(undefined);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/IMG/navbar/LogoMatriz.png");
  const router = useRouter(); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isOpen === undefined) return null;

  const user = {
    nome: "João da Silva",
    email: "joao@molli.com",
    cargo: "Gerente Matriz",
    filial: "Unidade Matriz - SP",
  };

  const handleLogout = () => {
    router.push("/"); 
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="top-section">
          <img src={logoSrc} alt="Logo Molli" className="logo" />
        </div>

        <nav className="menu">
         

          <Link href="/matriz/financeiro" className="menu-item">
            <i className="bi bi-graph-up-arrow"></i>
            {isOpen && <span>Financeiro</span>}
          </Link>

          <Link href="/matriz/funcionarios" className="menu-item">
            <i className="bi bi-people-fill"></i>
            {isOpen && <span>Funcionários</span>}
          </Link>

          <Link href="/matriz/estoque" className="menu-item">
            <i className="bi bi-box-seam"></i>
            {isOpen && <span>Estoque</span>}
          </Link>

          <Link href="/matriz/fornecedores" className="menu-item">
            <i className="bi bi-truck"></i>
            {isOpen && <span>Fornecedores</span>}
          </Link>

          <Link href="/matriz/filiais" className="menu-item">
            <i className="bi bi-geo-alt"></i>
            {isOpen && <span>Lojas</span>}
          </Link>

          <Link href="/matriz/pedidos" className="menu-item">
            <i className="bi bi-receipt"></i>
            {isOpen && <span>Pedidos</span>}
          </Link>

          <Link href="/funcionario/caixa/pdv/teladevenda" className="menu-item">
            <i className="bi bi-shop"></i>
            {isOpen && <span>PDV</span>}
          </Link>
        </nav>

        <div className="bottom-section">
          <div className={`user-box ${isOpen ? "" : "collapsed"}`}>
            <div className="avatar" onClick={() => setIsProfileOpen(true)}>
              <i className="bi bi-person-circle"></i>
            </div>
            {isOpen && (
              <div className="user-info" onClick={() => setIsProfileOpen(true)}>
                <p className="user-name">{user.nome}</p>
                <p className="user-role">{user.cargo}</p>
              </div>
            )}
            {isOpen && (
              <i
                className="bi bi-box-arrow-right logout-icon"
                onClick={handleLogout}
                title="Sair"
              ></i>
            )}
          </div>
        </div>
      </aside>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </>
  );
}
