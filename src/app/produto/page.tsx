"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";


export default function ProdutoPage() {
  // 🧠 MEMÓRIA DA PÁGINA
  // 1. Memória da imagem (já com os nomes corretos!)
  const [imagemAtual, setImagemAtual] = useState("/brownieEmbalado.png"); 
  
  // 2. Memória do Login (com o nome que você já usa na Navbar!)
  const [estaLogado, setEstaLogado] = useState(false);

  // 3. Detector que roda assim que a página abre para ler o localStorage
  useEffect(() => {
    // Nós já sabemos que isso está funcionando perfeitamente! 🎉
    const token = localStorage.getItem("meu_token");
    if (token) {
      setEstaLogado(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3E4] text-[#171918]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* LADO ESQUERDO: Galeria de Fotos Interativa */}
          {/* (Isso aqui já está 100% perfeito com a lógica que arrumamos!) */}
          <div className="md:col-span-6 flex gap-4 md:gap-6 items-start">
            
            <button className="text-2xl font-light text-gray-800 hover:text-black mt-4">
              &lt;
            </button>

            {/* Coluna de Miniaturas */}
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
              <img 
                src="/browniecortado2.png" 
                alt="Miniatura 3" 
                onClick={() => setImagemAtual("/browniecortado2.png")}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 cursor-pointer bg-white shadow-sm transition-all ${imagemAtual === "/browniecortado2.png" ? "border-[#7C3AED]" : "border-transparent hover:border-gray-300"}`} 
              />
              <img 
                src="/tabelanutricional.png" 
                alt="Miniatura 4" 
                onClick={() => setImagemAtual("/tabelanutricional.png")}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 cursor-pointer bg-white shadow-sm transition-all ${imagemAtual === "/tabelanutricional.png" ? "border-[#7C3AED]" : "border-transparent hover:border-gray-300"}`} 
              />
            </div>

            {/* Imagem Principal (Arrumamos o tamanho dela!) */}
            <div className="flex-1 bg-white rounded-3xl p-6 flex items-center justify-center border border-gray-100 shadow-sm relative w-full h-[400px] md:h-[500px]">
              <img 
                src={imagemAtual}
                alt="Brownie Meio Amargo" 
                className="w-full h-full object-contain transition-all" // h-full w-full para preencher tudo!
              />
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#0F395A] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                CJR
              </div>
            </div>

          </div>

          {/* LADO DIREITO: Detalhes do Produto */}
          <div className="md:col-span-6 flex flex-col">
            
            {/* TÍTULO COM OS ÍCONES CONDICIONAIS */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Brownie Meio Amargo</h1>
              
              {/* O truque do React: Só mostra se estaLogado for verdadeiro */}
              {estaLogado && (
                <div className="flex gap-2.5">
                  {/* 👇 SEUS COMPONENTES ESTÃO AQUI! 👇 */}
                  {/* Botão Roxo */}
               <button className="bg-[#7C3AED] w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm">
                 <img src="/lapisroxo.svg" alt="Editar" className="w-3.5 h-3.5" />
               </button>

               {/* Botão Verde ⭐ */}
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
              <span className="text-gray-500">| 15 reviews</span>
              <span className="text-[#7C3AED] bg-[#F3E8FF] border border-[#E9D5FF] px-2.5 py-0.5 rounded-full text-xs font-semibold">mercado</span>
              <span className="text-[#7C3AED] bg-[#F3E8FF] border border-[#E9D5FF] px-2.5 py-0.5 rounded-full text-xs font-semibold">3 disponíveis</span>
            </div>
            
            <div className="text-3xl font-black mb-6">R$ 4,70</div>
            
            <div className="space-y-4 text-xs md:text-sm leading-relaxed max-w-md">
              <div>
                <h3 className="font-bold uppercase text-gray-500 text-xs tracking-wider mb-1">Descrição</h3>
                <p className="text-gray-800">Recheado com uma ganache de chocolate meio amargo bem cremosa, esse brownie conquistou o coração de muita gente!</p>
              </div>
              <div>
                <h3 className="font-bold uppercase text-gray-500 text-xs tracking-wider mb-1">Ingredientes</h3>
                <p className="text-gray-700">Achocolatado em pó, farinha de trigo enriquecida com ferro e ácido fólico, chocolate meio amargo, açúcar cristal, manteiga, água, gema de ovo, ovo em pó, glucose em pó, emulsificantes lecitina de soja, conservantes sorbato de potássio, propionato de cálcio e conservante para doces (sal refinado sem iodo, açúcar refinado, conservantes INS 202 e INS 211 e acidulante INS 330) e antioxidante sal não iodado, dióxido de milho, antioxidantes INS 321 e INS 319.</p>
              </div>
              <div className="pt-2 border-t border-gray-300">
                <p className="font-bold text-gray-900">CONTÉM GLÚTEN.</p>
                <p className="font-bold text-gray-900">CONTÉM LACTOSE.</p>
                <p className="text-gray-700 font-medium mt-1">ALÉRGICOS: CONTÉM OVO E DERIVADOS DE LEITE, TRIGO E SOJA.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco de Avaliações */}
        <div className="mt-16 pt-8 border-t border-gray-300">
          <h2 className="text-2xl font-black mb-6">Avaliações</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD 1: Selena Gomez */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-start">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Selena Gomez" 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-sm"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-base">Selena Gomez</h4>
                  <div className="flex items-center">
                    <div className="text-[#FBBF24] text-sm">★★★★★</div>
                    
                    {/* 👇 SEU COMPONENTE ESTÁ AQUI! 👇 */}
                    {/* CONDICIONAL: O lapizinho preto do usuário logado */}
                   {/* CONDICIONAL: O lapizinho preto do usuário logado */}
                 {estaLogado && (
                   <button className="ml-2.5 hover:opacity-70 transition-opacity" title="Editar Avaliação">
                     <img src="/lapispreto.svg" alt="Editar Avaliação" className="w-4 h-4" />
                   </button>
                 )}
                    
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Não é por nada não, mas essa garota arrasa
                </p>
              </div>
            </div>

            {/* CARD 2: Sofia Figueiredo */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-start">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
                alt="Sofia Figueiredo" 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-sm"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-base">Sofia Figueiredo</h4>
                  <div className="text-[#FBBF24] text-sm">★★★★★</div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Adorei o produto. Funcionou muito na minha cozinha e com toda certeza irei comprar mais vezes. Orgulhooooooo! Arrasaram
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}