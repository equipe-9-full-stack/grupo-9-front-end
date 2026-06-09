'use client';

import { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';

interface ModalEditarAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  nomeLoja: string;
  initialRating: number;
  initialComentario: string;
  onSave: (dados: { rating: number; comentario: string }) => void;
  onDelete: () => void;
}

export default function ModalEditarAvaliacao({
  isOpen,
  onClose,
  nomeLoja,
  initialRating,
  initialComentario,
  onSave,
  onDelete,
}: ModalEditarAvaliacaoProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState(initialComentario);

  useEffect(() => {
    if (isOpen) {
      setRating(initialRating);
      setComentario(initialComentario);
    }
  }, [isOpen, initialRating, initialComentario]);

  if (!isOpen) return null;

  const handleSalvar = () => {
    onSave({ rating, comentario });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-[700px] bg-[#EFEFEF] rounded-[24px] p-10 shadow-sm mx-4 flex flex-col items-center">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-black hover:opacity-70 transition-opacity">
          <X size={28} strokeWidth={2.5} />
        </button>

        <h2 className="text-[26px] text-zinc-800 font-normal tracking-tight text-center mb-6">
          Você está avaliando <span className="font-semibold text-black">{nomeLoja}</span>
        </h2>

        <div className="flex gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={62}
                className={`transition-all ${
                  star <= (hover || rating) 
                    ? 'fill-[#6C38FF] stroke-[#6C38FF]' 
                    : 'fill-transparent stroke-[#B5AEC4]'
                }`}
                strokeWidth={1}
              />
            </button>
          ))}
        </div>

        <div className="w-full bg-white rounded-[16px] p-6 mb-8 shadow-inner border border-zinc-100">
          <textarea
            className="w-full h-44 resize-none bg-transparent outline-none text-zinc-700 text-sm placeholder-zinc-400 font-light"
            placeholder="Avaliação da loja"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>

        <div className="w-full max-w-[480px] flex flex-col gap-4">
          
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="w-full bg-[#FF0000] hover:bg-[#D60000] text-white font-semibold text-xs py-3 rounded-full shadow-md transition-all tracking-[0.1em] uppercase active:scale-[0.99]"
          >
            Deletar
          </button>

          <button
            onClick={handleSalvar}
            className="w-full bg-[#6C38FF] hover:bg-[#5524E0] text-white font-medium text-sm py-3.5 rounded-full shadow-md transition-all tracking-wide active:scale-[0.99]"
          >
            Salvar
          </button>
          
        </div>

      </div>
    </div>
  );
}