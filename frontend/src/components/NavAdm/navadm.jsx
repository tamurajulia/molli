"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navadm.css";
import ProfileModal from "../ProfileModal/ProfileModal";

export default function NavAdm() {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter(); 

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

  const handleLogout = () => {
    router.push("/"); 
  };

  if (!hydrated) return null;

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
