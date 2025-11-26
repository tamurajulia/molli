"use client";

import {
  Shirt,
  Baby,
  Heart,
  Bath,
  Star,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import NavClient from "@/components/NavClient/navClient";
import Footer from "@/components/Footer/footer";
import Image from "next/image";
import Link from "next/link";
import "./home1.css";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const perguntas = [
    "Como faço para comprar online?",
    "Quais são as formas de pagamento aceitas?",
    "Posso trocar um produto?",
    "Como funciona a assinatura mensal?",
  ];

  const togglePergunta = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <NavClient />

      <main>
        {/* BANNER INICIAL */}
        <div className="bannerFullWidth">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/IMG/mobile/MobileBanner.png"
            />

            <Image
              src="/bannerHome.png"
              alt="Banner Home"
              width={1920}
              height={600}
              className="bannerImage"
              priority
            />
          </picture>
        </div>
<div className="produtos-overlay">
              <h4 className="categoria-sub">CATEGORIA</h4>
              <h2 className="categoria-title">Conheça nossos produtos</h2>

              <div className="categoria-icons">
                <Link href="/cliente/produtos#ACESSÓRIOS" className="categoria-card">
                  <Image src="/acessorios.png" alt="Acessórios" width={70} height={70} />
                  <p>ACESSÓRIOS</p>
                </Link>

                <Link href="/cliente/produtos#ROUPAS" className="categoria-card">
                  <Image src="/roupas.png" alt="Roupas" width={70} height={70} />
                  <p>ROUPAS</p>
                </Link>

                <Link href="/cliente/produtos#CUIDADOS" className="categoria-card">
                  <Image src="/cuidado.png" alt="Cuidados" width={70} height={70} />
                  <p>CUIDADOS</p>
                </Link>

                <Link href="/cliente/produtos#CONFORTO" className="categoria-card">
                  <Image src="/conforto.png" alt="Conforto" width={70} height={70} />
                  <p>CONFORTO</p>
                </Link>
              </div>

            </div>
          
        

        <section className="lojas-section" id="filiais">
          <div className="container-lojas">
            <h2 className="lojas-title">
              <span className="lojas-bar"></span> NOVIDADES
            </h2>

            <div className="lojas-grid">
              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja1.png" alt="Loja São Paulo" width={300} height={200} />
                </div>
                <h3 className="loja-nome">São Paulo</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>

              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja2.png" alt="Loja Guarulhos" width={300} height={200} />
                </div>
                <h3 className="loja-nome">Guarulhos</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>

              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja3.png" alt="Loja Osasco" width={300} height={200} />
                </div>
                <h3 className="loja-nome">Osasco</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>

              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja4.png" alt="Loja São Bernardo" width={300} height={200} />
                </div>
                <h3 className="loja-nome">São Bernardo</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>
            </div>
          </div>
        </section>

         
    <div className="w-full flex justify-center py-10">
      <div className="grid grid-cols-3 gap-5 items-start">

        {/* ESQUERDA */}
        <div className="flex justify-center">
          <Image
            src="/img1.png"
            width={300}
            height={400}
            alt="Imagem 1"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* MEIO (duas imagens uma embaixo da outra) */}
        <div className="flex flex-col gap-4">
          <Image
            src="/img2.png"
            width={300}
            height={190}
            alt="Imagem 2"
            className="rounded-xl shadow-lg"
          />
          <Image
            src="/img3.png"
            width={300}
            height={190}
            alt="Imagem 3"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* DIREITA */}
        <div className="flex justify-center">
          <Image
            src="/img4.png"
            width={300}
            height={400}
            alt="Imagem 4"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>

 <section className="lojas-section" id="filiais">
          <div className="container-lojas">
            <h2 className="lojas-title">
              <span className="lojas-bar"></span> MAIS POPULARES
            </h2>

            <div className="lojas-grid">
              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja1.png" alt="Loja São Paulo" width={300} height={200} />
                </div>
                <h3 className="loja-nome">São Paulo</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>

              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja2.png" alt="Loja Guarulhos" width={300} height={200} />
                </div>
                <h3 className="loja-nome">Guarulhos</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>

              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja3.png" alt="Loja Osasco" width={300} height={200} />
                </div>
                <h3 className="loja-nome">Osasco</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>

              <div className="loja-card">
                <div className="loja-card--img">
                  <Image src="/loja4.png" alt="Loja São Bernardo" width={300} height={200} />
                </div>
                <h3 className="loja-nome">São Bernardo</h3>
                <p className="loja-endereco">Vila Lumiero 189</p>
                <p className="loja-telefone">55 11 99852·0067</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <div className="faq-inner">
            <div className="faq-left">
              <div className="faq-coelho-wrap">
                <Image
                  src="/coelhoo.png"
                  alt="Coelho"
                  width={420}
                  height={420}
                  priority
                />
              </div>
            </div>

            <div className="faq-right">
              <div className="faq-card">
                <div className="faq-card-header">
                  <h4 className="faq-sub">DÚVIDAS?</h4>
                  <h2 className="faq-title">perguntas frequentes</h2>
                </div>

                <div className="faq-list">
                  {perguntas.map((item, index) => (
                    <div
                      key={index}
                      className={`faq-item ${activeIndex === index ? "active" : ""}`}
                      onClick={() => togglePergunta(index)}
                    >
                      <div className="faq-row">
                        <span className="faq-text">{item}</span>
                        <span
                          className={`faq-chev ${
                            activeIndex === index ? "open" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </div>

                      <div className="faq-answer">
                        <p>
                          Aqui vai a resposta da pergunta. Substitua por seu texto real.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="faq-send">
                  <h3 className="faq-send-title">mande sua pergunta</h3>
                  <input className="faq-input" placeholder="DIGITE SUA DÚVIDA" />
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* PLANOS MELHORADOS */}
 
    <section className="planos-section">
      <div className="planos-container">
        

        <div className="planos-cards">

          {/* Essencial */}
          <div className="plano-card">
            <h3 className="plano-nome">Essencial</h3>
            <p className="plano-sub">praticidade e itens básicos</p>
            <h4 className="plano-preco">R$60,90/mês</h4>

            <ul className="plano-lista">
              <li><Baby size={22}/> enxoval</li>
              <li><Bath size={22}/> higiene</li>
            </ul>
          </div>

          {/* Plano Luxo (destaque) */}
          <div className="plano-card destaque">
            <div className="tag-destaque"><Star size={18}/> MAIS POPULAR</div>

            <h3 className="plano-nome">Plano Luxo</h3>
            <p className="plano-sub">experiência completa</p>
            <h4 className="plano-preco">R$179,90/mês</h4>

            <ul className="plano-lista">
              <li><Shirt size={22}/> roupas</li>
              <li><Baby size={22}/> enxoval</li>
              <li><Bath size={22}/> higiene</li>
              <li><Sparkles size={22}/> itens personalizados</li>
            </ul>
          </div>

          {/* Premium */}
          <div className="plano-card">
            <h3 className="plano-nome">Premium</h3>
            <p className="plano-sub">benefícios extras mensais</p>
            <h4 className="plano-preco">R$110,90/mês</h4>

            <ul className="plano-lista">
              <li><Baby size={22}/> enxoval</li>
              <li><Bath size={22}/> higiene</li>
              <li><Shirt size={22}/> roupas</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
</main>
      <Footer />
    </>
  );
}
