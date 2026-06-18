'use client';

import { useState } from 'react';

import ModalAdicionarLoja from '@/components/ModalAdicionarLoja';
import ModalEditarLoja from '@/components/ModalEditarLoja';

export default function TesteModais() {
  const [openAdicionar, setOpenAdicionar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center gap-4">

      <button
        onClick={() => setOpenAdicionar(true)}
        className="bg-purple-600 text-white px-6 py-3 rounded-full"
      >
        Abrir Adicionar Loja
      </button>

      <button
        onClick={() => setOpenEditar(true)}
        className="bg-purple-600 text-white px-6 py-3 rounded-full"
      >
        Abrir Editar Loja
      </button>

      <ModalAdicionarLoja
        isOpen={openAdicionar}
        onClose={() => setOpenAdicionar(false)}
      />

      <ModalEditarLoja
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
      />

    </main>
  );
}