import { useState } from "react";

// Definimos o que o Modal precisa receber para funcionar
interface ModalEditarComentarioProps {
  isOpen: boolean; // Diz se o modal tá aberto ou fechado
  onClose: () => void; // Função para fechar o modal
}

export default function ModalEditarComentario({ isOpen, onClose }: ModalEditarComentarioProps) {
  // Estado para guardar o que a pessoa digitar
  const [comentario, setComentario] = useState("");

  // Se o modal não estiver aberto, não renderiza nada (some da tela)
  if (!isOpen) return null;

  return (
    // Fundo escuro transparente (Overlay)
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all">
      
      {/* Caixa branca do Modal */}
      <div className="bg-[#F6F3E4] md:bg-white w-full max-w-3xl rounded-[20px] p-6 md:p-10 relative shadow-2xl flex flex-col">
        
        {/* Botão de Fechar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors"
          title="Fechar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Área de Texto */}
        <div className="mt-8 mb-6">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Comentário"
            className="w-full h-64 bg-white border border-gray-200 rounded-2xl p-5 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#6A38F3] shadow-sm"
          ></textarea>
        </div>

        {/* Botão Avaliar */}
        <button 
          className="w-full max-w-md mx-auto bg-[#6A38F3] text-white font-bold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md"
          onClick={() => {
            console.log("Comentário salvo:", comentario);
            // Aqui futuramente vai a integração de Editar do Back-end!
            onClose(); // Fecha o modal depois de salvar
          }}
        >
          Avaliar
        </button>
        
      </div>
    </div>
  );
}