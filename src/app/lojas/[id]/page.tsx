import React from 'react';
import Link from 'next/link';

import Navbar from '../../../components/Navbar';
import Carrossel from '../../../components/Carrossel';

export default async function LojaPage() {
  const loja = {
    id: 1,
    nome: 'Rare Beauty',
    descricao: 'beleza',
    imagem: '/shoot.png',
    criador: 'Selena Gomez',
  };

  const melhoresAvaliados = [
    {
      id: 1,
      nome: 'Bronzer',
      preco: 254.99,
      imagem: '/bronzer.png',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Blush',
      preco: 199.99,
      imagem: '/blush.png',
      disponivel: false,
    },
    {
      id: 3,
      nome: 'Perfume Rare',
      preco: 599.9,
      imagem: '/perfume.png',
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Iluminador',
      preco: 249.9,
      imagem: '/iluminador.png',
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Mini Blush',
      preco: 99.99,
      imagem: '/mini-blush.png',
      disponivel: false,
    },
  ];

  const comentarios = [
    {
      id: 1,
      usuario: 'Sophia Laforteza',
      foto: '/sofia.png',
      nota: 5,
      comentario:
        'Adorei o produto. Funcionou muito na minha pele. Estou muito contente e com toda certeza irei comprar mais produtos da marca. Que orgulhoooooooo! Arrasaram.',
    },
    {
      id: 2,
      usuario: 'Selena Gomez',
      foto: '/selena.png',
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
      imagem: '/lapis.png',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Creme Corporal',
      preco: 299.99,
      imagem: '/creme.png',
      disponivel: false,
    },
    {
      id: 3,
      nome: 'Contorno',
      preco: 289.9,
      imagem: '/contorno.png',
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Iluminador',
      preco: 249.9,
      imagem: '/iluminador.png',
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Primer',
      preco: 139,
      imagem: '/primer.png',
      disponivel: true,
    },
    {
      id: 6,
      nome: 'Mascara de C.',
      preco: 109.99,
      imagem: '/mascara.png',
      disponivel: true,
    },
    {
      id: 7,
      nome: 'Mini Blush',
      preco: 99.99,
      imagem: '/mini-blush.png',
      disponivel: false,
    },
    {
      id: 8,
      nome: 'Pó Compacto',
      preco: 119.5,
      imagem: '/po.png',
      disponivel: true,
    },
    {
      id: 9,
      nome: 'Perfume Rare',
      preco: 599.9,
      imagem: '/perfume.png',
      disponivel: true,
    },
    {
      id: 10,
      nome: 'Contorno',
      preco: 289.99,
      imagem: '/contorno.png',
      disponivel: false,
    },
  ];

  const notaGeral = 4.75;

  return (
    <div className="min-h-screen bg-[#F8F4E9] text-black">
      <Navbar />

      {/* Banner */}
      <section
        className="relative h-[650px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${loja.imagem})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[110px] md:text-[130px] leading-none font-light text-[#F8F4E9]">
              {loja.nome}
            </h1>

            <p className="text-4xl text-[#F8F4E9] mt-2">
              {loja.descricao}
            </p>

            <div className="text-yellow-400 text-6xl mt-6">
              ★★★★★
            </div>
          </div>
        </div>

        <p className="absolute bottom-8 right-10 text-3xl text-[#F8F4E9] z-20">
          by {loja.criador}
        </p>
      </section>

      {/* Produtos melhor avaliados */}
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
                R$ {produto.preco.toFixed(2)}
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

      {/* Reviews */}
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

          <div className="flex justify-end mt-10">
            <Link
              href={`/lojas/${loja.id}/avaliacoes`}
              className="text-purple-500 text-3xl hover:underline"
            >
              ver mais
            </Link>
          </div>

          <div className="mt-8">
            <Carrossel>
              {comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="bg-[#F8F4E9] rounded-[40px] p-8 flex items-center gap-8 min-w-[1100px]"
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

                    <p className="text-2xl text-gray-600 mt-4">
                      {comentario.comentario}
                    </p>
                  </div>
                </div>
              ))}
            </Carrossel>
          </div>
        </div>
      </section>

      {/* Produtos da loja */}
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

              <h3 className="text-3xl font-semibold w-full text-left">
                {produto.nome}
              </h3>

              <p className="text-2xl w-full text-left">
                R$ {produto.preco.toFixed(2)}
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

        <div className="flex justify-center items-center gap-10 text-5xl mt-20">
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