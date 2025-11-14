"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import NavAdm from "@/components/NavFuncionario/navfuncionario";

export default function FuncionarioLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isPDV = pathname.includes("/funcionario/caixa/pdv");

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPDV) {
    return <div>{children}</div>;
  }

  return (
    <div className="admin-container">
      <NavAdm isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`admin-content ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        {children}
      </main>
    </div>
  );
}

