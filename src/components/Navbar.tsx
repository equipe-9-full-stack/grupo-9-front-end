"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [estaLogado, setEstaLogado] = useState(false);

  useEffect(() => {
    // Procura o token para saber se exibe os botões de entrar ou os ícones de perfil
    const token = localStorage.getItem("meu_token");
    if (token) {
      setEstaLogado(true);
    }
  }, []);

  const fazerLogout = () => {
    localStorage.removeItem("meu_token");
    setEstaLogado(false);
    window.location.href = "/login"; // Redireciona o usuário de volta pro login
  };

  return (
    // Altura exata do Figma: h-[92px]
    <nav className="w-full h-[92px] bg-[#000000] px-8 md:px-16 flex items-center justify-between">
      
      {/* LOGO DA ESQUERDA */}
      <a href="/" className="flex items-center cursor-pointer transition hover:opacity-80">
        <img 
          src="/logo-branca.svg" 
          alt="Stock.io Logo" 
          className="h-[48px] w-auto object-contain" 
        />
      </a>

      {/* ÁREA DA DIREITA (Botões ou Ícones) */}
      <div className="flex items-center gap-8">
        
        {estaLogado ? (
          /* ----- USUÁRIO LOGADO ----- */
          <>
            {/* Ícone de Usuário (Hover Roxo) */}
            <button className="text-white hover:text-[#6A38F3] transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Ícone de Sair (Hover Vermelho) */}
            <button 
              onClick={fazerLogout}
              className="text-white hover:text-[#FF0000] transition-colors duration-300"
              title="Sair"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </>
        ) : (
          /* ----- USUÁRIO DESLOGADO ----- */
          <>
            {/* Link LOGIN (Hover Roxo) */}
            <a 
              href="/login" 
              className="text-[#FFFFFF] hover:text-[#6A38F3] font-bold text-[15px] tracking-wider transition-colors duration-300"
            >
              LOGIN
            </a>

            {/* Botão CADASTRE-SE (Fundo Roxo -> Fundo Branco no Hover) */}
            <a 
              href="/cadastrar" 
              className="bg-[#6A38F3] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#6A38F3] px-8 py-3 rounded-full font-bold text-[15px] tracking-wider transition-all duration-300"
            >
              CADASTRE-SE
            </a>
          </>
        )}

      </div>
    </nav>
  );
}