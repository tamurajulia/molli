"use client";
import NavClient from '@/components/NavClient/navClient';
import Footer from '@/components/Footer/footer';
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./produtos.css";
 
export default function Produtos() {
  const router = useRouter();
 
  const categorias = [
    {
      titulo: "ACESSÓRIOS",
      produtos: [
        { nome: "mamadeira", marca: "AVENT", img: "/mamadeira.png" },
        { nome: "chupeta", marca: "AVENT", img: "/chupeta.png" },
        { nome: "mordedor", marca: "MOLLI", img: "/mordedor.png" },
        { nome: "prendedor", marca: "DAWEI", img: "/prendedor.png" },
      ],
    },
    {
      titulo: "ROUPAS",
      produtos: [
        { nome: "touca", marca: "MOLLI", img: "/touca.png" },
        { nome: "casaquinho", marca: "MOLLI", img: "/casaquinho.png" },
        { nome: "sapato", marca: "MOLLI", img: "/sapato.png" },
        { nome: "calça", marca: "BAMBU", img: "/calca.png" },
      ],
    },
    {
      titulo: "CUIDADOS",
      produtos: [
        { nome: "creme esfoliante", marca: "MOLLI", img: "/creme.png" },
        { nome: "escova", marca: "MOLLI", img: "/escova.png" },
        { nome: "cortador", marca: "MOLLI", img: "/cortador.png" },
        { nome: "bombinha", marca: "DAWEI", img: "/bombinha.png" },
      ],
    },
    {
      titulo: "CONFORTO",
      produtos: [
        { nome: "cadeira alimentar", marca: "MOLLI", img: "/cadeira.png" },
        { nome: "trocador", marca: "MOLLI", img: "/trocador.png" },
        { nome: "cadeira carro", marca: "MOLLI", img: "/cadeira-carro.png" },
        { nome: "carrinho", marca: "DAWEI", img: "/carrinho.png" },
      ],
    },
  ];
 
  const gerarSlug = (nome) => nome;
 
  const handleClick = (produto) => {
    const slug = gerarSlug(produto.nome);
 
    router.push(`/cliente/produtos/${slug}`);
  };
 
  return (
    <>
          <NavClient />
          <main>
    <div className="produtos-container">
      {categorias.map((cat, index) => (
        <section key={index} className="secao-produtos" id={cat.titulo}
        >
          <div className="titulo-linha">
            <div className="barra"></div>
            <h2>{cat.titulo}</h2>
          </div>
 
          <div className="produtos-grid">
            {cat.produtos.map((p, i) => (
              <div
                key={i}
                className="produto-card"
                onClick={() => handleClick(p)}
                style={{ cursor: "pointer" }}
              >
                <div className="produto-img-container">
                  <Image
                    src={p.img}
                    alt={p.nome}
                    width={180}
                    height={180}
                    className="produto-img"
                  />
                </div>
                <p className="produto-nome">{p.nome}</p>
                <p className="produto-marca">{p.marca}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
    </main>
     <Footer />
    </>
  );
}