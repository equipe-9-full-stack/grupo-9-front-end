'use client';

import { useState } from 'react';
import ModaisProfile from '@/componentes/ModaisProfile';

export default function ProfilePage() {
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);

  return (
    <main className="min-h-screen bg-[#9CA3AF] p-8 flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Configurações da Conta</h1>

      <div className="flex gap-4">
        <button 
          onClick={() => setModalPerfilAberto(true)}
          className="px-4 h-11 bg-[#6A3FF4] text-white rounded-lg font-medium cursor-pointer shadow-md hover:bg-[#5733C9] transition"
        >
          Abrir Editar Perfil
        </button>

        <button 
          onClick={() => setModalSenhaAberto(true)}
          className="px-4 h-11 bg-[#6A3FF4] text-white rounded-lg font-medium cursor-pointer shadow-md hover:bg-[#5733C9] transition"
        >
          Abrir Alterar Senha
        </button>
      </div>

      {(modalSenhaAberto || modalPerfilAberto) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <ModaisProfile 
            isOpenModalSenha={modalSenhaAberto}
            isOpenModalPerfil={modalPerfilAberto}
            onClose={() => {
              setModalSenhaAberto(false);
              setModalPerfilAberto(false);
            }}
          />
        </div>
      )}
    </main>
  );
}