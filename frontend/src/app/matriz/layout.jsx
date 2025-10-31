"use client";

import { useState, useEffect } from "react";
import NavAdm from "@/components/NavMatriz/navmatriz";
import "./adminmatriz.css";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-container">
      <NavAdm isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={`admin-content ${isSidebarOpen ? "" : "sidebar-closed"}`}
      >
        {children}
      </main>
    </div>
  );
}