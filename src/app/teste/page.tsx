'use client';

import { useState } from 'react';
import ModalAvaliacao from '../../components/ModalAvaliacao';

export default function PaginaDeTeste() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-4">
      <h1 className="text-white text-xl font-medium">Ambiente de Teste Isolado</h1>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2.5 bg-[#6C38FF] text-white rounded-full font-medium shadow-md hover:bg-[#5524E0] transition-all"
      >
        Abrir Modal Novamente
      </button>

      <ModalAvaliacao 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        nomeLoja="Rare Beauty" 
      />
    </div>
  );
}