'use client';

import { useState } from 'react';
import { X, ChevronDown, FileUp } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';

interface ModalAdicionarLojaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAdicionarLoja({ isOpen, onClose }: ModalAdicionarLojaProps) {
  const { user } = useAuth();

  const [nome, setNome]           = useState('');
  const [endereco, setEndereco]   = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading]     = useState(false);
  const [erro, setErro]           = useState('');

  if (!isOpen) return null;

  async function handleAdicionar() {
    console.log('Todas as chaves do localStorage:', Object.keys(localStorage));
    if (!nome || !endereco) {
      setErro('Nome e endereço são obrigatórios.');
      return;
    }

    setErro('');
    setLoading(true);

    const token = localStorage.getItem('meu_token');

    try {
      const response = await fetch('http://localhost:3000/lojas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          endereco,
          descricao,
          usuario_id: user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        throw new Error('Erro ao criar loja');
      }

      onClose();
    } catch (err) {
      console.error(err);
      setErro('Erro ao criar loja. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-[600px] bg-[#EFEFEF] rounded-[24px] shadow-sm mx-4 flex flex-col max-h-[90vh]">

        {/* ── Header fixo ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-3 flex-shrink-0">
          <div className="w-8" />
          <h1 className="text-[28px] font-semibold">Adicionar loja</h1>
          <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity">
            <X size={32} />
          </button>
        </div>

        {/* ── Conteúdo com scroll ── */}
        <div className="overflow-y-auto px-6 pb-6 space-y-3">

          <input
            type="text"
            placeholder="Nome da loja"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full h-12 rounded-full px-8 bg-white outline-none text-zinc-700"
          />

          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full h-12 rounded-full px-8 bg-white outline-none text-zinc-700"
          />

          <input
            type="text"
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full h-12 rounded-full px-8 bg-white outline-none text-zinc-700"
          />

          <div className="relative">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full h-16 rounded-full px-8 bg-white appearance-none outline-none text-zinc-700"
            >
              <option value="" disabled>Categoria</option>
              <option>Beleza</option>
              <option>Tecnologia</option>
              <option>Moda</option>
              <option>Games</option>
            </select>
            <ChevronDown size={24} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
          </div>

          <label className="flex flex-col items-center justify-center gap-3 h-20 rounded-[18px] border-2 border-dashed border-[#6C38FF] cursor-pointer text-zinc-700 text-sm">
            <span className="bg-[#6C38FF] p-2 rounded-md"><FileUp size={20} className="text-white" /></span>
            Anexe a foto de perfil de sua loja
            <input type="file" className="hidden" />
          </label>

          <label className="flex flex-col items-center justify-center gap-3 h-32 rounded-[18px] border-2 border-dashed border-[#6C38FF] cursor-pointer text-zinc-700 text-sm">
            <span className="bg-[#6C38FF] p-2 rounded-md"><FileUp size={20} className="text-white" /></span>
            Anexe a logo em SVG de sua loja
            <input type="file" className="hidden" accept=".svg" />
          </label>

          <label className="flex flex-col items-center justify-center gap-1 h-32 rounded-[18px] border-2 border-dashed border-[#6C38FF] cursor-pointer text-zinc-700 text-sm">
            <span className="bg-[#6C38FF] p-2 rounded-md"><FileUp size={20} className="text-white" /></span>
            Anexe o banner de sua loja
            <input type="file" className="hidden" />
          </label>

          {erro && (
            <p className="text-red-500 text-sm text-center">{erro}</p>
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={handleAdicionar}
              disabled={loading}
              className="bg-[#6C38FF] hover:bg-[#5524E0] disabled:opacity-60 text-white px-24 py-1 rounded-full shadow-md transition-all"
            >
              {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}