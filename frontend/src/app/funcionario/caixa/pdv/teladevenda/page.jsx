// pages/index.js
"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Plus,
  Minus,
  Search,
  CreditCard,
  Wallet,
  QrCode,
  ArrowRight,
  Check,
  SlidersHorizontal,
  X,
  Computer,
  ArrowLeft,
} from "lucide-react";

import { toast, Toaster } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function PDVPage() {
  const produtos = [
    {
      id: 1,
      nome: "Macacão feminino",
      preco: 250.5,
      categoria: "roupas",
      imagem: "https://placehold.co/400x400?text=Macacão",
    },
    {
      id: 2,
      nome: "Camisa masculina",
      preco: 120.0,
      categoria: "roupas",
      imagem: "https://placehold.co/400x400?text=Camisa",
    },
    {
      id: 3,
      nome: "Jaqueta jeans",
      preco: 320.0,
      categoria: "roupas",
      imagem: "https://placehold.co/400x400?text=Jaqueta",
    },
    {
      id: 4,
      nome: "Calça social",
      preco: 210.0,
      categoria: "roupas",
      imagem: "https://placehold.co/400x400?text=Calça",
    },
    {
      id: 5,
      nome: "Vestido floral",
      preco: 275.0,
      categoria: "roupas",
      imagem: "https://placehold.co/400x400?text=Vestido",
    },
    {
      id: 6,
      nome: "Sabonete artesanal",
      preco: 15.9,
      categoria: "cuidados",
      imagem: "https://placehold.co/400x400?text=Sabonete",
    },
    {
      id: 7,
      nome: "Perfume suave",
      preco: 89.9,
      categoria: "cuidados",
      imagem: "https://placehold.co/400x400?text=Perfume",
    },
    {
      id: 8,
      nome: "Creme hidratante",
      preco: 49.9,
      categoria: "cuidados",
      imagem: "https://placehold.co/400x400?text=Creme",
    },
    {
      id: 9,
      nome: "Shampoo natural",
      preco: 39.5,
      categoria: "cuidados",
      imagem: "https://placehold.co/400x400?text=Shampoo",
    },
    {
      id: 10,
      nome: "Travesseiro premium",
      preco: 180.0,
      categoria: "conforto",
      imagem: "https://placehold.co/400x400?text=Travesseiro",
    },
    {
      id: 11,
      nome: "Cobertor térmico",
      preco: 210.0,
      categoria: "conforto",
      imagem: "https://placehold.co/400x400?text=Cobertor",
    },
    {
      id: 12,
      nome: "Pijama de algodão",
      preco: 140.0,
      categoria: "conforto",
      imagem: "https://placehold.co/400x400?text=Pijama",
    },
    {
      id: 13,
      nome: "Manta de lã",
      preco: 165.0,
      categoria: "conforto",
      imagem: "https://placehold.co/400x400?text=Manta",
    },
    {
      id: 14,
      nome: "Cinto de couro",
      preco: 80.0,
      categoria: "acessorios",
      imagem: "https://placehold.co/400x400?text=Cinto",
    },
    {
      id: 15,
      nome: "Relógio digital",
      preco: 350.0,
      categoria: "acessorios",
      imagem: "https://placehold.co/400x400?text=Relógio",
    },
  ];

  const [carrinho, setCarrinho] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [metodo, setMetodo] = useState("");
  const [parcelas, setParcelas] = useState("3x de 109,99/mês");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [erroCampos, setErroCampos] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Filtragem e busca
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const filtroOk = filtro === "todos" || p.categoria === filtro;
      const buscaOk = p.nome.toLowerCase().includes(busca.toLowerCase());
      return filtroOk && buscaOk;
    });
  }, [filtro, busca]);

  const adicionarCarrinho = (produto) => {
    const itemExistente = carrinho.find((i) => i.id === produto.id);
    if (itemExistente) {
      setCarrinho(
        carrinho.map((i) =>
          i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, qtd: 1 }]);
    }
  };

  const alterarQtd = (id, delta) => {
    setCarrinho(
      carrinho.map((i) =>
        i.id === id ? { ...i, qtd: Math.max(i.qtd + delta, 1) } : i
      )
    );
  };

  const removerProduto = (id) => {
    setCarrinho(carrinho.filter((i) => i.id !== id));
  };

  const subtotal = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0),
    [carrinho]
  );

  const pagar = () => {
    if (metodo === "crédito" && etapa === 1) {
      setEtapa(2);
    } else {
      setPagamentoOpen(false);
      toast.success("Compra realizada com sucesso!", {
        description: `Pagamento via ${metodo || "pix"}`,
      });
      setCarrinho([]);
      setEtapa(1);
      setMetodo("");
    }
  };

  return (
    <div className="p-6 flex gap-4 flex-wrap lg:flex-nowrap bg-[#f9faf9]">
      <Toaster richColors position="top-right" />

      {/* Lado Esquerdo */}
      <div className="flex-1 space-y-4 w-full lg:w-auto">
        {/* Barra de busca */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4 justify-between">
            <p className="flex text-[#8faaa3] p-4 items-center text-4xl">
               <ArrowLeft
    className="w-10 h-10 mr-4 cursor-pointer hover:text-[#566363]"
    onClick={() => window.history.back()} // Volta para a página anterior
  />
              <Computer className="w-20 h-20 mr-2" />
              <span className="text-[#566363] mr-2 font-bold">Ponto</span>de
              venda
            </p>
            <div className="flex gap-3">
              <Input
                placeholder="Digite nome ou código..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="rounded-full w-90 h-12 bg-[#e7eeec]"
              />
              <Button
                variant="ghost"
                className="bg-[#90A89A] text-white rounded-full mt-[2.5px] ml-[3px] w-12 h-12"
              >
                <Search />
              </Button>
            </div>
          </div>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 h-[450px] overflow-y-auto">
            {produtosFiltrados.map((p) => (
              <Card
                key={p.id}
                className="text-center border-[#90A89A] hover:shadow-md transition cursor-pointer max-h-90 gap-2 border-2"
                onClick={() => adicionarCarrinho(p)}
              >
                <CardContent className="p-4">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="w-full mb-2 rounded-lg"
                  />
                  <p className="text-xl text-[#90A89A]">{p.nome}</p>
                  <p className="font-semibold text-[#90A89A]">
                    R$ {p.preco.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 p-3 select-none justify-between">
          <button
            onClick={() => console.log("Abrir filtros")}
            className="flex items-center gap-2 border-2 border-[#90A89A] text-[#8faaa3] px-5 py-2 rounded-xl text-[16px] w-full sm:w-auto"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>

          <button
            onClick={() => setFiltro("todos")}
            className="text-[#90A89A] font-semibold underline hover:opacity-80 transition text-[16px] p-4 cursor-pointer border-0 shadow-none"
          >
            Limpar filtro
          </button>
        </div>

        {/* Filtro de categorias */}
        <div className="flex flex-wrap justify-around rounded-xl p-3 gap-3">
          {[
            {
              label: "acessorios",
              icon: (
                <img
                  src="/IMG/iconsPDV/acessorios.png"
                  alt="acessorios"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ),
            },
            {
              label: "roupas",
              icon: (
                <img
                  src="/IMG/iconsPDV/roupas.png"
                  alt="roupas"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ),
            },
            {
              label: "cuidados",
              icon: (
                <img
                  src="/IMG/iconsPDV/cuidado.png"
                  alt="cuidados"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ),
            },
            {
              label: "conforto",
              icon: (
                <img
                  src="/IMG/iconsPDV/conforto.png"
                  alt="conforto"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ),
            },
          ].map((f) => (
            <Tooltip key={f.label}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setFiltro(f.label)}
                  className={`flex flex-col items-center justify-center border-2 border-[#90A89A]
         bg-white rounded-xl w-70 h-28 transition-all duration-200
          hover:border-4 ${filtro === f.label ? "border-4" : ""}`}
                >
                  {f.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#90A89A] text-white shadow-none px-2 py-1 rounded-md">
                <p>{f.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Lado Direito - Checkout */}
      <div className="w-full sm:w-full lg:w-[420px] bg-white border rounded-xl p-4 flex flex-col justify-between">
  <div>
   <p className="flex text-[#8faaa3] p-4 items-center text-4xl">
              <span className="text-[#566363] mr-2 font-bold">Check</span>out
            </p>
    
    {/* Cabeçalho com os títulos */}
    <div className="grid grid-cols-4 gap-4 font-semibold items-center text-center mb-2">
      <span className="text-sm">Nome</span>
      <span className="text-sm">Qnt</span>
      <span className="text-sm">Preço</span>
      <span className="text-sm sr-only">Ação</span>
    </div>

    {carrinho.length === 0 && (
      <p className="text-gray-400 text-sm text-center">Carrinho vazio</p>
    )}

    {/* Itens do carrinho */}
    {carrinho.map((p) => (
      <div key={p.id} className="grid grid-cols-4 gap-4 items-center text-center mb-2">
        {/* Nome */}
        <span className="text-sm">{p.nome}</span>

        {/* Quantidade com botões de incremento e decremento */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" className="p-0" onClick={() => alterarQtd(p.id, -1)}>
            <Minus size={16} />
          </Button>
          <span>{p.qtd}</span>
          <Button variant="ghost" className="p-0" onClick={() => alterarQtd(p.id, +1)}>
            <Plus size={16} />
          </Button>
        </div>

        {/* Preço */}
        <span className="text-sm">R${(p.preco * p.qtd).toFixed(2)}</span>

        {/* Ação (remover) */}
        <Button variant="ghost" size="sm" onClick={() => removerProduto(p.id)}>
          <X size={14} className="text-red-400" />
        </Button>
      </div>
    ))}
  </div>

  {/* Subtotal e Total */}
  {carrinho.length > 0 && (
    <div className="mt-auto bg-[#90A89A]/10 rounded-md p-2 space-y-1">
      <div className="flex justify-between font-semibold text-[#90A89A]">
        <span>Subtotal</span>
        <span>R${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-[#90A89A] text-lg">
        <span>Total</span>
        <span>R${subtotal.toFixed(2)}</span>
      </div>
    </div>
  )}

  {/* Botão de pagar */}
  <Button
    disabled={carrinho.length === 0}
    className="bg-[#90A89A] text-white mt-4 hover:bg-[#A9BDB0]"
    onClick={() => setPagamentoOpen(true)}
  >
    Pagar (R${subtotal.toFixed(2)})
  </Button>
</div>


      {/* Modal de Pagamento */}
      <Dialog open={pagamentoOpen} onOpenChange={setPagamentoOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          {etapa === 1 && (
            <>
              <p className="flex text-[#8faaa3] p-4 ml-6 items-center text-4xl">
              <span className="text-[#566363] mr-2 font-bold">Metodo</span>de pagamento
            </p>

              <div className="flex justify-center gap-3 mb-4">
                {[{ icon: <CreditCard />, label: "crédito" }, { icon: <Wallet />, label: "débito" }, { icon: <QrCode />, label: "pix" }].map(
                  (m) => (
                    <Button
                      key={m.label}
                      variant={metodo === m.label ? "default" : "outline"}
                      onClick={() => {
                        setMetodo(m.label);
                        setEtapa(1);
                      }}
                      className={`border-[#90A89A] text-[#90A89A] ${metodo === m.label && "bg-[#90A89A] text-white"}`}
                    >
                      {m.icon}
                      {m.label}
                    </Button>
                  )
                )}
              </div>

              {/* Campos do cartão */}
              {(metodo === "crédito" || metodo === "débito") && (
                <div className="space-y-3 mb-4">
                  <Input
                    placeholder="Número do cartão"
                    className={`border ${erroCampos && !numero ? "border-red-400" : "border-[#90A89A]"}`}
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Validade (MM/AA)"
                      className={`border ${erroCampos && !validade ? "border-red-400" : "border-[#90A89A]"}`}
                      value={validade}
                      onChange={(e) => setValidade(e.target.value)}
                    />
                    <Input
                      placeholder="CVV"
                      className={`border ${erroCampos && !cvv ? "border-red-400" : "border-[#90A89A]"}`}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <Button
                disabled={!metodo}
                className="w-full bg-[#90A89A] text-white hover:bg-[#A9BDB0]"
                onClick={() => {
                  if (metodo === "crédito" || metodo === "débito") {
                    if (!numero || !validade || !cvv) {
                      setErroCampos(true);
                      toast.error("Preencha todos os campos do cartão corretamente.");
                      return;
                    }
                  }
                  setErroCampos(false);
                  setEtapa(2);
                  if (metodo === "pix") {
                    setCarregando(true);
                    setTimeout(() => setCarregando(false), 2000);
                  }
                }}
              >
                Próximo <ArrowRight className="ml-2" />
              </Button>
            </>
          )}

          {etapa === 2 && (
            <>
              {/* Botão de voltar */}
              <Button
                variant="ghost"
                className="absolute top-3 left-3 text-[#90A89A] hover:bg-transparent"
                onClick={() => setEtapa(1)}
              >
                <ArrowRight className="rotate-180" />
              </Button>

              {/* PIX */}
              {metodo === "pix" && (
                <>
                  <DialogHeader className="text-[#90A89A] font-semibold text-center mb-4">
                    Pagamento via PIX
                  </DialogHeader>

                  {carregando ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="w-12 h-12 border-4 border-[#90A89A]/30 border-t-[#90A89A] rounded-full animate-spin"></div>
                      <p className="text-[#90A89A] mt-4">Gerando QR Code...</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?data=Pagamento%20de%20R$${subtotal.toFixed(2)}&size=180x180`}
                          alt="QR Code PIX"
                          className="rounded-lg border border-[#90A89A]"
                        />
                      </div>
                      <Button className="w-full bg-[#90A89A] text-white hover:bg-[#A9BDB0]" onClick={pagar}>
                        Confirmar pagamento <Check className="ml-2" />
                      </Button>
                    </>
                  )}
                </>
              )}

              {/* DÉBITO */}
              {metodo === "débito" && (
                <>
                  <DialogHeader className="text-[#90A89A] font-semibold text-center mb-4">
                    Confirmar pagamento no débito
                  </DialogHeader>
                  <p className="text-center text-[#90A89A] mb-4">
                    Valor total: <strong>R${subtotal.toFixed(2)}</strong>
                  </p>
                  <Button className="w-full bg-[#90A89A] text-white hover:bg-[#A9BDB0]" onClick={pagar}>
                    Finalizar compra <Check className="ml-2" />
                  </Button>
                </>
              )}

              {/* CRÉDITO */}
              {metodo === "crédito" && (
                <>
                  <DialogHeader className="text-[#90A89A] font-bold text-center mb-4 ml-6">
                    Parcelamento
                  </DialogHeader>

                  <div className="space-y-2 mb-4">
                    {Array.from({ length: 3 }, (_, i) => i + 1).map((n) => {
                      const valorParcela = subtotal / n;
                      return (
                        <label key={n} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="parcelas"
                            checked={parcelas === `${n}x de ${valorParcela.toFixed(2)}/mês`}
                            onChange={() => setParcelas(`${n}x de ${valorParcela.toFixed(2)}/mês`)}
                            className="accent-[#90A89A] w-4 h-4"
                          />
                          <span className="text-[#90A89A]">
                            {n}x de R${valorParcela.toFixed(2)} sem juros
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <Button className="w-full bg-[#90A89A] text-white hover:bg-[#A9BDB0]" onClick={pagar}>
                    Finalizar compra <Check className="ml-2" />
                  </Button>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}