'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../../components/Navbar';

const EstrelasNotaGeral = () => (
  <div className="flex justify-center items-center text-yellow-400">
    <span>★★★★</span>
    <span className="relative inline-block">
      <span className="absolute left-0 top-0 overflow-hidden text-yellow-400" style={{ width: '50%' }}>★</span>
      <span className="opacity-0">★</span>
    </span>
  </div>
);

// --- DADOS ---
const usuarios = [
  { id: 1, nome: 'Selena Gomez', foto: '/selena.png' },
  { id: 2, nome: 'Sophia Laforteza', foto: '/sofia.png' },
  { id: 3, nome: 'Pedro Freitas', foto: '/noah.png' },
  { id: 4, nome: 'Amberly Yang', foto: '/yang.png' },
  { id: 5, nome: 'Bia Soull', foto: '/bia.png' }
];

const lojas = [
  { id: 1, nome: 'Rare Beauty', descricao: 'beleza', imagem: '/shoot.png', criadorId: 1 }
];

const comentarios = [
  { id: 1, lojaId: 1, usuarioId: 2, nota: 5, comentario: 'Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram.' },
  { id: 2, lojaId: 1, usuarioId: 1, nota: 5, comentario: 'Não é por nada não, mas essa garota arrasa.' },
  { id: 3, lojaId: 1, usuarioId: 3, nota: 5, comentario: 'Não consigo descrever a sensação de passar uma base que realmente orna com sua pele. Sensacional! Parabéns aos envolvidos.' },
  { id: 4, lojaId: 1, usuarioId: 4, nota: 4, comentario: 'Eu gostei bastante! Mas acho que errei no tom.' },
  { id: 5, lojaId: 1, usuarioId: 5, nota: 5, comentario: 'Esses produtos realmente transformaram minha rotina de beleza e elevaram minha confiança a novos patamares. O rímel não só dá volume e comprimento increíveis aos meus cílios, como também os levanta e curva, abrindo meu olhar e me fazendo sentir maravilhosa.' }
];

interface AvaliacoesPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default function AvaliacoesPage({ params, searchParams }: AvaliacoesPageProps) {
  const resolvedParams = React.use(params);
  const resolvedSearchParams = React.use(searchParams);

  const loja = lojas.find((l: any) => l.id === Number(resolvedParams.id));
  if (!loja) notFound();

  const criador = usuarios.find((u: any) => u.id === loja.criadorId);

  const avaliacoesDaLoja = comentarios
    .filter((c: any) => c.lojaId === loja.id)
    .map((c: any) => ({
      ...c,
      usuario: usuarios.find((u: any) => u.id === c.usuarioId),
    }));

  const notaGeral = avaliacoesDaLoja.length > 0
    ? (avaliacoesDaLoja.reduce((acc: number, av: any) => acc + av.nota, 0) / avaliacoesDaLoja.length).toFixed(2)
    : '0.00';

  const ITEMS_PER_PAGE = 5;
  const paginaAtual = Number(resolvedSearchParams.page ?? 1);
  const totalPaginas = Math.ceil(avaliacoesDaLoja.length / ITEMS_PER_PAGE);
  const avaliacoesPagina = avaliacoesDaLoja.slice((paginaAtual - 1) * ITEMS_PER_PAGE, paginaAtual * ITEMS_PER_PAGE);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${loja.imagem})` }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-7xl md:text-8xl font-light text-[#F8F4E9]">{loja.nome}</h1>
          <p className="text-3xl mt-2 text-[#F8F4E9]">{loja.descricao}</p>
          <Link href={`/perfil/${criador?.id}`} className="absolute right-10 bottom-8 text-2xl text-[#F8F4E9] hover:text-purple-300 transition">
            by {criador?.nome}
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <Link href={`/lojas/${resolvedParams.id}`} className="text-gray-400 hover:text-white mb-8 inline-block">&larr; Voltar para a loja</Link>
        <h1 className="text-6xl font-light text-center mb-6">Reviews e Comentários</h1>

        <div className="text-center mb-16">
          <div className="text-8xl font-light">{notaGeral}</div>
          <div className="text-6xl mt-4"><EstrelasNotaGeral /></div>
        </div>

        <div className="space-y-10">
          {avaliacoesPagina.map((av: any) => (
            <div key={av.id} className="bg-[#F8F4E9] text-black rounded-[40px] p-8 flex items-start gap-8">
              <Link href={`/perfil/${av.usuario?.id}`}>
                <img src={av.usuario?.foto} alt={av.usuario?.nome} className="w-40 h-40 rounded-full object-cover shrink-0 hover:scale-105 transition" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <Link href={`/perfil/${av.usuario?.id}`} className="text-4xl font-medium hover:text-purple-600 transition">{av.usuario?.nome}</Link>
                  <div className="text-yellow-400 text-5xl">{'★'.repeat(av.nota)}{'☆'.repeat(5 - av.nota)}</div>
                </div>
                <p className="text-2xl text-gray-700 mt-4 leading-relaxed">{av.comentario}</p>
              </div>
            </div>
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-6 mt-16 text-2xl">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <Link
                key={i}
                href={`/lojas/${loja.id}/avaliacoes?page=${i + 1}`}
                className={paginaAtual === i + 1 ? 'font-bold text-purple-500' : 'text-white hover:text-purple-400 transition'}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}