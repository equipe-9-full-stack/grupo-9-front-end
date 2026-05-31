"use client";

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import CardProduto from "@/src/components/CardProduto";

// ─── DADOS MOCKADOS (substituir por fetch do banco futuramente) ───────────────

const ALL_PRODUCTS = [
  { name: "Notebook Lenovo IdeaPad Slim 3", price: "R$3.899,99", status: "DISPONÍVEL"   as const, img: "/NotebookLenovo.jpg" },
  { name: "Samsung Galaxy Book4",           price: "R$8.549,99", status: "INDISPONÍVEL" as const, img: "/GalaxyBook.png" },
  { name: "Apple iPhone 15",               price: "R$4.769,10", status: "DISPONÍVEL"   as const, img: "/Iphone15.jpeg" },
  { name: "Smart TV Philips 50'' 4K",      price: "R$1.229,00", status: "DISPONÍVEL"   as const, img: "/SmartTVPhillips.jpg" },
  { name: "Xbox Series X",                 price: "R$3.599,99", status: "DISPONÍVEL"   as const, img: "/XboxSeries.jpeg" },
  { name: "Macbook Air",                   price: "R$15.899,99", status: "DISPONÍVEL"  as const, img: "/MacbookAir.jpg" },
  { name: "iPhone 16",                     price: "R$4.598,99", status: "INDISPONÍVEL" as const, img: "/Iphone16.jpeg" },
  { name: "S25 Ultra",                     price: "R$5.769,10", status: "DISPONÍVEL"   as const, img: "/S25Ultra.jpeg" },
  { name: "iPad",                          price: "R$7.859,00", status: "DISPONÍVEL"   as const, img: "/Ipad.jpeg" },
  { name: "Headset Gamer",                 price: "R$899,99",   status: "INDISPONÍVEL" as const, img: "/HeadsetGamer.jpeg" },
  { name: "Comp. Lenovo",                  price: "R$649,99",   status: "INDISPONÍVEL" as const, img: "/CompLenovo.jpeg" },
  { name: "Nintendo Switch 2",             price: "R$4.799,99", status: "INDISPONÍVEL" as const, img: "/NintendoSwitch.jpeg" },
  { name: "iPhone 15",                     price: "R$4.089,10", status: "DISPONÍVEL"   as const, img: "/Iphone15b.jpeg" },
  { name: "JBL",                           price: "R$1.399,00", status: "DISPONÍVEL"   as const, img: "/JBL.jpeg" },
  { name: "Xbox Series S",                 price: "R$1.499,99", status: "DISPONÍVEL"   as const, img: "/XboxSeriesS.jpeg" },
];

const LOJAS = [
  { name: "Kabum",   img: "/lojaKabum.png" },
  { name: "Pichau",  img: "/lojaPichau.png" },
  { name: "Cellar",  img: "/lojaCellar.png" },
  { name: "Speed",   img: "/lojaSpeed.png" },
  { name: "Nvidia",  img: "/lojaNvidia.png" },
  { name: "Kabum",   img: "/lojaKabum.png" },
  { name: "Pichau",  img: "/lojaPichau.png" },
];

// Mais populares = 5 primeiros / Recém adicionados = 5 últimos
const MAIS_POPULARES  = ALL_PRODUCTS.slice(0, 5);
const RECEM_ADICIONADOS = ALL_PRODUCTS.slice(-5);

const CATEGORIES = ["Celulares", "Notebooks", "TVs", "Acessórios", "Outros"];
const PER_PAGE = 5;


function CarrosselLojas() {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const stopDrag = () => { isDragging.current = false; };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        cursor: "grab",
        scrollbarWidth: "none",
        userSelect: "none",
        padding: "8px 0",
      }}
    >
      {LOJAS.map((loja, i) => (
        <div key={i} style={{
          flexShrink: 0,
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "140px",
          height: "80px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          <img src={loja.img} alt={loja.name} style={{ maxHeight: "40px", objectFit: "contain" }} />
        </div>
      ))}
    </div>
  );
}


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


export default function StockIOHome() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ALL_PRODUCTS.length / PER_PAGE);
  const paginated = ALL_PRODUCTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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

        {/* TODOS OS PRODUTOS (paginado) */}
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

        {/* PRINCIPAIS LOJAS */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "24px", color: "#1a1a1a" }}>
            Principais Lojas
          </h2>
          <CarrosselLojas />
        </div>

        {/* MAIS POPULARES */}
        <SecaoProdutos titulo="Mais populares" produtos={MAIS_POPULARES} />

        {/* RECÉM ADICIONADOS */}
        <SecaoProdutos titulo="Recém adicionados" produtos={RECEM_ADICIONADOS} />

      </div>
    </div>
  );
}