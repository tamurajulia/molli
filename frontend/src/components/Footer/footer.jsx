import Image from 'next/image';
import './footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="topRow">
        <nav className="navLinksFooter">
          <a href="#">Home</a>
          <a href="#">Filiais</a>
          <a href="#">Sobre Nós</a>
        </nav>
      </div>
      <div className="footerLine"></div>
      <div className="bottomRow">
        <div className="leftSide">
          <div className="socialIcons">
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
        <div className="centerSide">
          <p className="copyright">
            © 2025 Molli. Proibida a reprodução sem autorização.
          </p>
        </div>
        <div className="rightSide">
          <div className="logoContainer">
            <Image
              src="/FooterLogo.png"
              alt="Logo Molli"
              width={260}
              height={90}
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </div>
    </footer>
  );
}