"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

// Função auxiliar para converter imagem em base64
async function carregarImagemComoBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default function PDVPage() {
  const produtos = [
    { id: 1, nome: "Macacão feminino", preco: 250.5, categoria: "roupas", imagem: "https://placehold.co/400x400?text=Macacão" },
    { id: 2, nome: "Camisa masculina", preco: 120.0, categoria: "roupas", imagem: "https://placehold.co/400x400?text=Camisa" },
    { id: 3, nome: "Jaqueta jeans", preco: 320.0, categoria: "roupas", imagem: "https://placehold.co/400x400?text=Jaqueta" },
    { id: 4, nome: "Calça social", preco: 210.0, categoria: "roupas", imagem: "https://placehold.co/400x400?text=Calça" },
    { id: 5, nome: "Vestido floral", preco: 275.0, categoria: "roupas", imagem: "https://placehold.co/400x400?text=Vestido" },
    { id: 6, nome: "Sabonete artesanal", preco: 15.9, categoria: "cuidados", imagem: "https://placehold.co/400x400?text=Sabonete" },
    { id: 7, nome: "Perfume suave", preco: 89.9, categoria: "cuidados", imagem: "https://placehold.co/400x400?text=Perfume" },
    { id: 8, nome: "Creme hidratante", preco: 49.9, categoria: "cuidados", imagem: "https://placehold.co/400x400?text=Creme" },
    { id: 9, nome: "Shampoo natural", preco: 39.5, categoria: "cuidados", imagem: "https://placehold.co/400x400?text=Shampoo" },
    { id: 10, nome: "Travesseiro premium", preco: 180.0, categoria: "conforto", imagem: "https://placehold.co/400x400?text=Travesseiro" },
    { id: 11, nome: "Cobertor térmico", preco: 210.0, categoria: "conforto", imagem: "https://placehold.co/400x400?text=Cobertor" },
    { id: 12, nome: "Pijama de algodão", preco: 140.0, categoria: "conforto", imagem: "https://placehold.co/400x400?text=Pijama" },
    { id: 13, nome: "Manta de lã", preco: 165.0, categoria: "conforto", imagem: "https://placehold.co/400x400?text=Manta" },
    { id: 14, nome: "Cinto de couro", preco: 80.0, categoria: "acessorios", imagem: "https://placehold.co/400x400?text=Cinto" },
    { id: 15, nome: "Relógio digital", preco: 350.0, categoria: "acessorios", imagem: "https://placehold.co/400x400?text=Relógio" },
  ];

  const [carrinho, setCarrinho] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [metodo, setMetodo] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [erroCampos, setErroCampos] = useState(false);
  const [carregando, setCarregando] = useState(false);

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

  // Função que gera a nota fiscal PDF com logo
  async function gerarNotaFiscal(metodo, parcelas, subtotal) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([400, 540]);
    const { height, width } = page.getSize();
    const font = await pdf.embedFont(StandardFonts.Courier);
    let y = height - 60;

    // Carrega a logo
    const logoBase64 = await carregarImagemComoBase64("/IMG/notaFiscal/imgnotafiscal.png"); // Caminho da logo que sera utilizada
    const logoBytes = await fetch(logoBase64).then((res) => res.arrayBuffer());
    const logoImage = await pdf.embedPng(logoBytes);

    // Calcula posição centralizada da logo
    const logoWidth = 100;
    const logoHeight = 40;
    const logoX = (width - logoWidth) / 2;
    const logoY = height - 80;

    // Adiciona logo ao PDF
    page.drawImage(logoImage, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });

    y = logoY - 30;

    const dataAtual = new Date().toLocaleString("pt-BR");

    const escreve = (texto, size = 12, offsetY = 16) => {
      page.drawText(texto, { x: 40, y, size, font, color: rgb(0, 0, 0) });
      y -= offsetY;
    };

    escreve(`Data: ${dataAtual}`);
    escreve("NOTA FISCAL", 16, 24);
    escreve("-------------------------------------");

    carrinho.forEach((item) => {
      escreve(`${item.nome}`);
      escreve(`Qtd: ${item.qtd} | Unit: R$${item.preco.toFixed(2)} | Total: R$${(item.qtd * item.preco).toFixed(2)}`);
      escreve("-------------------------------------");
    });

    escreve(`Subtotal: R$${subtotal.toFixed(2)}`, 12, 18);
    escreve(`Total: R$${subtotal.toFixed(2)}`, 14, 22);

    escreve("----- MÉTODO DE PAGAMENTO -----", 12, 20);

    if (metodo === "pix") {
      escreve("PIX - Pagamento à vista");
    } else if (metodo === "débito") {
      escreve("Cartão de Débito - Pagamento à vista");
    } else if (metodo === "crédito") {
      escreve("Cartão de Crédito");
      if (parcelas) {
        escreve(`Parcelado em ${parcelas}`);
      } else {
        escreve("Pagamento à vista");
      }
    }

    escreve("-------------------------------------");
    escreve("Obrigado pela preferência!", 10, 22);

    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, `Nota_Fiscal_${Date.now()}.pdf`);
  }

  // 💳 Finaliza e gera nota
  const pagar = () => {
    if (metodo === "crédito" && etapa === 1) {
      setEtapa(2);
    } else {
      setPagamentoOpen(false);
      toast.success("Compra realizada com sucesso!", {
        description: `Pagamento via ${metodo || "pix"}`,
      });
      gerarNotaFiscal(metodo, parcelas, subtotal);
      setCarrinho([]);
      setEtapa(1);
      setMetodo("");
      setParcelas("");
    }
  };


  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-[#f9faf9]">
      <Toaster richColors position="top-right" />

      {/* LADO ESQUERDO */}
      <div className="flex-1 flex flex-col space-y-4 p-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ArrowLeft
              className="w-8 h-8 cursor-pointer hover:text-[#566363]"
              onClick={() => window.history.back()}
            />
            <p className="flex text-[#8faaa3] items-center text-3xl md:text-4xl">
              <Computer className="w-10 h-10 mr-2" />
              <span className="text-[#566363] mr-2 font-bold">Ponto</span>de
              venda
            </p>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Digite nome ou código..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-full w-[220px] md:w-[350px] h-12 bg-[#e7eeec]"
            />
            <Button className="bg-[#90A89A] text-white rounded-full w-12 h-12">
              <Search />
            </Button>
          </div>
        </div>

        {/* Produtos */}
        <div className="bg-white border rounded-xl p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {produtosFiltrados.map((p) => (
              <Card
                key={p.id}
                className="text-center border-[#90A89A] hover:shadow-md transition cursor-pointer border-2"
                onClick={() => adicionarCarrinho(p)}
              >
                <CardContent className="p-4">
                  <img src={p.imagem} alt={p.nome} className="w-full mb-2 rounded-lg" />
                  <p className="text-xl text-[#90A89A]">{p.nome}</p>
                  <p className="font-semibold text-[#90A89A]">R$ {p.preco.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filtros e categorias */}
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 border-2 border-[#90A89A] text-[#8faaa3] px-5 py-2 rounded-xl text-[18px]">
            <SlidersHorizontal className="w-5 h-5" /> Filtros
          </button>
          <button
            onClick={() => setFiltro("todos")}
            className="text-[#90A89A] font-semibold underline hover:opacity-80 transition text-[18px] cursor-pointer"
          >
            Limpar filtro
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-2">
          {[
            { label: "acessorios", icon: "/IMG/iconsPDV/acessorios.png" },
            { label: "roupas", icon: "/IMG/iconsPDV/roupas.png" },
            { label: "cuidados", icon: "/IMG/iconsPDV/cuidado.png" },
            { label: "conforto", icon: "/IMG/iconsPDV/conforto.png" },
          ].map((f) => (
            <Tooltip key={f.label}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setFiltro(f.label)}
                  className={`flex flex-col items-center justify-center border-2 border-[#90A89A] bg-white rounded-xl h-28 transition-all duration-200 hover:border-4 ${
                    filtro === f.label ? "border-4" : ""
                  }`}
                >
                  <img src={f.icon} alt={f.label} className="w-20 h-20 object-contain" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#90A89A] text-white shadow-none px-2 py-1 rounded-md before:hidden">
                <p>{f.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* CHECKOUT */}
      <div className="w-[360px] bg-white border-l rounded-l-xl p-4 flex flex-col overflow-hidden flex-shrink-0">
        <div className="flex-1 overflow-y-auto pr-2">
          <h2 className="text-[#90A89A] font-semibold text-xl mb-2">Check out</h2>
          <div className="grid grid-cols-4 gap-4 font-semibold mb-2">
            <span>Nome</span><span>Qntd</span><span>Preço</span><span>Ação</span>
          </div>

          {carrinho.length === 0 ? (
            <p className="text-gray-400 text-sm text-center">Carrinho vazio</p>
          ) : (
            carrinho.map((p) => (
              <div key={p.id} className="grid grid-cols-4 gap-4 items-center text-center mb-2">
                <span className="text-sm">{p.nome}</span>
                <div className="flex items-center justify-center gap-1">
                  <Button variant="ghost" className="p-0" onClick={() => alterarQtd(p.id, -1)}><Minus size={16} /></Button>
                  <span>{p.qtd}</span>
                  <Button variant="ghost" className="p-0" onClick={() => alterarQtd(p.id, +1)}><Plus size={16} /></Button>
                </div>
                <span className="text-sm">R${(p.preco * p.qtd).toFixed(2)}</span>
                <Button variant="ghost" size="sm" onClick={() => removerProduto(p.id)}><X size={14} className="text-red-400" /></Button>
              </div>
            ))
          )}
        </div>

        {/* Totais e botão pagar */}
        {carrinho.length > 0 && (
          <div className="bg-[#90A89A]/10 rounded-md p-2 mt-2 space-y-1">
            <div className="flex justify-between font-semibold text-[#90A89A]">
              <span>Subtotal</span><span>R${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#90A89A] text-lg">
              <span>Total</span><span>R${subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}
        <Button
          disabled={carrinho.length === 0}
          className="bg-[#90A89A] text-white mt-4 w-full hover:bg-[#A9BDB0]"
          onClick={() => setPagamentoOpen(true)}
        >
          Pagar (R${subtotal.toFixed(2)})
        </Button>
      </div>

      {/* POPUP DE PAGAMENTO */}
      <Dialog open={pagamentoOpen} onOpenChange={setPagamentoOpen}>
        <DialogContent className="w-124 h-90 rounded-2xl flex flex-col justify-between">
          <DialogTitle className="sr-only">Pagamento</DialogTitle>
          {etapa === 1 && (
            <>
              <DialogTitle className="text-[#90A89A] text-center font-bold text-2xl mb-4">Método de pagamento</DialogTitle>
              <div className="flex justify-center gap-3 mb-4">
                {[{ icon: <CreditCard />, label: "crédito" }, { icon: <Wallet />, label: "débito" }, { icon: <QrCode />, label: "pix" }].map((m) => (
                  <Button
                    key={m.label}
                    variant={metodo === m.label ? "default" : "outline"}
                    onClick={() => setMetodo(m.label)}
                    className={`border-[#90A89A] text-[#90A89A] cursor-pointer hover:text-[#90A89A] ${metodo === m.label && "bg-[#90A89A] text-white"}`}
                  >
                    {m.icon}{m.label}
                  </Button>
                ))}
              </div>

              {(metodo === "crédito" || metodo === "débito") && (
                <div className="space-y-3 mb-4">
                  <Input placeholder="Número do cartão" value={numero} onChange={(e) => setNumero(e.target.value)}
                    className={`border ${erroCampos && !numero ? "border-red-400" : "border-[#90A89A]"}`} />
                  <div className="flex gap-2">
                    <Input placeholder="Validade (MM/AA)" value={validade} onChange={(e) => setValidade(e.target.value)}
                      className={`border ${erroCampos && !validade ? "border-red-400" : "border-[#90A89A]"}`} />
                    <Input placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)}
                      className={`border ${erroCampos && !cvv ? "border-red-400" : "border-[#90A89A]"}`} />
                  </div>
                </div>
              )}

              <Button
                disabled={!metodo}
                className="w-full bg-[#90A89A] text-white hover:bg-[#A9BDB0]"
                onClick={() => {
                  if ((metodo === "crédito" || metodo === "débito") && (!numero || !validade || !cvv)) {
                    setErroCampos(true);
                    toast.error("Preencha todos os campos do cartão.");
                    return;
                  }
                  setErroCampos(false);
                  setEtapa(2);
                  if (metodo === "pix") {
                    setCarregando(true);
                    setTimeout(() => setCarregando(false), 2000);
                  }
                }}
              >
                Próximo <ArrowRight className="ml-2 mt-auto" />
              </Button>
            </>
          )}

          {etapa === 2 && (
            <>
              <Button variant="ghost" className="absolute top-3 left-3 text-[#90A89A]" onClick={() => setEtapa(1)}>
                <ArrowRight className="rotate-180" />
              </Button>

              {metodo === "pix" && (
                <>
                  <DialogTitle className="text-[#90A89A] font-semibold text-center mb-4">Pagamento via PIX</DialogTitle>
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

              {metodo === "débito" && (
                <>
                  <DialogTitle className="text-[#90A89A] text-center font-semibold mb-4">Confirmar pagamento no débito</DialogTitle>
                  <p className="text-center text-[#90A89A] mb-4">Valor total: <strong>R${subtotal.toFixed(2)}</strong></p>
                  <Button className="w-full bg-[#90A89A] text-white hover:bg-[#A9BDB0]" onClick={pagar}>
                    Finalizar compra <Check className="ml-2" />
                  </Button>
                </>
              )}

              {metodo === "crédito" && (
                <>
                  <DialogTitle className="text-[#90A89A] font-bold text-center mb-4">Parcelamento</DialogTitle>
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
