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
  Home as HomeIcon,
  ChevronUp
} from "lucide-react";

import Navbar from '../../components/Navbar';
import Carrossel from '../../components/Carrossel';
import BarraPesquisa from '../../components/barra_pesquisa';

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
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState('');

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
      .catch(() => {
        setLojas([]);
      });

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
          setMaisBaratos(
            [...produtosAdaptados].sort((a, b) => a.id - b.id)
          );
          setRecemAdicionados(
            [...produtosAdaptados].reverse()
          );
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

      <main className="max-w-7xl mx-auto pt-14 pb-16 px-4">
        
        <div className="w-full flex justify-end mb-12">
          <div className="w-full md:w-[480px]">
            <BarraPesquisa 
              value={termoPesquisa} 
              onChange={(valor) => setTermoPesquisa(valor)} 
              onClear={() => setTermoPesquisa('')} 
            />
          </div>
        </div>

        <section className="mb-16 w-full">
          <h2 className="text-[32px] font-medium tracking-tight text-zinc-900 leading-none mb-8">
            Categoria
          </h2>

          <div className="flex gap-7 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory w-full">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[140px] h-[140px] flex flex-col items-center justify-center bg-[#F8F8F8] rounded-[32px] p-5 snap-start shadow-sm"
                >
                  <div className="text-[#6B39FF] mb-3">
                    <Icon size={38} strokeWidth={1.8} />
                  </div>
                  <span className="text-[14px] font-bold text-zinc-900">
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-24 w-full">
          <div className="w-full">
            <h2 className="text-[32px] font-medium tracking-tight text-zinc-900 leading-none mb-6">
              Produtos <span className="text-lg font-normal text-purple-600 ml-2">melhores avaliados</span>
            </h2>
            <Carrossel
              titulo=""
              itens={melhoresAvaliados}
              tipo="produto"
            />
          </div>

          <div className="w-full">
            <h2 className="text-[32px] font-medium tracking-tight text-zinc-900 leading-none mb-6">
              Produtos <span className="text-lg font-normal text-purple-600 ml-2">mais baratos</span>
            </h2>
            <Carrossel
              titulo=""
              itens={maisBaratos}
              tipo="produto"
            />
          </div>

          <div className="w-full">
            <h2 className="text-[32px] font-medium tracking-tight text-zinc-900 leading-none mb-6">
              Produtos <span className="text-lg font-normal text-purple-600 ml-2">recém adicionados</span>
            </h2>
            <Carrossel
              titulo=""
              itens={recemAdicionados}
              tipo="produto"
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center mb-8 relative z-50">
              <h2 className="text-[32px] font-medium tracking-tight text-zinc-900 leading-none">
                Lojas
              </h2>

              <div className="relative">
                <button 
                  onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                  className="bg-white border border-gray-200 rounded-full px-8 py-2.5 w-[280px] text-lg text-purple-400 font-normal flex items-center justify-between shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="lowercase">filtros</span>
                  <ChevronUp 
                    className={`text-purple-400 transition-transform duration-300 ${filtrosAbertos ? '' : 'rotate-180'}`} 
                    size={22} 
                  />
                </button>

                {filtrosAbertos && (
                  <aside className="absolute right-0 bottom-full mb-3 w-[280px] bg-white p-6 rounded-[32px] shadow-2xl border border-gray-100 max-h-[340px] overflow-y-auto scrollbar-none">
                    <div className="flex flex-col gap-4">
                      {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                          <label key={index} className="flex items-center gap-4 cursor-pointer group w-full">
                            <input
                              type="checkbox"
                              className="w-6 h-6 rounded-[8px] border-2 border-[#6B39FF] checked:bg-[#6B39FF] appearance-none checked:after:content-['✓'] checked:after:text-white checked:after:flex checked:after:justify-center checked:after:items-center checked:after:text-xs checked:after:font-bold bg-white transition-all cursor-pointer flex-shrink-0"
                            />
                            <span className="text-[#6B39FF] text-lg font-normal group-hover:text-purple-900 transition-colors whitespace-nowrap">
                              {cat.name}
                            </span>
                            <span className="text-[#6B39FF] ml-auto flex-shrink-0">
                              <Icon size={20} strokeWidth={1.5} />
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </aside>
                )}
              </div>
            </div>

            <Carrossel
              titulo=""
              itens={lojas}
              tipo="loja"
            />
          </div>
        </div>
      </main>
    </div>
  );
}