"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ModalEditarComentario from "@/components/ModalEditarComentario";

export default function ProdutoPage() {
  const [produto, setProduto] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemAtual, setImagemAtual] = useState("/brownieEmbalado.png"); 
  const [estaLogado, setEstaLogado] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado que guarda o texto enviado pelo Modal
  const [meuComentarioNovo, setMeuComentarioNovo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("meu_token");
    if (token) setEstaLogado(true);

    const opcoesDoFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}) 
      }
    };

    fetch("http://localhost:3000/produtos/1", opcoesDoFetch)
      .then((resposta) => resposta.json())
      .then((dadosDoBanco) => {
        if (dadosDoBanco.statusCode === 401 || dadosDoBanco.error) {
           setProduto(null);
           setCarregando(false);
           return;
        }

        setProduto(dadosDoBanco);
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
        {/* PARTE DE CIMA: DETALHES DO PRODUTO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Galeria de Fotos */}
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

          {/* Informações */}
          <div className="md:col-span-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{produto.nome}</h1>
              
              {estaLogado && (
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="relative z-10 bg-[#7C3AED] w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm cursor-pointer"
                  >
                    <img src="/lapisroxo.svg" alt="Editar" className="w-4 h-4" />
                  </button>
                  <button className="relative z-10 bg-[#C6E700] w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm cursor-pointer">
                    <img src="/estrela.svg" alt="Destaque" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
              <div className="flex items-center gap-1 text-[#C6E700] bg-black px-2 py-0.5 rounded font-bold">
                <span>★</span><span className="text-white text-xs">4.5</span>
              </div>
              <span className="text-gray-500">| {meuComentarioNovo ? '2 reviews' : '1 review'}</span>
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

        {/* PARTE DE BAIXO: AVALIAÇÕES E COMENTÁRIOS */}
        <div className="mt-16 pt-10 border-t border-gray-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Avaliações</h2>
          </div>

          {/* SEU NOVO COMENTÁRIO (Com o círculo BLINDADO) */}
          {meuComentarioNovo && (
            <div className="bg-[#F3E8FF] p-6 md:p-8 rounded-[20px] shadow-sm border border-[#7C3AED] flex flex-col md:flex-row gap-6 items-start mb-6 transition-all duration-500">
             <div 
  className="bg-[#7C3AED] text-white font-bold text-lg uppercase flex items-center justify-center rounded-full shadow-sm"
  style={{ width: "48px", height: "48px", minWidth: "48px", minHeight: "48px", flexShrink: 0 }}
>
  EU
</div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg">A sua Avaliação</h4>
                    <div className="flex gap-1 text-[#C6E700] text-sm mt-1">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(true)} className="text-[#7C3AED] hover:text-black transition-colors flex items-center gap-1 text-sm font-semibold cursor-pointer relative z-10">
                    Editar
                  </button>
                </div>
                <p className="text-gray-800 mt-3 leading-relaxed">{meuComentarioNovo}</p>
              </div>
            </div>
          )}

          {/* CARD DE COMENTÁRIO ANTIGO (Com o círculo BLINDADO) */}
          <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 min-w-[48px] min-h-[48px] flex-shrink-0 bg-[#0F395A] rounded-full flex items-center justify-center text-white font-bold text-lg uppercase shadow-sm">
              U
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg">Usuário Cliente</h4>
                  <div className="flex gap-1 text-[#C6E700] text-sm mt-1">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
                
                {estaLogado && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-gray-400 hover:text-[#7C3AED] transition-colors flex items-center gap-1 text-sm font-semibold cursor-pointer relative z-10"
                  >
                    Editar
                  </button>
                )}
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Adorei o produto! Chegou super rápido e a qualidade é excelente. Com certeza comprarei de novo na loja.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* COMPONENTE DO MODAL */}
      <ModalEditarComentario
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={(textoQueVeioDoModal) => setMeuComentarioNovo(textoQueVeioDoModal)}
      />

    </div>
  );
}