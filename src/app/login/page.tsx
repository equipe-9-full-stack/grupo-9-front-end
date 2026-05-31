"use client";

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
        window.location.href = "/"; // Redireciona para a Home após logar!
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
        <div className="mb-4 md:mb-8 self-center">
           <img 
              src="/logo.svg" 
              alt="Logo Stock.io" 
              className="w-[421px] h-[267px] object-contain" 
           />
        </div>
        <img 
          src="/bonequinho.svg" 
          alt="Ilustração de boas-vindas" 
          className="w-full max-w-5xl max-h-[60vh] object-contain drop-shadow-2xl self-center" 
        />
      </div>

      {/* --- COLUNA DA DIREITA: CARTÃO DE LOGIN --- */}
      <div className="flex flex-col h-full justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8 rounded-[40px] bg-[#1a1a1a] p-10 md:p-14 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#FFFFFF]">
              BEM VINDO DE VOLTA
            </h1>
          </div>

          <form onSubmit={fazerLogin} className="space-y-6 mt-8">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border-none bg-[#F6F3E4] px-6 py-4 text-gray-800 placeholder-gray-500 outline-none transition focus:ring-4 focus:ring-[#6A38F3]/50 font-medium"
                required
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-full border-none bg-[#F6F3E4] px-6 py-4 text-gray-800 placeholder-gray-500 outline-none transition focus:ring-4 focus:ring-[#6A38F3]/50 font-medium"
                required
              />
            </div>

            {erro && <p className="text-red-400 text-sm font-bold text-center animate-pulse">{erro}</p>}

            <div className="flex justify-center pt-2">
              <a href="#" className="text-sm font-medium text-gray-300 underline underline-offset-4 transition hover:text-white">
                Esqueceu sua senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#6A38F3] py-4 text-base font-bold uppercase tracking-wider text-[#FFFFFF] transition hover:bg-[#582cd1] shadow-lg mt-4"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-8">
            Não possui uma conta?{' '}
            <a href="#" className="font-bold text-[#6A38F3] transition hover:text-[#582cd1]">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}