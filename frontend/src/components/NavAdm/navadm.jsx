"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navadm.css";
import ProfileModal from "../ProfileModal/ProfileModal";

export default function NavAdm() {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);

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

  const [logoSrc, setLogoSrc] = useState("/IMG/navbar/LogoNav.png");

  useEffect(() => {
    if (hydrated) {
      setLogoSrc("/IMG/navbar/LogoNav.png"); 
    }
  }, [hydrated]);

  const user = {
    nome: "Isabelli Monte",
    senha: "isabelli",
    email: "isabelli@molli.com",
    cpf: "123.456.789-00",
    salario: "R$ 2.500,00",
    cargo: "Caixa da Molli",
    filial: "Unidade ADM - SP",
  };

  if (!hydrated) {
    return (
      <aside className="sidebar closed">
        <div className="top-section">
          <img src={logoSrc} alt="Logo Molli" className="logo" />
        </div>
        <nav className="menu">
          <i className="bi bi-speedometer2 menu-item"></i>
          <i className="bi bi-graph-up-arrow menu-item"></i>
          <i className="bi bi-people-fill menu-item"></i>
          <i className="bi bi-box-seam menu-item"></i>
          <i className="bi bi-geo-alt menu-item"></i>
          <i className="bi bi-truck menu-item"></i>
          <i className="bi bi-receipt menu-item"></i>
          <i className="bi bi-shop menu-item"></i> 
        </nav>
        <div className="bottom-section">
          <button className="toggle-btn" aria-label="Alternar menu" disabled>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="top-section">
          <img src={logoSrc} alt="Logo Molli" className="logo" />
        </div>

        <nav className="menu">
          <Link href="/admin/dashboard" className="menu-item">
            <i className="bi bi-speedometer2"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/admin/financeiro" className="menu-item">
            <i className="bi bi-graph-up-arrow"></i>
            {isOpen && <span>Financeiro</span>}
          </Link>
          <Link href="/admin/funcionarios" className="menu-item">
            <i className="bi bi-people-fill"></i>
            {isOpen && <span>Funcionários</span>}
          </Link>
          <Link href="/admin/estoque" className="menu-item">
            <i className="bi bi-box-seam"></i>
            {isOpen && <span>Estoque</span>}
          </Link>
          <Link href="/admin/fornecedores" className="menu-item">
            <i className="bi bi-truck"></i>
            {isOpen && <span>Fornecedores</span>}
          </Link>
          <Link href="/admin/pedidos" className="menu-item">
            <i className="bi bi-receipt"></i>
            {isOpen && <span>Pedidos</span>}
          </Link>
          <Link href="/admin/produtos" className="menu-item">
            <i className="bi bi-basket3"></i>
            {isOpen && <span>Produtos</span>}
          </Link>
        </nav>

        <div className="bottom-section">
          {isOpen && (
            <div
              className="user-box"
              onClick={() => setIsProfileOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="avatar">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="user-info">
                <p className="user-name">{user.nome}</p>
                <p className="user-role">{user.cargo}</p>
              </div>
              <i className="bi bi-box-arrow-right logout-icon"></i>
            </div>
          )}
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
