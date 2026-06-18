import React from 'react';
import Link from 'next/link';
import api from '@/app/services/api';

export default async function AvaliacoesPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await api.get('/avaliacoes');
  const todasAvaliacoes = response.data;

  const avaliacoesDaLoja = todasAvaliacoes.filter(
    (av: any) => av.loja_id === Number(params.id)
  );

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/loja/${params.id}`}
          className="text-sm text-gray-400 hover:text-white mb-6 inline-block"
        >
          ← Voltar para a loja
        </Link>

        <h1 className="text-3xl font-light text-center mb-12">
          Todas as Avaliações
        </h1>

        <div className="space-y-6">
          {avaliacoesDaLoja.map((av: any) => (
            <div
              key={av.id}
              className="bg-[#F9F6EE] text-black p-6 rounded-3xl flex items-start gap-6 relative"
            >
              <img
                src={av.usuario?.foto || '/default-avatar.png'}
                alt={av.usuario?.nome || 'Usuário'}
                className="w-20 h-20 rounded-full object-cover shrink-0"
              />

              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {av.usuario?.nome || 'Usuário'}
                  </h3>

                  <span className="text-yellow-500 text-xl">
                    {'★'.repeat(av.nota)}
                  </span>
                </div>

                <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                  {av.comentario}
                </p>

                <button className="text-purple-700 font-semibold text-xs mt-2 block ml-auto hover:underline">
                  ver mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}