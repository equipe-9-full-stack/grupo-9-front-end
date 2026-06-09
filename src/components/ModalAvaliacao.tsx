'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';

interface ModalAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  nomeLoja: string;
}

export default function ModalAvaliacao({ isOpen, onClose, nomeLoja }: ModalAvaliacaoProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState('');

  if (!isOpen) return null;

  const handleAvaliar = () => {
    console.log({ rating, comentario });
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

        <button
          onClick={handleAvaliar}
          className="w-full max-w-[480px] bg-[#6C38FF] hover:bg-[#5524E0] text-white font-medium text-sm py-3.5 rounded-full shadow-md transition-all tracking-wide active:scale-[0.99]"
        >
          Avaliar
        </button>

      </div>
    </div>
  );
}