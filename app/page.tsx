'use client';

import { useState, useEffect } from 'react';
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
  const [melhoresAvaliados, setMelhoresAvaliados] = useState<any[]>([]);
  const [maisBaratos, setMaisBaratos] = useState<any[]>([]);
  const [recemAdicionados, setRecemAdicionados] = useState<any[]>([]);
  const [lojas, setLojas] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/lojas')
      .then((res) => res.json())
      .then((data) => {
        const lojasAdaptadas = data.map((loja: any) => ({
          id: loja.id,
          nome: loja.nome,
          subtitulo: loja.categoria || "mercado",
          imagem: loja.imagem || "/reno.png"
        }));
        setLojas(lojasAdaptadas);
      })
      .catch((err) => console.error(err));

    fetch('http://localhost:3001/produtos')
      .then((res) => res.json())
      .then((data) => {
        const produtosAdaptados = data.map((prod: any) => ({
          id: prod.id,
          nome: prod.nome,
          subtitulo: `R$ ${prod.preco}`,
          imagem: prod.imagem || "/brownie.png",
          status: prod.disponivel ? "DISPONÍVEL" : "INDISPONÍVEL",
          logoLoja: prod.lojaLogo || ""
        }));

        setMelhoresAvaliados(produtosAdaptados);
        setMaisBaratos([...produtosAdaptados].sort((a, b) => a.id - b.id));
        setRecemAdicionados([...produtosAdaptados].reverse());
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF2] text-zinc-800 font-sans antialiased">
      <Navbar />

      <section className="bg-black text-white px-6 md:px-16 pt-16 pb-0 relative overflow-hidden min-h-[340px] flex items-center">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-wider leading-tight max-w-2xl">
              Do <span className="text-white">CAOS</span> à organization, em alguns cliques
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