"use client";
import { useState } from "react";
import NavClient from '@/components/NavClient/navClient';
import Footer from '@/components/Footer/footer';
import Image from 'next/image';
import Link from 'next/link';
import './home.css';


export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const perguntas = [
    "Como faço para comprar online?",
    "Quais são as formas de pagamento aceitas?",
    "Posso trocar um produto?",
    "Como funciona a assinatura mensal?",
  ];


  const togglePergunta = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <NavClient />
      <main>

        <div className="bannerFullWidth">
          <picture>
            <source media="(max-width: 768px)" srcSet="/IMG/mobile/MobileBanner.png" />
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


        <section className="molli-container">
          <div className="molli-top">
            <div className="molli-images">
              <Image src="/mae.png" alt="Bebê e mãe" width={180} height={240} className="molli-img" />
              <Image src="/bebe.png" alt="Mãe e bebê" width={180} height={240} className="molli-img" />
            </div>

            <div className="molli-text">
              <h1 className="molli-title">molli</h1>
              <h3 className="molli-subtitle">NOSSA LOJA</h3>
              <p className="molli-description">
                A Molli nasceu com o propósito de transformar o cuidado com o bebê
                em momentos cheios de carinho, praticidade e aconchego. <br />
                Somos uma marca especializada em produtos infantis e enxovais, que
                une qualidade, conforto e amor em cada detalhe.
              </p>
            </div>
          </div>


          <div className="bannerProdutos-container">
            <picture>
              <source media="(max-width: 768px)" srcSet="/IMG/mobile/mobille.png" />
              <Image
                src="/produtos1.png"
                alt="Banner Produtos"
                width={1920}
                height={600}
                className="bannerImage"
                priority
              />
            </picture>


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
          </div>
        </section>


        <section className="mvv-section" id="mvv">
          <div className="mvv-container">
            <div className="mvv-text">
              <h2 className="mvv-title">missão</h2>
              <p className="mvv-texto">
                Proporcionar às famílias praticidade, conforto e carinho no cuidado com o bebê,
                oferecendo produtos de qualidade e experiências personalizadas que tornam cada
                fase da maternidade mais leve e especial.
              </p>

              <h2 className="mvv-title">visão</h2>
              <p className="mvv-texto">
                Ser reconhecida como a marca referência em assinaturas infantis e enxovais no Brasil,
                unindo tecnologia, afeto e inovação para transformar o modo como mães e pais cuidam de seus filhos.
              </p>

              <h2 className="mvv-title">valores</h2>
              <p className="mvv-texto">
                Amor, cuidado, qualidade, confiança, inovação, empatia e sustentabilidade.
              </p>
            </div>

            <div className="mvv-image">
              <Image src="/mvv.png" alt="Missão Visão Valores - fotos" width={420} height={380} className="mvv" />
            </div>
          </div>
        </section>


        <section className="lojas-section" id="filiais">
          <div className="container-lojas">
            <h2 className="lojas-title">
              <span className="lojas-bar"></span> NOSSAS LOJAS
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

        <section className="faq-section">
          <div className="faq-inner">

            <div className="faq-left">
              <div className="faq-coelho-wrap">
                <Image src="/coelhoo.png" alt="Coelho" width={420} height={420} priority />
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
                        <span className={`faq-chev ${activeIndex === index ? "open" : ""}`}>▾</span>
                      </div>

                      <div className="faq-answer">
                        <p>
                          Aqui vai a resposta da pergunta. Substitua por seu texto real. Esse texto
                          aparece quando o item está aberto.
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
     
        <section className="planos-section">
          <div className="planos-container">
            <h2 className="planos-title">planos</h2>
            <h3 className="planos-subtitle">ASSINE E FAÇA PARTE</h3>

            <div className="planos-cards">
              <div className="plano-card">
                <h4 className="plano-nome">essencial</h4>
                <p className="plano-preco">R$99,90/mês</p>
                <p className="plano-descricao">
                  Ideal para: mães que querem praticidade e itens básicos de enxoval e higiene
                </p>
              </div>

              <div className="plano-card destaque">
                <h4 className="plano-nome">luxo</h4>
                <p className="plano-preco">R$179,90/mês</p>
                <p className="plano-descricao">
                  Ideal para: mães que querem a experiência completa: roupas, enxoval, higiene e itens personalizados
                </p>
              </div>

              <div className="plano-card">
                <h4 className="plano-nome">premium</h4>
                <p className="plano-preco">R$299,90/mês</p>
                <p className="plano-descricao">
                  Ideal para: mães que desejam variedade, roupinhas e acessórios junto dos produtos de cuidado
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
