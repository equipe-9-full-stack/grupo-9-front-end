'use client';

import { ArrowLeft, AtSign, Mail } from 'lucide-react';

const perfil = {
  imagem: '/Perfil_sofia.png',
  nome: 'Sofia Figueiredo',
  usuario: '@sofiafigueiredo',
  email: 'sofiafigueiredo@rare.com',
};

export default function AvaliacaoDetalhesPage() {
  return (
    <main className="min-h-screen bg-[#ECE9DD]">

      {/* HEADER */}
      <section className="bg-black text-white">

        <div className="flex items-center justify-between px-16 py-6">

          <h2 className="text-2xl font-bold flex items-center gap-1">
            STOCK.IO
          </h2>

          <div className="flex items-center gap-4">
            <button className="text-sm">
              LOGIN
            </button>

            <button className="bg-[#6C38FF] text-white text-sm px-5 py-2 rounded-full">
              CADASTRE-SE
            </button>
          </div>
        </div>

        <div className="px-56 pb-10">

          <button>
            <ArrowLeft
              size={32}
              strokeWidth={2}
            />
          </button>

        </div>

      </section>

      {/* PERFIL */}
      <section className="px-76 -mt-16 pb-10">

        <div className="flex flex-col items-start text-left">

          <img
            src={perfil.imagem}
            alt={perfil.nome}
            className="
              w-[110px]
              h-[110px]
              rounded-full
              object-cover
              border-4
              border-[#ECE9DD]
            "
          />

          <h1 className="mt-4 text-[24px] font-medium text-black">
            {perfil.nome}
          </h1>

          <div className="mt-1 flex items-center gap-2 text-zinc-500 text-sm">
            <AtSign size={16} strokeWidth={2.2} />
            <span>{perfil.usuario.slice(1)}</span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-zinc-500 text-sm">
            <Mail size={16} strokeWidth={2.2} />
            <span>{perfil.email}</span>
          </div>

        </div>

        {/* AVALIAÇÕES */}
        <div className="mt-10 max-w-[700px]">

          <h2 className="text-lg font-semibold text-black mb-4">
            Avaliações
          </h2>

          <div className="bg-white rounded-2xl p-5 flex gap-4">

            <img
              src={perfil.imagem}
              alt={perfil.nome}
              className="
                w-[60px]
                h-[60px]
                rounded-full
                object-cover
                shrink-0
              "
            />

            <p className="text-zinc-700 text-sm leading-relaxed">
              Adorei o produto. Funcionou muito na minha pele. Estou muito
              contente e com toda certeza irei comprar mais produtos da
              marca. Que orgulhoooooooooo! Arrasaram.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}