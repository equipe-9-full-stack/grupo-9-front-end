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

import Navbar from '../../components/Navbar';
import Carrossel from '../../components/Carrossel';

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

function CategoryItem({ name, icon: Icon }: { name: string; icon: React.ElementType }) {
  const base = "flex flex-col items-center justify-center bg-[#F8F8F8] rounded-[28px] p-4 aspect-square";

  if (name === "Eletrônicos") {
    return (
      <a href="http://localhost:3000/tela_itens_especificos" className={base + " hover:bg-[#ede9ff] transition-colors cursor-pointer"}>
        <div className="text-[#6B39FF] mb-2">
          <Icon size={24} strokeWidth={1.8} />
        </div>
        <span className="text-[11px] font-semibold text-zinc-500">{name}</span>
      </a>
    );
  }

  return (
    <div className={base}>
      <div className="text-[#6B39FF] mb-2">
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <span className="text-[11px] font-semibold text-zinc-500">{name}</span>
    </div>
  );
}

export default function ProfilePage() {

  const [melhoresAvaliados, setMelhoresAvaliados] = useState<any[]>([]);
  const [maisBaratos, setMaisBaratos] = useState<any[]>([]);
  const [recemAdicionados, setRecemAdicionados] = useState<any[]>([]);
  const [lojas, setLojas] = useState<any[]>([]);

  useEffect(() => {

    fetch('http://localhost:3000/lojas')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const lojasAdaptadas = data
            .filter((loja: any) => loja)
            .map((loja: any) => ({
              id: loja.id,
              nome: loja.nome,
              subtitulo: loja.categoria ?? "",
              imagem: loja.imagem ?? ""
            }));
          setLojas(lojasAdaptadas);
        } else {
          setLojas([]);
        }
      })
      .catch(() => setLojas([]));

    fetch('http://localhost:3000/produtos')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const produtosAdaptados = data
            .filter((prod: any) => prod)
            .map((prod: any) => ({
              id: prod.id,
              nome: prod.nome,
              subtitulo: `R$ ${prod.preco}`,
              imagem: prod.imagem ?? "",
              status: prod.disponivel ? "DISPONÍVEL" : "INDISPONÍVEL",
              logoLoja: prod.lojaLogo ?? ""
            }));
          setMelhoresAvaliados(produtosAdaptados);
          setMaisBaratos([...produtosAdaptados].sort((a, b) => a.id - b.id));
          setRecemAdicionados([...produtosAdaptados].reverse());
        } else {
          setMelhoresAvaliados([]);
          setMaisBaratos([]);
          setRecemAdicionados([]);
        }
      })
      .catch(() => {
        setMelhoresAvaliados([]);
        setMaisBaratos([]);
        setRecemAdicionados([]);
      });

  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1E6] text-zinc-800 font-sans antialiased">

      <Navbar />

      <section className="bg-black text-white relative h-[540px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-20 h-full flex items-center justify-between">
          <div className="z-10 max-w-[920px] flex-shrink-0">
            <h1 className="text-[62px] leading-[0.95] font-black tracking-[-2px]">
              <span className="whitespace-nowrap">Do CAOS à organização,</span>
              <br />
              <span className="whitespace-nowrap">em alguns cliques</span>
            </h1>
          </div>
          <div className="absolute right-[-10px] bottom-[-300px] w-[50%] h-[740px] flex items-end justify-center">
            <img
              src="/mascote33.png"
              alt="Mascote"
              className="h-full w-auto object-contain scale-[1.08] origin-bottom"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto pt-10 pb-16">

        <section className="mb-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-5 tracking-tight text-zinc-900">
            Categoria
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {categories.map((cat, index) => (
              <CategoryItem key={index} name={cat.name} icon={cat.icon} />
            ))}
          </div>
        </section>

        <Carrossel
          titulo="Produtos"
          subtituloLink="melhores avaliados"
          itens={melhoresAvaliados}
          tipo="produto"
        />

        <Carrossel
          titulo="Produtos"
          subtituloLink="mais baratos"
          itens={maisBaratos}
          tipo="produto"
        />

        <Carrossel
          titulo="Produtos"
          subtituloLink="recém adicionados"
          itens={recemAdicionados}
          tipo="produto"
        />

        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mt-12 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Lojas</h2>
          <select className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs text-purple-600 font-semibold">
            <option>filtros</option>
          </select>
        </div>

        <Carrossel
          titulo=""
          itens={lojas}
          tipo="loja"
        />

      </main>
    </div>
  );
}