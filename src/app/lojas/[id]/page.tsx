import React from 'react';
import Link from 'next/link';

import Navbar from '../../../components/Navbar';
import Carrossel from '../../../components/Carrossel';

export default async function LojaPage({
  params,
}: {
  params: { id: string };
}) {
  const loja = {
    id: 1,
    nome: 'Rare Beauty',
    descricao: 'beleza',
    banner_url:
      'https://images.squarespace-cdn.com/content/v1/5f74ef08d84f202aee6f7b4d/1653593121887-LH5XFLI4G50QWGX15LUB/Rare+Beauty+Campaign.jpeg',
    criador: 'Selena Gomez',
  };

  const melhoresAvaliados = [
    {
      id: 1,
      nome: 'Bronzer',
      preco: 254.99,
      imagem: '/images/bronzer.png',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Blush',
      preco: 199.99,
      imagem: '/images/blush.png',
      disponivel: false,
    },
    {
      id: 3,
      nome: 'Perfume Rare',
      preco: 599.9,
      imagem: '/images/perfume.png',
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Iluminador',
      preco: 249.9,
      imagem: '/images/iluminador.png',
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Mini Blush',
      preco: 99.99,
      imagem: '/images/mini-blush.png',
      disponivel: false,
    },
  ];

  const comentarios = [
    {
      id: 1,
      usuario: 'Sofia Figueiredo',
      foto: '/images/avatar1.png',
      nota: 5,
      comentario:
        'Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram.',
    },
    {
      id: 2,
      usuario: 'Selena Gomez',
      foto: '/images/avatar2.png',
      nota: 5,
      comentario:
        'Não é apenas maquiagem, é uma forma de expressão e autoestima.',
    },
  ];

  const produtos = [
    {
      id: 1,
      nome: 'Lapis Labial',
      preco: 139.9,
      imagem: '/images/lapis.png',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Comp. Samsung',
      preco: 8549.99,
      imagem: '/images/lip-oil.png',
      disponivel: false,
    },
    {
      id: 3,
      nome: 'Contorno',
      preco: 289.9,
      imagem: '/images/contorno.png',
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Iluminador',
      preco: 249.9,
      imagem: '/images/iluminador.png',
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Primer',
      preco: 139,
      imagem: '/images/primer.png',
      disponivel: true,
    },
    {
      id: 6,
      nome: 'Mascara de C.',
      preco: 109.99,
      imagem: '/images/mascara.png',
      disponivel: true,
    },
    {
      id: 7,
      nome: 'Mini Blush',
      preco: 99.99,
      imagem: '/images/mini-blush.png',
      disponivel: false,
    },
    {
      id: 8,
      nome: 'Pó Compacto',
      preco: 119.5,
      imagem: '/images/po.png',
      disponivel: true,
    },
    {
      id: 9,
      nome: 'Perfume Rare',
      preco: 599.9,
      imagem: '/images/perfume.png',
      disponivel: true,
    },
    {
      id: 10,
      nome: 'Contorno',
      preco: 289.99,
      imagem: '/images/contorno.png',
      disponivel: false,
    },
  ];

  const notaGeral = 4.75;

  return (
    <div className="min-h-screen bg-[#F8F4E9] text-black">
      <Navbar />

      <section
        className="relative h-[700px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${loja.banner_url})`,
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-10">
          <div className="max-w-2xl">
            <h1 className="text-8xl md:text-9xl font-light text-[#F8F4E9]">
              {loja.nome}
            </h1>

            <p className="text-3xl mt-2 text-[#F8F4E9]">
              {loja.descricao}
            </p>

            <div className="text-yellow-400 text-5xl mt-6 tracking-wider">
              ★★★★★
            </div>
          </div>

          <p className="absolute right-10 bottom-0 text-3xl text-[#F8F4E9]">
            by {loja.criador}
          </p>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-14 px-8">
        <h2 className="text-5xl font-bold mb-10">
          Produtos
          <span className="text-2xl font-normal ml-2">
            melhor avaliados
          </span>
        </h2>

        <Carrossel>
          {melhoresAvaliados.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-[30px] p-8 min-w-[260px] flex flex-col items-center"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="h-52 object-contain mb-6"
              />

              <h3 className="text-3xl font-semibold w-full text-left">
                {produto.nome}
              </h3>

              <p className="text-2xl font-medium w-full text-left">
                R${' '}
                {produto.preco.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>

              <span
                className={`w-full text-left text-lg mt-2 ${
                  produto.disponivel
                    ? 'text-lime-500'
                    : 'text-red-600'
                }`}
              >
                {produto.disponivel
                  ? 'DISPONÍVEL'
                  : 'INDISPONÍVEL'}
              </span>
            </div>
          ))}
        </Carrossel>
      </section>

      <section className="bg-black py-20 px-8">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center text-white">
            <h2 className="text-6xl font-light">
              Reviews e Comentários
            </h2>

            <div className="text-8xl font-light mt-6">
              {notaGeral}
            </div>

            <div className="text-yellow-400 text-6xl mt-6">
              ★★★★★
            </div>
          </div>

          <div className="mt-16">
            <Carrossel>
              {comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="bg-[#F8F4E9] rounded-[40px] p-8 flex items-center gap-8 min-w-[1100px] relative"
                >
                  <img
                    src={comentario.foto}
                    alt={comentario.usuario}
                    className="w-36 h-36 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-4xl font-medium">
                        {comentario.usuario}
                      </h3>

                      <div className="text-yellow-400 text-4xl">
                        {'★'.repeat(comentario.nota)}
                      </div>
                    </div>

                    <p className="text-2xl text-gray-700 mt-4">
                      {comentario.comentario}
                    </p>

                    <Link
                      href={`/loja/${params.id}/avaliacoes`}
                      className="absolute bottom-8 right-8 text-purple-600 text-2xl hover:underline"
                    >
                      ver mais
                    </Link>
                  </div>
                </div>
              ))}
            </Carrossel>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-16 px-8">
        <h2 className="text-5xl font-bold mb-10">
          Produtos
          <span className="text-2xl font-normal ml-2">
            de {loja.nome.toLowerCase()}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-[30px] p-8 flex flex-col items-center"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="h-52 object-contain mb-6"
              />

              <h3 className="text-3xl font-semibold w-full text-left truncate">
                {produto.nome}
              </h3>

              <p className="text-2xl w-full text-left">
                R${' '}
                {produto.preco.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>

              <span
                className={`w-full text-left text-lg mt-2 ${
                  produto.disponivel
                    ? 'text-lime-500'
                    : 'text-red-600'
                }`}
              >
                {produto.disponivel
                  ? 'DISPONÍVEL'
                  : 'INDISPONÍVEL'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-10 text-6xl mt-20">
          <button>{'<'}</button>
          <button className="font-bold">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>{'>'}</button>
        </div>
      </section>
    </div>
  );
}