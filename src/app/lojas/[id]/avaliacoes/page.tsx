import React from 'react';
import Link from 'next/link';

import Navbar from '../../../../components/Navbar';

const EstrelasNotaGeral = () => (
  <div className="flex justify-center items-center text-yellow-400">
    <span>★★★★</span>
    <span className="relative inline-block">
      <span className="absolute left-0 top-0 overflow-hidden text-yellow-400" style={{ width: '50%' }}>
        ★
      </span>
      <span className="opacity-0">★</span>
    </span>
  </div>
);

export default async function AvaliacoesPage({
  params,
}: {
  params: { id: string };
}) {
  const loja = {
    nome: 'Rare Beauty',
    descricao: 'beleza',
    imagem: '/shoot.png',
    criador: 'Selena Gomez',
  };

  const avaliacoesDaLoja = [
    {
      id: 1,
      nota: 5,
      comentario:
        'Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram.',
      usuario: {
        nome: 'Sophia Laforteza',
        foto: '/sofia.png',
      },
    },
    {
      id: 2,
      nota: 5,
      comentario:
        'Não é por nada não, mas essa garota arrasa.',
      usuario: {
        nome: 'Selena Gomez',
        foto: '/selena.png',
      },
    },
    {
      id: 3,
      nota: 5,
      comentario:
        'Não consigo descrever a sensação de passar uma base que realmente orna com sua pele. Sensacional! Parabéns aos envolvidos.',
      usuario: {
        nome: 'Pedro Freitas',
        foto: '/noah.png',
      },
    },
    {
      id: 4,
      nota: 4,
      comentario:
        'Eu gostei bastante! Mas acho que errei no tom.',
      usuario: {
        nome: 'Amberly Yang',
        foto: '/yang.png',
      },
    },
    {
      id: 5,
      nota: 5,
      comentario:
        'Esses produtos realmente transformaram minha rotina de beleza e elevaram minha confiança a novos patamares. O rímel não só dá volume e comprimento incríveis aos meus cílios, como também os levanta e curva, abrindo meu olhar e me fazendo sentir maravilhosa.',
      usuario: {
        nome: 'Bia Soull',
        foto: '/bia.png',
      },
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${loja.imagem})`,
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full h-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-7xl md:text-8xl font-light text-[#F8F4E9]">
              {loja.nome}
            </h1>

            <p className="text-3xl mt-2 text-[#F8F4E9]">
              {loja.descricao}
            </p>
          </div>

          <p className="absolute right-10 bottom-8 text-2xl text-[#F8F4E9]">
            by {loja.criador}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/lojas/${params.id}`}
            className="text-gray-400 hover:text-white mb-8 inline-block"
          >
            &larr; Voltar para a loja
          </Link>

          <h1 className="text-6xl font-light text-center mb-6">
            Reviews e Comentários
          </h1>

          <div className="text-center mb-16">
            <div className="text-8xl font-light">
              4.75
            </div>

            <div className="text-6xl mt-4">
              <EstrelasNotaGeral />
            </div>
          </div>

          <div className="space-y-10">
            {avaliacoesDaLoja.map((av) => (
              <div
                key={av.id}
                className="bg-[#F8F4E9] text-black rounded-[40px] p-8 flex items-start gap-8"
              >
                <img
                  src={av.usuario.foto}
                  alt={av.usuario.nome}
                  className="w-40 h-40 rounded-full object-cover shrink-0"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-4xl font-medium">
                      {av.usuario.nome}
                    </h2>

                    <div className="text-yellow-400 text-5xl">
                      {'★'.repeat(av.nota)}
                      {'☆'.repeat(5 - av.nota)}
                    </div>
                  </div>

                  <p className="text-2xl text-gray-700 mt-4 leading-relaxed">
                    {av.comentario}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}