'use client';
import NavClient from '@/components/NavClient/navClient';
import Footer from '@/components/Footer/footer';
import { use } from 'react';
import Image from 'next/image';
import './detalhes.css';

const produtos = {
  mamadeira: {
    nome: 'Mamadeira',
    marca: 'AVENT',
    descricao:
      'Mamadeira ergonômica feita em material livre de BPA, com bico de silicone que imita o seio materno, ajudando na transição entre a amamentação e a mamadeira.',
    capacidade: '260 ml',
    indicacao: 'A partir de 0 meses',
    preco: 'R$ 69,90',
    img: '/mamadeira.png',
  },
  chupeta: {
    nome: 'Chupeta',
    marca: 'AVENT',
    descricao:
      'Chupeta ortodôntica com bico de silicone ultramacio, desenvolvida para acompanhar o formato natural do palato do bebê.',
    capacidade: '-',
    indicacao: '0 a 6 meses',
    preco: 'R$ 34,90',
    img: '/chupeta.png',
  },
  mordedor: {
    nome: 'Mordedor',
    marca: 'MOLLI',
    descricao:
      'Mordedor em silicone alimentício, ideal para aliviar o desconforto da gengiva nos primeiros dentinhos.',
    capacidade: '-',
    indicacao: '3 meses +',
    preco: 'R$ 49,90',
    img: '/mordedor.png',
  },
  prendedor: {
    nome: 'Prendedor',
    marca: 'DAWEI',
    descricao:
      'Prendedor de chupeta com contas de silicone e clip metálico, mantendo o acessório limpo e seguro.',
    capacidade: '-',
    indicacao: 'Desde o nascimento',
    preco: 'R$ 39,90',
    img: '/prendedor.png',
  },
  touca: {
    nome: 'Touca',
    marca: 'MOLLI',
    descricao:
      'Touca tricotada à mão com orelhinhas delicadas, feita em algodão macio e respirável.',
    capacidade: '-',
    indicacao: 'RN a 6 meses',
    preco: 'R$ 59,90',
    img: '/touca.png',
  },
  casaquinho: {
    nome: 'Casaquinho',
    marca: 'MOLLI',
    descricao:
      'Cardigã leve em algodão natural, ideal para dias frescos. Fechamento frontal com botões de madeira natural.',
    capacidade: '-',
    indicacao: 'RN a 12 meses',
    preco: 'R$ 89,90',
    img: '/casaquinho.png',
  },
  sapato: {
    nome: 'Sapato',
    marca: 'MOLLI',
    descricao:
      'Sapatinho confortável, com sola macia e fechamento em velcro para os primeiros passinhos.',
    capacidade: '-',
    indicacao: '3 a 12 meses',
    preco: 'R$ 79,90',
    img: '/sapato.png',
  },
  calça: {
    nome: 'Calça',
    marca: 'BAMBU',
    descricao:
      'Calça em malha de bambu natural, com toque suave e tecido antibacteriano.',
    capacidade: '-',
    indicacao: 'RN a 12 meses',
    preco: 'R$ 69,90',
    img: '/calca.png',
  },
  creme: {
    nome: 'Creme assadura',
    marca: 'MOLLI',
    descricao:
      'Creme suave enriquecido com aveia e camomila, proporcionando maciez e cuidado para a pele sensível do bebê.',
    capacidade: '-',
    indicacao: 'Corpo e rosto',
    preco: 'R$ 49,90',
    img: '/creme.png',
  },
  escova: {
    nome: 'Escova',
    marca: 'MOLLI',
    descricao:
      'Escova de cerdas ultramacias para pentear com delicadeza e estimular o couro cabeludo.',
    capacidade: '-',
    indicacao: '-',
    preco: 'R$ 39,90',
    img: '/escova.png',
  },
  cortador: {
    nome: 'Cortador de unha',
    marca: 'MOLLI',
    descricao:
      'Cortador de unhas com ponta arredondada para máximo cuidado durante o corte das unhas do bebê.',
    capacidade: '-',
    indicacao: '-',
    preco: 'R$ 29,90',
    img: '/cortador.png',
  },
  bombinha: {
    nome: 'Bombinha',
    marca: 'BAMBU',
    descricao:
      'Bombinha para retirar leite com maior eficiência e cuidado para mãe e o bebê.',
    capacidade: '180 ml',
    indicacao: 'Facilita o dia a dia da amamentação',
    preco: 'R$ 79,90',
    img: '/bombinha.png',
  },
  cadeira: {
    nome: 'Cadeira alimentar',
    marca: 'MOLLI',
    descricao:
      'Cadeira leve e portátil com bandeja removível, perfeita para as primeiras refeições do bebê.',
    capacidade: '-',
    indicacao: '6 meses+',
    preco: 'R$ 349,90',
    img: '/cadeira.png',
  },
  trocador: {
    nome: 'Trocador',
    marca: 'MOLLI',
    descricao:
      'Trocador portátil, confortável e fácil de higienizar no dia a dia.',
    capacidade: '-',
    indicacao: 'Desde o nascimento',
    preco: 'R$ 259,90',
    img: '/trocador.png',
  },
  cadeiracarro: {
    nome: 'Cadeirinha para carro',
    marca: 'MOLLI',
    descricao:
      'Segurança e conforto com proteção lateral reforçada e assento acolchoado.',
    capacidade: '0+ a 18kg',
    indicacao: '+2 meses',
    preco: 'R$ 799,90',
    img: '/cadeira-carro.png',
  },
  carrinho: {
    nome: 'Carrinho',
    marca: 'BAMBU',
    descricao:
      'Carrinho compacto ideal para passeios diários, fácil de manobrar e guardar.',
    capacidade: 'Até 15kg',
    indicacao: '+5 meses',
    preco: 'R$ 1.099,90',
    img: '/carrinho.png',
  },
};

export default function DetalhesProduto({ params }) {
  const { slug } = use(params);

  const produto = produtos[slug];

  return (
    <>
      <NavClient />
      <main>
        <div className="detalhes-container">
          <div className="detalhes-card">
            <button
              onClick={() => window.history.back()}
              className="botao-voltar"
            >
              voltar
            </button>

            <div className="imagem">
              <Image
                src={produto.img}
                alt={produto.nome}
                width={300}
                height={300}
                className="imagem-produto"
              />
            </div>

            <div className="info">
              <h2 className="nome">{produto.nome}</h2>
              <p className="marca">{produto.marca}</p>

              <p>
                <span>descrição:</span> {produto.descricao}
              </p>

              {produto.capacidade !== '-' && (
                <p>
                  <span>capacidade:</span> {produto.capacidade}
                </p>
              )}

              <p>
                <span>indicação:</span> {produto.indicacao}
              </p>

              <p>
                <span>preço:</span> {produto.preco}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
