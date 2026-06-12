import React from 'react';
import Link from 'next/link';
import api from '@/app/services/api';

export default async function LojaPage({
  params,
}: {
  params: { id: string };
}) {
  const [lojaRes, avaliacoesRes, produtosRes] = await Promise.all([
    api.get(`/lojas/${params.id}`),
    api.get('/avaliacoes'),
    api.get(`/produtos?loja_id=${params.id}`),
  ]);

  const loja = lojaRes.data;
  const todasAvaliacoes = avaliacoesRes.data;
  const todosProdutos = produtosRes.data;

  const avaliacoesDaLoja = todasAvaliacoes.filter(
    (av: any) => av.loja_id === Number(params.id)
  );

  const notaGeral =
    avaliacoesDaLoja.length > 0
      ? avaliacoesDaLoja.reduce(
          (acc: number, curr: any) => acc + curr.nota,
          0
        ) / avaliacoesDaLoja.length
      : 5;

  const melhoresAvaliados = todosProdutos
    .filter((p: any) => p.disponivel)
    .slice(0, 5);

  return (
    <div className="bg-[#F9F6EE] min-h-screen text-black">
      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url(${
            loja.banner_url || '/placeholder-banner.jpg'
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-serif">{loja.nome}</h1>

          <p className="text-xl italic mt-2">
            {loja.descricao || 'beleza'}
          </p>

          <div className="flex justify-center mt-4 text-yellow-400 text-2xl">
            ★★★★★
          </div>
        </div>
      </div>

      <section className="p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Produtos{' '}
          <span className="text-sm font-normal text-gray-600">
            melhor avaliados
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {melhoresAvaliados.map((produto: any) => (
            <div
              key={produto.id}
              className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="h-40 object-contain mb-4"
              />

              <h3 className="font-bold text-lg">
                {produto.nome}
              </h3>

              <p className="text-xl font-semibold">
                R$ {Number(produto.preco).toFixed(2)}
              </p>

              <span
                className={`text-xs font-bold mt-2 ${
                  produto.disponivel
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                {produto.disponivel
                  ? 'DISPONÍVEL'
                  : 'INDISPONÍVEL'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-12 px-8 text-center">
        <h2 className="text-3xl font-light mb-2">
          Reviews e Comentários
        </h2>

        <div className="text-5xl font-bold mb-2">
          {notaGeral.toFixed(2)}
        </div>

        <div className="text-yellow-400 text-2xl mb-6">
          ★★★★★
        </div>

        {avaliacoesDaLoja.length > 0 && (
          <div className="max-w-3xl mx-auto bg-[#F9F6EE] text-black p-6 rounded-3xl flex items-center gap-6 text-left relative">
            <img
              src={
                avaliacoesDaLoja[0].usuario?.foto ||
                '/default-avatar.png'
              }
              alt={
                avaliacoesDaLoja[0].usuario?.nome ||
                'Usuário'
              }
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">
                  {avaliacoesDaLoja[0].usuario?.nome ||
                    'Usuário'}
                </h4>

                <span className="text-yellow-500">
                  {'★'.repeat(avaliacoesDaLoja[0].nota)}
                </span>
              </div>

              <p className="text-gray-700 mt-2 text-sm">
                {avaliacoesDaLoja[0].comentario}
              </p>

              <Link
                href={`/loja/${params.id}/avaliacoes`}
                className="absolute bottom-4 right-6 text-purple-700 font-semibold hover:underline text-sm"
              >
                ver mais
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Produtos{' '}
          <span className="text-sm font-normal text-gray-600">
            de {loja.nome.toLowerCase()}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {todosProdutos.map((produto: any) => (
            <div
              key={produto.id}
              className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="h-40 object-contain mb-4"
              />

              <h3 className="font-bold text-lg">
                {produto.nome}
              </h3>

              <p className="text-xl font-semibold">
                R$ {Number(produto.preco).toFixed(2)}
              </p>

              <span
                className={`text-xs font-bold mt-2 ${
                  produto.disponivel
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                {produto.disponivel
                  ? 'DISPONÍVEL'
                  : 'INDISPONÍVEL'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}