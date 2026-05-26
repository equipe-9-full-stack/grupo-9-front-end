'use client';

import React from 'react';
import { X, ArrowLeft, Key, Camera } from 'lucide-react';

interface ModaisProfileProps {
  isOpenModalSenha?: boolean;
  isOpenModalPerfil?: boolean;
  onClose?: () => void;
}

export default function ModaisProfile({ 
  isOpenModalSenha = true, 
  isOpenModalPerfil = true, 
  onClose 
}: ModaisProfileProps) {
  return (
    <div className="min-h-screen bg-[#9CA3AF] flex flex-col md:flex-row items-center justify-center gap-12 p-6 font-sans">
      
      {isOpenModalSenha && (
        <div className="w-[400px] h-[540px] bg-[#EEEEEE] rounded-[32px] p-8 relative flex flex-col items-center justify-between shadow-lg">
          <div className="w-full flex justify-between items-center">
            <button className="text-black hover:opacity-70 transition cursor-pointer">
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <button onClick={onClose} className="text-black hover:opacity-70 transition cursor-pointer">
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
                className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
              />
              <input 
                type="password" 
                placeholder="Nova Senha" 
                className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
              />
              <input 
                type="password" 
                placeholder="Confirmar Senha" 
                className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
              />
            </div>
          </div>

          <button className="w-full h-12 bg-[#6A3FF4] text-white rounded-full font-medium shadow-[0_4px_10px_rgba(106,63,244,0.35)] hover:bg-[#5733C9] transition text-base mt-4 cursor-pointer">
            Salvar Senha
          </button>
        </div>
      )}

      {isOpenModalPerfil && (
        <div className="w-[400px] h-[540px] bg-[#EEEEEE] rounded-[32px] p-8 relative flex flex-col items-center justify-between shadow-lg">
          <div className="w-full flex justify-end items-center">
            <button onClick={onClose} className="text-black hover:opacity-70 transition cursor-pointer">
              <X size={28} strokeWidth={2} />
            </button>
          </div>

          <div className="w-full flex flex-col items-center flex-1 justify-center gap-5 -mt-4">
            <div className="relative w-28 h-28 mb-2">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border border-gray-200"
              />
              <button className="absolute bottom-0 right-1 bg-white p-2 rounded-full shadow-md text-black hover:bg-gray-100 transition border border-gray-100 cursor-pointer">
                <Camera size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="w-full flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Nome" 
                className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
              />
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 mt-4">
            <button className="w-full h-11 border border-[#AE1125] text-[#AE1125] bg-[#EFEBEF] rounded-full font-medium hover:bg-red-50 transition text-sm cursor-pointer">
              Deletar conta
            </button>
            
            <button className="w-full h-11 border border-[#6A3FF4] text-[#6A3FF4] bg-[#EFEBEF] rounded-full font-medium hover:bg-purple-50 transition text-sm cursor-pointer">
              Alterar senha
            </button>
            
            <button className="w-full h-11 bg-[#6A3FF4] text-white rounded-full font-medium shadow-[0_4px_10px_rgba(106,63,244,0.35)] hover:bg-[#5733C9] transition text-sm cursor-pointer">
              Salvar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}