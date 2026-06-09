'use client';

import { X, Star } from 'lucide-react';

interface ModalAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  nomeLoja: string;
}

export default function ModalAvaliacao({ isOpen, onClose, nomeLoja }: ModalAvaliacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#F0F0F0] rounded-[28px] p-8 shadow-xl mx-4">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:opacity-75 transition-opacity"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <h2 className="text-2xl md:text-3xl text-zinc-800 font-normal tracking-wide">
            Você está avaliando <span className="font-semibold text-black">{nomeLoja}</span>
          </h2>
        </div>

      </div>
    </div>
  );
}