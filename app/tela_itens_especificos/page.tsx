"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

export default function StockIOHome() {
  const categories = [
    "Celulares",
    "Notebooks",
    "TVs",
    "Acessórios",
    "Outros",
  ];

  const products = [
    {
      name: "Notebook Lenovo IdeaPad Slim 3",
      price: "R$3.899,99",
      status: "DISPONÍVEL",
      statusColor: "text-[#CCFF00]",
      img: "/NotebookLenovo.jpg",
    },
    {
      name: "Samsung Galaxy Book4",
      price: "R$8.549,99",
      status: "INDISPONÍVEL",
      statusColor: "text-red-500",
      img: "/GalaxyBook.png",
    },
    {
      name: "Apple iPhone 15",
      price: "R$4.769,10",
      status: "DISPONÍVEL",
      statusColor: "text-[#CCFF00]",
      img: "/Iphone15.jpeg",
    },
    {
      name: "Smart TV Philips 50'' 4K",
      price: "R$1.229,00",
      status: "DISPONÍVEL",
      statusColor: "text-[#CCFF00]",
      img: "/SmartTVPhillips.jpg",
    },
    {
      name: "Xbox Series X",
      price: "R$3.599,99",
      status: "DISPONÍVEL",
      statusColor: "text-[#CCFF00]",
      img: "/XboxSeries.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7E8] font-sans text-black pb-20">
      
      {/* CSS */}
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

      {/* HERO SECTION */}
      <div className="p-4">
        <div className="bg-black text-white rounded-[40px] px-16 pt-10 pb-0 relative overflow-hidden min-h-[430px] flex flex-col">

          {/* HEADER */}
          <nav className="flex justify-between items-center relative z-10 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#CCFF00] rounded-sm"></div>

              <h1 className="text-3xl font-black italic tracking-tighter">
                STOCK.IO
              </h1>
            </div>

            <div className="flex items-center gap-8">
              <button className="text-sm font-bold hover:text-gray-300 transition">
                LOGIN
              </button>

              <button className="bg-[#6600FF] text-white px-8 py-3 rounded-full font-extrabold text-xs tracking-widest uppercase shadow-lg hover:scale-105 transition">
                CADASTRE-SE
              </button>
            </div>
          </nav>

          {/* CONTEÚDO */}
          <div className="relative flex-1 flex justify-between items-end">

            {/* TEXTO */}
            <div className="relative z-10 max-w-[620px] ml-65 self-center -mt-16">
              <h2 className="titulo-principal">
                O universo da tecnologia <br />
                <span className="titulo-sub-linha">
                  em um só lugar
                </span>
              </h2>
            </div>

            {/* MASCOTE */}
          <div className="absolute right-8 -bottom-100">
          <img
            src="/Mascote2.png"
            alt="Mascote Stock.io"
            className="w-[320px] object-contain"
          />
        </div>
          </div>
        </div>
      </div>

      {/* BUSCA */}
      <section className="max-w-7xl mx-auto mt-12 px-6">
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Procurar por..."
              className="w-full py-5 px-10 rounded-full border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-sm outline-none text-gray-500"
            />

            <Search className="absolute right-8 top-5 text-gray-300 w-5 h-5" />
          </div>
        </div>

        {/* CATEGORIAS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              className="bg-white px-10 py-3.5 rounded-full text-sm font-bold text-[#6600FF] shadow-sm hover:scale-105 transition-all"
            >
              {cat}
            </button>
          ))}

          <div className="relative min-w-[220px]">
            <button className="bg-white w-full px-10 py-3.5 rounded-full text-sm font-bold text-[#6600FF] shadow-sm flex justify-between items-center">
              ordenar por
              <ChevronDown className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map((prod, index) => (
            <div
              key={index}
              className="bg-white rounded-[45px] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-gray-100"
            >
              <div className="h-36 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="max-h-full object-contain"
                />
              </div>

              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {prod.name}
              </h3>

              <p className="font-black text-2xl mb-3">
                {prod.price}
              </p>

              <span
                className={`text-[11px] font-black tracking-[0.2em] ${prod.statusColor}`}
              >
                {prod.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}