'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Navbar from '../../../components/Navbar';
import Carrossel from '../../../components/Carrossel';

const Estrelas = () => (
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

// --- DADOS MOCKADOS INTERNOS ---
const usuarios = [
  { id: 1, nome: 'Selena Gomez', username: 'selenagomez', foto: '/selena.png', bio: 'Fundadora da Rare Beauty' },
  { id: 2, nome: 'Sophia Laforteza', username: 'sophialaforteza', foto: '/sofia.png', bio: 'Apaixonada por maquiagem' }
];

const lojas = [
  { id: 1, nome: 'Rare Beauty', descricao: 'beleza', imagem: '/shoot.png', criadorId: 1 }
];

const produtos = [
  { id: 1, lojaId: 1, nome: 'Bronzer', preco: 254.99, imagem: '/bronzer.png', disponivel: true, avaliacao: 4.9 },
  { id: 2, lojaId: 1, nome: 'Blush', preco: 199.99, imagem: '/blush.png', disponivel: false, avaliacao: 4.7 },
  { id: 3, lojaId: 1, nome: 'Perfume Rare', preco: 599.9, imagem: '/perfume.png', disponivel: true, avaliacao: 4.8 },
  { id: 4, lojaId: 1, nome: 'Iluminador', preco: 249.9, imagem: '/iluminador.png', disponivel: true, avaliacao: 4.6 },
  { id: 5, lojaId: 1, nome: 'Mini Blush', preco: 99.99, imagem: '/mini-blush.png', disponivel: false, avaliacao: 4.2 },
  { id: 6, lojaId: 1, nome: 'Lapis Labial', preco: 139.9, imagem: '/lapis.png', disponivel: true, avaliacao: 4.5 },
  { id: 7, lojaId: 1, nome: 'Creme Corporal', preco: 299.99, imagem: '/creme.png', disponivel: false, avaliacao: 4.0 },
  { id: 8, lojaId: 1, nome: 'Contorno', preco: 289.9, imagem: '/contorno.png', disponivel: true, avaliacao: 4.4 },
  { id: 9, lojaId: 1, nome: 'Primer', preco: 139, imagem: '/primer.png', disponivel: true, avaliacao: 4.3 },
  { id: 10, lojaId: 1, nome: 'Mascara de C.', preco: 109.99, imagem: '/mascara.png', disponivel: true, avaliacao: 4.1 },
  { id: 11, lojaId: 1, nome: 'Pó Compacto', preco: 119.5, imagem: '/po.png', disponivel: true, avaliacao: 4.6 }
];

const comentarios = [
  { id: 1, lojaId: 1, usuarioId: 2, nota: 5, comentario: 'Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram.' },
  { id: 2, lojaId: 1, usuarioId: 1, nota: 5, comentario: 'Não é apenas maquiagem, é uma forma de expressão e autoestima.' }
];

interface LojaPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default function LojaPage({ params, searchParams }: LojaPageProps) {
  const resolvedParams = React.use(params);
  const resolvedSearchParams = React.use(searchParams);

  const loja = lojas.find((l: any) => l.id === Number(resolvedParams.id));

  if (!loja) {
    notFound();
  }

  const criador = usuarios.find((u: any) => u.id === loja.criadorId);
  const produtosLoja = produtos.filter((produto: any) => produto.lojaId === loja.id);

  const melhoresAvaliados = [...produtosLoja]
    .sort((a: any, b: any) => b.avaliacao - a.avaliacao)
    .slice(0, 10);

  const comentariosLoja = comentarios
    .filter((c: any) => c.lojaId === loja.id)
    .map((comentario: any) => ({
      ...comentario,
      usuario: usuarios.find((u: any) => u.id === comentario.usuarioId),
    }));

  const notaGeral = comentariosLoja.length > 0
    ? (comentariosLoja.reduce((acc: number, c: any) => acc + c.nota, 0) / comentariosLoja.length).toFixed(2)
    : "0.00";

  const ITEMS_PER_PAGE = 10;
  const paginaAtual = Number(resolvedSearchParams.page ?? 1);
  const totalPaginas = Math.ceil(produtosLoja.length / ITEMS_PER_PAGE);
  const produtosPagina = produtosLoja.slice(
    (paginaAtual - 1) * ITEMS_PER_PAGE,
    paginaAtual * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#F8F4E9] text-black">
      <Navbar />

      <section className="relative h-[650px] bg-cover bg-center" style={{ backgroundImage: `url(${loja.imagem})` }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[110px] md:text-[130px] leading-none font-light text-[#F8F4E9]">{loja.nome}</h1>
            <p className="text-4xl text-[#F8F4E9] mt-2">{loja.descricao}</p>
          </div>
        </div>
        <Link href={`/perfil/${criador?.id}`} className="absolute bottom-8 right-10 text-3xl text-[#F8F4E9] z-20 hover:text-purple-300 transition">
          by {criador?.nome}
        </Link>
      </section>

      <section className="max-w-[1500px] mx-auto py-14 px-8">
        <h2 className="text-5xl font-bold mb-10">Produtos<span className="text-2xl font-normal ml-2">melhor avaliados</span></h2>
        <Carrossel>
          {melhoresAvaliados.map((produto: any) => (
            <Link href={`/produto/${produto.id}`} key={produto.id} className="bg-white rounded-[30px] p-8 min-w-[260px] flex flex-col items-center hover:scale-[1.02] transition">
              <img src={produto.imagem} alt={produto.nome} className="h-52 object-contain mb-6" />
              <h3 className="text-3xl font-semibold w-full text-left">{produto.nome}</h3>
              <p className="text-2xl font-medium w-full text-left">R$ {produto.preco.toFixed(2)}</p>
              <span className={`w-full text-left text-lg mt-2 ${produto.disponivel ? 'text-lime-500' : 'text-red-600'}`}>
                {produto.disponivel ? 'DISPONÍVEL' : 'INDISPONÍVEL'}
              </span>
            </Link>
          ))}
        </Carrossel>
      </section>

      <section className="bg-black py-20 px-8">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center text-white">
            <h2 className="text-6xl font-light">Reviews e Comentários</h2>
            <div className="text-8xl font-light mt-6">{notaGeral}</div>
            <div className="text-6xl mt-6"><Estrelas /></div>
          </div>
          <div className="flex justify-end mt-10">
            <Link href={`/lojas/${loja.id}/avaliacoes`} className="text-purple-500 text-3xl hover:underline">ver mais</Link>
          </div>
          <div className="mt-8">
            <Carrossel>
              {comentariosLoja.map((comentario: any) => (
                <div key={comentario.id} className="bg-[#F8F4E9] rounded-[40px] p-8 flex items-center gap-8 min-w-[1100px]">
                  <img src={comentario.usuario?.foto} alt={comentario.usuario?.nome} className="w-36 h-36 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <Link href={`/perfil/${comentario.usuario?.id}`} className="text-4xl font-medium hover:text-purple-600 transition">{comentario.usuario?.nome}</Link>
                      <div className="text-yellow-400 text-4xl">{'★'.repeat(comentario.nota)}</div>
                    </div>
                    <p className="text-2xl text-gray-600 mt-4">{comentario.comentario}</p>
                  </div>
                </div>
              ))}
            </Carrossel>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-16 px-8">
        <h2 className="text-5xl font-bold mb-10">Produtos<span className="text-2xl font-normal ml-2">de {loja.nome.toLowerCase()}</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {produtosPagina.map((produto: any) => (
            <Link href={`/produto/${produto.id}`} key={produto.id} className="bg-white rounded-[30px] p-8 flex flex-col items-center hover:scale-[1.02] transition">
              <img src={produto.imagem} alt={produto.nome} className="h-52 object-contain mb-6" />
              <h3 className="text-3xl font-semibold w-full text-left">{produto.nome}</h3>
              <p className="text-2xl w-full text-left">R$ {produto.preco.toFixed(2)}</p>
              <span className={`w-full text-left text-lg mt-2 ${produto.disponivel ? 'text-lime-500' : 'text-red-600'}`}>{produto.disponivel ? 'DISPONÍVEL' : 'INDISPONÍVEL'}</span>
            </Link>
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-10 text-5xl mt-20">
            <Link href={`/lojas/${loja.id}?page=${Math.max(paginaAtual - 1, 1)}`} className={paginaAtual === 1 ? 'pointer-events-none opacity-40' : ''}>&lt;</Link>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <Link key={i} href={`/lojas/${loja.id}?page=${i + 1}`} className={paginaAtual === i + 1 ? 'font-bold' : ''}>{i + 1}</Link>
            ))}
            <Link href={`/lojas/${loja.id}?page=${Math.min(paginaAtual + 1, totalPaginas)}`} className={paginaAtual === totalPaginas ? 'pointer-events-none opacity-40' : ''}>&gt;</Link>
          </div>
        )}
      </section>
    </div>
  );
}