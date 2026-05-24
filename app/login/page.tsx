"use client"; // Habilita a interatividade do React

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const fazerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, senha: senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        localStorage.setItem("meu_token", dados.access_token);
        alert("Login realizado com sucesso! 🎉");
      } else {
        setErro("E-mail ou senha incorretos.");
      }
    } catch (error) {
      setErro("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#F6F3E4] md:grid-cols-2">
      
      {/* --- COLUNA DA ESQUERDA: LOGO E BONEQUINHO --- */}
      <div className="flex flex-col h-full justify-center items-center p-6 lg:p-12">
        
        {/* LOGO: Tamanho 46 (184px de altura) */}
        <div className="mb-12 md:mb-16 self-center">
           <img 
              src="/logo.svg" 
              alt="Logo Stock.io" 
              className="h-[184px] w-auto transition-all" 
           />
        </div>

        {/* BONEQUINHO: Tamanho MÁXIMO! (max-w-5xl e altura liberada para 75%) */}
        <img 
          src="/bonequinho.svg" 
          alt="Ilustração de boas-vindas" 
          className="w-full max-w-5xl max-h-[75vh] object-contain drop-shadow-2xl self-center" 
        />
        
      </div>

      {/* --- COLUNA DA DIREITA: CARTÃO DE LOGIN --- */}
      <div className="flex flex-col h-full justify-center items-center p-6 lg:p-12">

        {/* Cartão Escuro #171918 - Estreito (max-w-sm) */}
        <div className="w-full max-w-sm space-y-8 rounded-2xl bg-[#171918] p-10 shadow-2xl">
          
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold tracking-wider text-[#FFFFFF]">
              BEM VINDO DE VOLTA
            </h1>
          </div>

          <form onSubmit={fazerLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#FFFFFF]">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-none bg-white/20 p-3 text-[#FFFFFF] placeholder-white/70 outline-none transition focus:ring-2 focus:ring-[#6A38F3]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#FFFFFF]">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-lg border-none bg-white/20 p-3 text-[#FFFFFF] placeholder-white/70 outline-none transition focus:ring-2 focus:ring-[#6A38F3]"
                required
              />
            </div>

            {erro && (
              <p className="text-red-400 text-sm font-bold text-center animate-pulse">
                {erro}
              </p>
            )}

            <div className="flex justify-end">
              <a href="#" className="text-sm font-semibold text-[#6A38F3] transition hover:opacity-80">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#6A38F3] p-3 text-sm font-bold text-[#FFFFFF] transition hover:opacity-90 shadow-md"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-[#FFFFFF]">
            Ainda não tem conta?{' '}
            <a href="#" className="font-semibold text-[#6A38F3] transition hover:opacity-80">
              Crie uma agora!
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}