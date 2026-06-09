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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#EDEDED] rounded-[24px] p-10 shadow-lg mx-4">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-black hover:opacity-75 transition-opacity">
          <X size={28} />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <h2 className="text-[26px] text-zinc-800 font-light tracking-wide mb-8">
            Você está avaliando <span className="font-semibold text-black">{nomeLoja}</span>
          </h2>

          {/* Bloco das Estrelas */}
          <div className="flex gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={56}
                  className={`transition-colors stroke-[1px] ${
                    star <= (hover || rating) 
                      ? 'fill-[#5D2CFF] stroke-[#5D2CFF]' 
                      : 'fill-transparent stroke-[#A39CB5]'
                  }`}
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}