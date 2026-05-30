'use client';

import React, { useState } from 'react';
import { X, ArrowLeft, Key } from 'lucide-react';

interface ModalAlterarSenhaProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function ModalAlterarSenha({ isOpen, onClose }: ModalAlterarSenhaProps) {
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  if (!isOpen) return null;

  const handleSalvarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/profile/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senhaAntiga,
          novaSenha
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar senha');
      }

      alert('Senha alterada com sucesso!');
      setSenhaAntiga('');
      setNovaSenha('');
      setConfirmarSenha('');
    } catch (error) {
      console.error(error);
      alert('Falha ao atualizar a senha no servidor.');
    }
  };

  return (
    <form onSubmit={handleSalvarSenha} className="w-[400px] h-[540px] bg-[#EEEEEE] rounded-[32px] p-8 relative flex flex-col items-center justify-between shadow-lg">
      <div className="w-full flex justify-between items-center">
        <button type="button" className="text-black hover:opacity-70 transition cursor-pointer">
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <button type="button" onClick={onClose} className="text-black hover:opacity-70 transition cursor-pointer">
          <X size={28} strokeWidth={2} />
        </button>
      </div>

      <div className="w-full flex flex-col items-center flex-1 justify-center gap-6">
        <div className="text-[#6A3FF4] mb-2 transform -rotate-45">
          <Key size={80} fill="#A78BFA" strokeWidth={1.5} />
        </div>

        <div className="w-full flex flex-col gap-3">
          <input 
            type="password" 
            placeholder="Senha Antiga" 
            value={senhaAntiga}
            onChange={(e) => setSenhaAntiga(e.target.value)}
            required
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
          />
          <input 
            type="password" 
            placeholder="Nova Senha" 
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
          />
          <input 
            type="password" 
            placeholder="Confirmar Senha" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
          />
        </div>
      </div>

      <button type="submit" className="w-full h-12 bg-[#6A3FF4] text-white rounded-full font-medium shadow-[0_4px_10px_rgba(106,63,244,0.35)] hover:bg-[#5733C9] transition text-base mt-4 cursor-pointer">
        Salvar Senha
      </button>
    </form>
  );
}