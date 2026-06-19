import { useState } from "react";

interface ModalEditarComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (texto: string) => void; // <-- 1. Nova função que envia o texto
}

export default function ModalEditarComentario({ isOpen, onClose, onSave }: ModalEditarComentarioProps) {
  const [comentario, setComentario] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all">
      <div className="bg-[#F6F3E4] md:bg-white w-full max-w-3xl rounded-[20px] p-6 md:p-10 relative shadow-2xl flex flex-col">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors" title="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mt-8 mb-6">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escreva sua avaliação aqui..."
            className="w-full h-64 bg-white border border-gray-200 rounded-2xl p-5 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#6A38F3] shadow-sm"
          ></textarea>
        </div>

        <button 
          className="w-full max-w-md mx-auto bg-[#6A38F3] text-white font-bold py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-md"
          onClick={() => {
            onSave(comentario); // <-- 2. Envia o texto para a página
            setComentario(""); // Limpa a caixinha de texto
            onClose(); // Fecha o modal
          }}
        >
          Avaliar
        </button>
      </div>
    </div>
  );
}