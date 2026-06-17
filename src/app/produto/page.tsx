"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ProdutoPage() {
  const [produto, setProduto] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemAtual, setImagemAtual] = useState("/brownieEmbalado.png"); 
  const [estaLogado, setEstaLogado] = useState(false);

  useEffect(() => {
    // Recupera o token de autenticação do localStorage
    const token = localStorage.getItem("meu_token");
    if (token) setEstaLogado(true);

    // Configura os cabeçalhos da requisição incluindo o token JWT, se existente
    const opcoesDoFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}) 
      }
    };

    // Requisição para buscar os dados do produto de ID 1
    fetch("http://localhost:3000/produtos/1", opcoesDoFetch)
      .then((resposta) => resposta.json())
      .then((dadosDoBanco) => {
        // Tratamento para caso o usuário não esteja autorizado ou ocorra erro na rota
        if (dadosDoBanco.statusCode === 401 || dadosDoBanco.error) {
           setProduto(null);
           setCarregando(false);
           return;
        }

        setProduto(dadosDoBanco);
        
        // Define a imagem principal com base no retorno do banco de dados
        const primeiraImagem = dadosDoBanco.imagens?.[0]?.url || "/brownieEmbalado.png";
        setImagemAtual(primeiraImagem);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar produto:", erro);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F6F3E4] flex items-center justify-center">
        <p className="text-xl font-bold animate-pulse text-[#7C3AED]">Carregando o produto...</p>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#F6F3E4] flex flex-col items-center justify-center text-[#171918]">
        <Navbar />
        <p className="text-2xl font-bold mt-10">Ops! Produto não encontrado. 😢</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3E4] text-[#171918]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* LADO ESQUERDO: Galeria de Fotos */}
          <div className="md:col-span-6 flex gap-4 md:gap-6 items-start">
            <button className="text-2xl font-light text-gray-800 hover:text-black mt-4">&lt;</button>

            <div className="flex flex-col gap-3">
              <img 
                src="/brownieEmbalado.png" 
                alt="Miniatura 1" 
                onClick={() => setImagemAtual("/brownieEmbalado.png")} 
                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 cursor-pointer bg-white shadow-sm transition-all ${imagemAtual === "/brownieEmbalado.png" ? "border-[#7C3AED]" : "border-transparent hover:border-gray-300"}`} 
              />
              <img 
                src="/browniecortado.png" 
                alt="Miniatura 2" 
                onClick={() => setImagemAtual("/browniecortado.png")} 
                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 cursor-pointer bg-white shadow-sm transition-all ${imagemAtual === "/browniecortado.png" ? "border-[#7C3AED]" : "border-transparent hover:border-gray-300"}`} 
              />
            </div>

            <div className="flex-1 bg-white rounded-3xl p-6 flex items-center justify-center border border-gray-100 shadow-sm relative w-full h-[400px] md:h-[500px]">
              <img src={imagemAtual} alt={produto.nome} className="w-full h-full object-contain transition-all" />
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#0F395A] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                CJR
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Detalhes do Produto */}
          <div className="md:col-span-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{produto.nome}</h1>
              
              {estaLogado && (
                <div className="flex gap-2.5">
                  <button className="bg-[#7C3AED] w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm">
                    <img src="/lapisroxo.svg" alt="Editar" className="w-3.5 h-3.5" />
                  </button>
                  <button className="bg-[#C6E700] w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm">
                    <img src="/estrela.svg" alt="Destaque" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
              <div className="flex items-center gap-1 text-[#C6E700] bg-black px-2 py-0.5 rounded font-bold">
                <span>★</span><span className="text-white text-xs">4.5</span>
              </div>
              <span className="text-gray-500">| 0 reviews</span>
              <span className="text-[#7C3AED] bg-[#F3E8FF] border border-[#E9D5FF] px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {produto.estoque} disponíveis
              </span>
            </div>
            
            <div className="text-3xl font-black mb-6">
              R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
            </div>
            
            <div className="space-y-4 text-xs md:text-sm leading-relaxed max-w-md">
              <div>
                <h3 className="font-bold uppercase text-gray-500 text-xs tracking-wider mb-1">Descrição</h3>
                <p className="text-gray-800">{produto.descricao}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}