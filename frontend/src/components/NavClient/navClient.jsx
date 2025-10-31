'use client';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './nav.css';
import Link from 'next/link';
import Image from 'next/image';
export default function NavClient() {

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          <Image src="/LogoNav.png" alt="Logo Molli" width={120} height={50} priority/>
        </Link>
     </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}> ☰ </div>
      <ul className={`navLinksNav ${menuOpen ? 'showMenu' : ''}`}>
      <li><Link href="/cliente/Home">Home</Link></li>
      <li><Link href="/cliente/Home#filiais">Filiais</Link></li>
      <li><Link href="/cliente/Home#mvv">Sobre Nós</Link></li>
      <li><Link href="/cliente/produtos">Catálogo</Link></li>
      </ul>
 
      
    <div className="userIcon">
   <i className="bi bi-person" style={{ fontSize: '24px', color: 'white' }}></i>
  </div>
</nav>
  );
}

 