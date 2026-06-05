'use client';

import { useState } from 'react';
import { 
  ShoppingBag, 
  PlusCircle, 
  Sparkles, 
  Shirt, 
  Laptop, 
  Gamepad2, 
  Baby, 
  Home as HomeIcon 
} from "lucide-react";

import Navbar from '../componentes/Navbar'; 
import Carrossel from '../componentes/Carrossel';

const categories = [
  { name: "Mercado", icon: ShoppingBag },
  { name: "Farmácia", icon: PlusCircle },
  { name: "Beleza", icon: Sparkles },
  { name: "Moda", icon: Shirt },
  { name: "Eletrônicos", icon: Laptop },
  { name: "Jogos", icon: Gamepad2 },
  { name: "Brinquedos", icon: Baby },
  { name: "Casa", icon: HomeIcon },
];

export default function ProfilePage() {
  const [melhoresAvaliados] = useState([
    { id: 1, nome: "Brownie Meio A.", subtitulo: "R$ 4,70", imagem: "/browniem.png", status: "DISPONÍVEL" as const, logoLoja: "/cjr.png" },
    { id: 2, nome: "Brownie Trad.", subtitulo: "R$ 3,80", imagem: "/brownie.png", status: "INDISPONÍVEL" as const, logoLoja: "/cjr.png" }, 
    { id: 3, nome: "Nozes", subtitulo: "R$ 29,99 /kg", imagem: "/nozes.png", status: "DISPONÍVEL" as const, logoLoja: "" },
    { id: 4, nome: "Banana", subtitulo: "R$ 3,99 /kg", imagem: "/banana.png", status: "DISPONÍVEL" as const, logoLoja: "" },
    { id: 5, nome: "Limão Siciliano", subtitulo: "R$ 17,99 /kg", imagem: "/limao.png", status: "INDISPONÍVEL" as const, logoLoja: "" }, 
  ]);

  const [maisBaratos] = useState([
    { id: 6, nome: "Limpador Facial", subtitulo: "R$ 74,99", imagem: "/limpador.png", status: "DISPONÍVEL" as const, logoLoja: "" },
    { id: 7, nome: "Blush", subtitulo: "R$ 199,99", imagem: "/blush.png", status: "INDISPONÍVEL" as const, logoLoja: "/rare.png" },
    { id: 8, nome: "Sérum Facial", subtitulo: "R$ 99,90", imagem: "/serum.png", status: "DISPONÍVEL" as const, logoLoja: "" },
    { id: 9, nome: "Iluminador", subtitulo: "R$ 249,90", imagem: "/iluminador.png", status: "DISPONÍVEL" as const, logoLoja: "/rare.png" },
    { id: 10, nome: "Body Splash", subtitulo: "R$ 179,99", imagem: "/body.png", status: "INDISPONÍVEL" as const, logoLoja: "" },
  ]);

  const [recemAdicionados] = useState([
    { id: 11, nome: "Saia", subtitulo: "R$ 75,99", imagem: "/saia.png", status: "DISPONÍVEL" as const, logoLoja: "/amoca.png" },
    { id: 12, nome: "New Balance", subtitulo: "R$ 399,99", imagem: "/newbalance.png", status: "INDISPONÍVEL" as const, logoLoja: "" },
    { id: 13, nome: "Bota", subtitulo: "R$ 115,90", imagem: "/bota.png", status: "DISPONÍVEL" as const, logoLoja: "" }, 
    { id: 14, nome: "Bolsa", subtitulo: "R$ 349,90", imagem: "/bolsa.png", status: "DISPONÍVEL" as const, logoLoja: "" },
    { id: 15, nome: "Calça Jeans", subtitulo: "R$ 159,99", imagem: "/calca.png", status: "INDISPONÍVEL" as const, logoLoja: "" },
  ]);

  const [lojas] = useState([
    { id: 1, nome: "CJR", subtitulo: "mercado", imagem: "/cjr.png" },
    { id: 2, nome: "Rare Beauty", subtitulo: "beleza", imagem: "/rare.png" },
    { id: 3, nome: "The Croc Brew", subtitulo: "mercado", imagem: "/croc.png" },
    { id: 4, nome: "Mini Reno", subtitulo: "casa", imagem: "/reno.png" },
    { id: 5, nome: "amoca", subtitulo: "moda", imagem: "/amoca.png" },
    { id: 6, nome: "Repiit", subtitulo: "eletrônicos", imagem: "/repiit.png" },
  ]);

  return (
    <div className="min-h-screen bg-[#FDFBF2] text-zinc-800 font-sans antialiased">
      <Navbar />

      <section className="bg-black text-white px-6 md:px-16 pt-16 pb-0 relative overflow-hidden min-h-[340px] flex items-center">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-wider leading-tight max-w-2xl">
              Do <span className="text-white">CAOS</span> à organização, em alguns cliques
            </h1>
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end h-80 md:h-[380px] mt-6 md:mt-0 items-end">
            <img 
              src="/mascote.png" 
              alt="Ilustração Stock.io" 
              className="object-contain h-full block alignment-baseline"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto pt-12 pb-16">
        <section className="mb-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-5 tracking-tight text-zinc-900">Categoria</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div key={index} className="flex flex-col items-center justify-center bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer aspect-square group">
                  <div className="text-[#5D2CFF] group-hover:scale-110 transition-transform mb-2">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-500 text-center tracking-tight">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        <Carrossel titulo="Produtos" subtituloLink="melhores avaliados" itens={melhoresAvaliados} tipo="produto" />
        <Carrossel titulo="Produtos" subtituloLink="mais baratos" itens={maisBaratos} tipo="produto" />
        <Carrossel titulo="Produtos" subtituloLink="recém adicionados" itens={recemAdicionados} tipo="produto" />

        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mt-12 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Lojas</h2>
          <select className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs text-purple-600 font-semibold focus:outline-none cursor-pointer">
            <option>filtros</option>
          </select>
        </div>
        <Carrossel titulo="" itens={lojas} tipo="loja" />
      </main>
    </div>
  );
}