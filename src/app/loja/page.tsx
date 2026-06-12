import React from 'react';
import Link from 'next/link';
import { Carrossel } from '@/components/Carrossel'; 
import { AddProduto } from '@/components/AddProduto'; 
import { getLojaById, getAvaliacoes, getProdutosByLoja } from '@/services/api';

export default async function LojaPage({ params }: { params: { id: string } }) {
  const [loja, todasAvaliacoes, todosProdutos] = await Promise.all([
    getLojaById(params.id),
    getAvaliacoes(),
    getProdutosByLoja(params.id),
  ]);

  const avaliacoesDaLoja = todasAvaliacoes.filter(av => av.loja_id === Number(params.id));
  const notaGeral = avaliacoesDaLoja.length > 0 
    ? (avaliacoesDaLoja.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoesDaLoja.length)
    : 5;

  const melhoresAvaliados = todosProdutos.filter(p => p.disponivel).slice(0, 5);
  return (
    <div className="bg-[#F9F6EE] min-h-screen text-black">
      <div 
        className="relative h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${loja.banner_url || '/placeholder-banner.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-serif">{loja.nome}</h1>
          <p className="text-xl italic mt-2">{loja.descricao || 'beleza'}</p>
          <div className="flex justify-center mt-4 text-yellow-400 text-2xl">★★★★★</div>
        </div>
      </div>