"use client";

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import CardProduto from "@/src/components/CardProduto";

const ALL_PRODUCTS = [
  { name: "Notebook Lenovo IdeaPad Slim 3", price: "R$3.899,99", status: "DISPONÍVEL"   as const, img: "/NotebookLenovo.jpg" },
  { name: "Samsung Galaxy Book4",           price: "R$8.549,99", status: "INDISPONÍVEL" as const, img: "/GalaxyBook.png" },
  { name: "Apple iPhone 15",               price: "R$4.769,10", status: "DISPONÍVEL"   as const, img: "/Iphone15.jpeg" },
  { name: "Smart TV Philips 50'' 4K",      price: "R$1.229,00", status: "DISPONÍVEL"   as const, img: "/SmartTVPhillips.jpg" },
  { name: "Xbox Series X",                 price: "R$3.599,99", status: "DISPONÍVEL"   as const, img: "/XboxSeries.jpeg" },
  { name: "Macbook Air",                   price: "R$15.899,99", status: "DISPONÍVEL"  as const, img: "/MacbookAir.png" },
  { name: "iPhone 16",                     price: "R$4.598,99", status: "INDISPONÍVEL" as const, img: "/Iphone16.png" },
  { name: "S25 Ultra",                     price: "R$5.769,10", status: "DISPONÍVEL"   as const, img: "/S25Ultra.png" },
  { name: "iPad",                          price: "R$7.859,00", status: "DISPONÍVEL"   as const, img: "/Ipad.png" },
  { name: "Headset Gamer",                 price: "R$899,99",   status: "INDISPONÍVEL" as const, img: "/HeadsetGamer.png" },
  { name: "Comp. Lenovo",                  price: "R$649,99",   status: "INDISPONÍVEL" as const, img: "/CompLenovo.jpeg" },
  { name: "Nintendo Switch 2",             price: "R$4.799,99", status: "INDISPONÍVEL" as const, img: "/NintendoSwitch.jpeg" },
  { name: "iPhone 15",                     price: "R$4.089,10", status: "DISPONÍVEL"   as const, img: "/Iphone15b.png" },
  { name: "JBL",                           price: "R$1.399,00", status: "DISPONÍVEL"   as const, img: "/JBL.jpeg" },
  { name: "Xbox Series S",                 price: "R$1.499,99", status: "DISPONÍVEL"   as const, img: "/XboxSeriesS.jpeg" },
];

const LOJAS = [
  { name: "abtec",         categoria: "eletrônicos", img: "/lojaAbtec.png" },
  { name: "Repiit",        categoria: "eletrônicos", img: "/lojaRepiit.png" },
  { name: "Bersay",        categoria: "eletrônicos", img: "/lojaBersay.png" },
  { name: "electree",      categoria: "eletrônicos", img: "/lojaElectree.png" },
  { name: "Speed X",       categoria: "eletrônicos", img: "/lojaSpeedX.png" },
  { name: "Next Computer", categoria: "eletrônicos", img: "/lojaNextComputer.png" },
   { name: "Oh My!",         categoria: "eletrônicos", img: "/lojaAbtec.png" },
   { name: "Lexut",        categoria: "eletrônicos", img: "/lojaRepiit.png" },
];

const MAIS_POPULARES    = ALL_PRODUCTS.slice(0, 5);
const RECEM_ADICIONADOS = ALL_PRODUCTS.slice(-5);
const CATEGORIES = ["Celulares", "Notebooks", "TVs", "Acessórios", "Outros"];
const PER_PAGE = 5;

// ─── CARROSSEL ────────────────────────────────────────────────────────────────
function CarrosselLojas() {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX  = useRef(0);
  const scrollL  = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current   = e.clientX;
    scrollL.current  = ref.current?.scrollLeft ?? 0;
    if (ref.current) ref.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return;
    e.preventDefault();
    ref.current.scrollLeft = scrollL.current - (e.clientX - startX.current);
  };
  const stopDrag = () => {
    dragging.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", padding: "48px 48px" }}>
      <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 900, marginBottom: "40px" }}>
        Principais Lojas
      </h2>
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          display: "flex",
          gap: "48px",
          overflowX: "scroll",
          cursor: "grab",
          scrollbarWidth: "none",
          userSelect: "none",
          paddingBottom: "8px",
        }}
      >
        {LOJAS.map((loja, i) => (
          <div key={i} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={{
              width: "130px", height: "130px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img src={loja.img} alt={loja.name} style={{ maxWidth: "80px", maxHeight: "80px", objectFit: "contain" }} />
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>{loja.name}</span>
            <span style={{ color: "#6600FF", fontSize: "13px", fontWeight: 600 }}>{loja.categoria}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEÇÃO DE PRODUTOS ────────────────────────────────────────────────────────
function SecaoProdutos({ titulo, produtos }: { titulo: string; produtos: typeof ALL_PRODUCTS }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "24px", color: "#1a1a1a" }}>
        {titulo}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {produtos.map((prod, i) => (
          <CardProduto key={i} {...prod} />
        ))}
      </div>
    </div>
  );
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────────
export default function StockIOHome() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ALL_PRODUCTS.length / PER_PAGE);
  const paginated  = ALL_PRODUCTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F9F7E8] font-sans text-black pb-20">

      <style jsx>{`
        .titulo-principal {
          color: white;
          font-size: clamp(42px, 6vw, 78px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -3px;
        }
        .titulo-sub-linha {
          font-weight: 400;
          letter-spacing: -1px;
        }
      `}</style>

      {/* HERO */}
      <div className="p-4">
        <div className="bg-black text-white px-16 pt-10 pb-0 relative overflow-hidden min-h-[430px] flex flex-col">
          <Navbar />
          <div className="relative flex-1 flex justify-between items-end">
            <div className="relative z-10 max-w-[620px] ml-65 self-center -mt-16">
              <h2 className="titulo-principal">
                O universo da tecnologia <br />
                <span className="titulo-sub-linha">em um só lugar</span>
              </h2>
            </div>
            <div className="absolute right-8 -bottom-100">
              <img src="/Mascote2.png" alt="Mascote" className="w-[270px] object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO COM CONTAINER */}
      <div className="max-w-7xl mx-auto px-6">

        {/* CATEGORIAS */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-12">
          {CATEGORIES.map((cat) => (
            <button key={cat} className="bg-white px-10 py-3.5 rounded-full text-sm font-bold text-[#6600FF] shadow-sm hover:scale-105 transition-all">
              {cat}
            </button>
          ))}
          <button className="bg-white px-10 py-3.5 rounded-full text-sm font-bold text-[#6600FF] shadow-sm flex items-center gap-2 min-w-[180px] justify-between">
            ordenar por <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* PRODUTOS PAGINADOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {paginated.map((prod, i) => (
            <CardProduto key={i} {...prod} />
          ))}
        </div>

        {/* PAGINAÇÃO */}
        <div className="flex justify-center items-center gap-2 mb-16">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-2 font-bold text-lg disabled:text-gray-300 hover:text-[#6600FF] transition">
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-full font-bold text-sm transition ${page === n ? "bg-[#6600FF] text-white" : "hover:text-[#6600FF]"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-3 py-2 font-bold text-lg disabled:text-gray-300 hover:text-[#6600FF] transition">
            {">"}
          </button>
        </div>

      </div>{/* fim max-w-7xl */}

      {/* CARROSSEL — fora do container para ocupar largura total */}
      <CarrosselLojas />

      {/* MAIS POPULARES E RECÉM ADICIONADOS */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <SecaoProdutos titulo="Mais populares" produtos={MAIS_POPULARES} />
        <SecaoProdutos titulo="Recém adicionados" produtos={RECEM_ADICIONADOS} />
      </div>

    </div>
  );
}