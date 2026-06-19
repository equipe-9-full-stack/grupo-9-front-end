'use client';

import { useState } from 'react';

import ModalAdicionarLoja from '../../components/ModalAdicionarLoja';
import ModalEditarLoja from '../../components/ModalEditarLoja';

export default function PaginaDeTeste() {
  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false);
  const [isEditarOpen, setIsEditarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-4">

      <h1 className="text-white text-xl font-medium">
        Ambiente de Teste Isolado
      </h1>

      <button
        onClick={() => setIsAdicionarOpen(true)}
        className="px-6 py-2.5 bg-[#6C38FF] text-white rounded-full font-medium shadow-md hover:bg-[#5524E0] transition-all"
      >
        Abrir Modal Adicionar Loja
      </button>

      <button
        onClick={() => setIsEditarOpen(true)}
        className="px-6 py-2.5 bg-[#6C38FF] text-white rounded-full font-medium shadow-md hover:bg-[#5524E0] transition-all"
      >
        Abrir Modal Editar Loja
      </button>

      <ModalAdicionarLoja
        isOpen={isAdicionarOpen}
        onClose={() => setIsAdicionarOpen(false)}
      />

      <ModalEditarLoja
        isOpen={isEditarOpen}
        onClose={() => setIsEditarOpen(false)}
      />

    </div>
  );
}