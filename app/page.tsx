'use client';

import { useState } from 'react';
import { 
  Search, 
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
    { id: 1, nome: "Brownie Meio A.", subtitulo: "R$ 4,70", imagem: "/images/brownie.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/cjr.png" },
    { id: 2, nome: "Brownie Trad.", subtitulo: "R$ 3,80", imagem: "/images/brownie-trad.png", status: "INDISPONÍVEL" as const, logoLoja: "/logos/cjr.png" },
    { id: 3, nome: "Nozes", subtitulo: "R$ 29,99 /kg", imagem: "/images/nozes.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/doces.png" },
    { id: 4, nome: "Banana", subtitulo: "R$ 3,99 /kg", imagem: "/images/banana.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/sacolao.png" },
    { id: 5, nome: "Limão Siciliano", subtitulo: "R$ 17,99 /kg", imagem: "/images/limao.png", status: "INDISPONÍVEL" as const, logoLoja: "/logos/sacolao.png" },
  ]);

  const [maisBaratos] = useState([
    { id: 6, nome: "Limpador Facial", subtitulo: "R$ 74,99", imagem: "/images/limpador.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/creamy.png" },
    { id: 7, nome: "Blush", subtitulo: "R$ 199,99", imagem: "/images/blush.png", status: "INDISPONÍVEL" as const, logoLoja: "/logos/rare.png" },
    { id: 8, nome: "Sérum Facial", subtitulo: "R$ 99,90", imagem: "/images/serum.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/creamy.png" },
    { id: 9, nome: "Iluminador", subtitulo: "R$ 249,90", imagem: "/images/iluminador.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/rare.png" },
    { id: 10, nome: "Body Splash", subtitulo: "R$ 179,99", imagem: "/images/body-splash.png", status: "INDISPONÍVEL" as const, logoLoja: "/logos/victoria.png" },
  ]);

  const [recemAdicionados] = useState([
    { id: 11, nome: "Saia", subtitulo: "R$ 75,99", imagem: "/images/saia.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/amaro.png" },
    { id: 12, nome: "New Balance", subtitulo: "R$ 399,99", imagem: "/images/tenis.png", status: "INDISPONÍVEL" as const, logoLoja: "/logos/artwalk.png" },
    { id: 13, nome: "Bota", subtitulo: "R$ 115,90", imagem: "/images/bota.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/artwalk.png" },
    { id: 14, nome: "Bolsa", subtitulo: "R$ 349,90", imagem: "/images/bolsa.png", status: "DISPONÍVEL" as const, logoLoja: "/logos/amaro.png" },
    { id: 15, nome: "Calça Jeans", subtitulo: "R$ 159,99", imagem: "/images/jeans.png", status: "INDISPONÍVEL" as const, logoLoja: "/logos/renner.png" },
  ]);

  const [lojas] = useState([
    { id: 1, nome: "CJR", subtitulo: "mercado", imagem: "/logos/cjr.png" },
    { id: 2, nome: "Rare Beauty", subtitulo: "beleza", imagem: "/logos/rare.png" },
    { id: 3, nome: "The Croc Brew", subtitulo: "mercado", imagem: "/logos/croc.png" },
    { id: 4, nome: "Mini Reno", subtitulo: "casa", imagem: "/logos/mini-reno.png" },
    { id: 5, nome: "amaro", subtitulo: "moda", imagem: "/logos/amaro.png" },
    { id: 6, nome: "Repit", subtitulo: "eletrônicos", imagem: "/logos/repit.png" },
  ]);

  return (
    <div className="min-h-screen bg-[#FDFBF2] text-zinc-800 font-sans antialiased">
      
      {/* Navbar do cliente */}
      <Navbar />

      {/* Hero Banner Principal */}
      <section className="bg-black text-white px-6 md:px-16 pt-16 pb-16 relative overflow-hidden min-h-[340px] flex items-center">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-xl">
              Do <span className="text-white">CAOS</span> à organização,<br />em alguns cliques
            </h1>
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end h-64 md:h-80 mt-6 md:mt-0">
            <img 
              src="/images/character-hero.png" 
              alt="Ilustração Stock.io" 
              className="object-contain h-full"
            />
          </div>
        </div>
      </section>

      {/* Estrutura temporária da Barra de Pesquisa (sua colega substituirá pelo componente depois) */}
      <div className="w-full flex justify-center -mt-7 mb-10 relative z-20 px-6">
        <div className="relative w-full max-w-2xl shadow-md rounded-full">
          <input 
            type="text" 
            placeholder="Procurar por..." 
            className="w-full bg-white pl-6 pr-12 py-4 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5D2CFF] text-sm text-zinc-600 placeholder-zinc-300" 
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 w-5 h-5" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto pb-16">
        {/* Seção de Categorias */}
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

        {/* Listas de Carrosséis Verticais */}
        <Carrossel titulo="Produtos" subtituloLink="melhores avaliados" itens={melhoresAvaliados} tipo="produto" />
        <Carrossel titulo="Produtos" subtituloLink="mais baratos" itens={maisBaratos} tipo="produto" />
        <Carrossel titulo="Produtos" subtituloLink="recém adicionados" itens={recemAdicionados} tipo="produto" />

        {/* Seção e Carrossel Final de Lojas */}
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