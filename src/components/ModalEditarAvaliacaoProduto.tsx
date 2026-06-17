'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AvaliacaoProduto {
  id: number;
  autor: string;
  comentario: string;
  nota: number;
  nomeProduto?: string;
  produtoId?: number;
}

interface ModalEditarAvaliacaoProdutoProps {
  isOpen: boolean;
  onClose?: () => void;
  avaliacao: AvaliacaoProduto;
  onSave?: (avaliacaoAtualizada: AvaliacaoProduto) => void;
  onDelete?: () => void;
}

export default function ModalEditarAvaliacaoProduto({
  isOpen,
  onClose,
  avaliacao,
  onSave,
  onDelete,
}: ModalEditarAvaliacaoProdutoProps) {
  const [nota, setNota]             = useState(avaliacao.nota);
  const [hover, setHover]           = useState(0);
  const [comentario, setComentario] = useState(avaliacao.comentario);

  if (!isOpen) return null;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('meu_token');

      const response = await fetch(`http://localhost:3000/avaliacoes-produto/${avaliacao.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ nota, comentario }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar avaliação');

      onSave?.({ ...avaliacao, nota, comentario });
      alert('Avaliação atualizada com sucesso!');
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert('Falha na conexão com o servidor.');
    }
  };

  const handleDeletar = async () => {
    if (!confirm('Tem certeza que deseja deletar esta avaliação?')) return;
    try {
      const token = localStorage.getItem('meu_token');
      const response = await fetch(`http://localhost:3000/avaliacoes-produto/${avaliacao.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Erro ao deletar avaliação');
      onDelete?.();
      alert('Avaliação deletada com sucesso!');
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert('Não foi possível deletar a avaliação.');
    }
  };

  return (
    <form
      onSubmit={handleSalvar}
      className="w-[420px] bg-[#EEEEEE] rounded-[32px] p-8 relative flex flex-col gap-5 shadow-lg"
    >
      <div className="w-full flex justify-end">
        <button type="button" onClick={onClose} className="text-black hover:opacity-70 transition cursor-pointer">
          <X size={28} strokeWidth={2} />
        </button>
      </div>

      <h2 className="font-medium text-black text-xl -mt-2">
        Você está avaliando <span className="font-black">{avaliacao.nomeProduto ?? 'o produto'}</span>
      </h2>

      {/* Estrelas */}
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setNota(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <svg width="44" height="44" viewBox="0 0 24 24"
              fill={(hover || nota) >= i ? '#6A38F3' : 'none'}
              stroke="#6A38F3" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        ))}
      </div>

      {/* Comentário */}
      <textarea
        placeholder="Avaliação da loja"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        className="w-full px-5 py-4 rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm resize-none"
        rows={8}
      />

      {/* Botões */}
      <div className="w-full flex flex-col gap-2">
        <button type="button" onClick={handleDeletar}
          className="w-full h-11 border border-[#AE1125] text-[#AE1125] bg-[#EFEBEF] rounded-full font-medium hover:bg-red-50 transition text-sm cursor-pointer">
          Deletar avaliação
        </button>
        <button type="submit"
          className="w-full h-11 bg-[#6A3FF4] text-white rounded-full font-medium shadow-[0_4px_10px_rgba(106,63,244,0.35)] hover:bg-[#5733C9] transition text-sm cursor-pointer">
          Salvar
        </button>
      </div>
    </form>
  );
}
