'use client';

import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';

interface Produto {
  id: number;
  name: string;
  price: string;
  status: 'DISPONÍVEL' | 'INDISPONÍVEL';
  img: string;
  categoria?: string;
  descricao?: string;
  estoque?: number;
}

interface ModalEditarProdutoProps {
  isOpen: boolean;
  onClose?: () => void;
  produto: Produto;
  onSave?: (produtoAtualizado: Produto) => void;
  onDelete?: () => void;
}

const CATEGORIAS = ['Celulares', 'Notebooks', 'TVs', 'Acessórios', 'Outros'];

export default function ModalEditarProduto({ isOpen, onClose, produto, onSave, onDelete }: ModalEditarProdutoProps) {
  const [imgUrl, setImgUrl]       = useState<string>(produto.img ?? '');
  const [nome, setNome]           = useState(produto.name ?? '');
  const [categoria, setCategoria] = useState(produto.categoria ?? '');
  const [descricao, setDescricao] = useState(produto.descricao ?? '');
  const [preco, setPreco]         = useState(produto.price ?? '');
  const [estoque, setEstoque]     = useState(produto.estoque ?? 0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImgUrl(URL.createObjectURL(file));
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('meu_token');

      const response = await fetch(`http://localhost:3000/produtos/${produto.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: nome, price: preco, categoria, descricao, estoque, status: estoque > 0 ? 'DISPONÍVEL' : 'INDISPONÍVEL' }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar produto');

      onSave?.({ ...produto, name: nome, price: preco, categoria, descricao, estoque, img: imgUrl, status: estoque > 0 ? 'DISPONÍVEL' : 'INDISPONÍVEL' });
      alert('Produto atualizado com sucesso!');
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert('Falha na conexão com o servidor.');
    }
  };

  const handleDeletar = async () => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    try {
      const token = localStorage.getItem('meu_token');
      const response = await fetch(`http://localhost:3000/produtos/${produto.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Erro ao deletar produto');
      onDelete?.();
      alert('Produto deletado com sucesso!');
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      alert('Não foi possível deletar o produto.');
    }
  };

  return (
    <form
      onSubmit={handleSalvar}
      className="w-[420px] bg-[#EEEEEE] rounded-[32px] p-8 relative flex flex-col items-center gap-4 shadow-lg overflow-y-auto"
      style={{ maxHeight: '90vh' }}
    >
      <div className="w-full flex justify-end">
        <button type="button" onClick={onClose} className="text-black hover:opacity-70 transition cursor-pointer">
          <X size={28} strokeWidth={2} />
        </button>
      </div>

      <h2 className="font-black text-black text-2xl -mt-2">Editar Produto</h2>

      {/* Upload principal */}
      <div
        className="w-full rounded-2xl border-2 border-dashed border-[#6A38F3] flex flex-col items-center justify-center gap-2 cursor-pointer py-5"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="relative">
          {imgUrl
            ? <img src={imgUrl} alt="produto" className="w-16 h-16 rounded-full object-cover" />
            : <Camera size={36} className="text-[#6A38F3]" />
          }
          <span className="absolute -bottom-1 -right-1 bg-[#6A38F3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">+</span>
        </div>
        <p className="text-sm font-medium text-black">Anexe as fotos do seu produto</p>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>

      {/* 3 slots extras */}
      <div className="w-full grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-dashed border-[#6A38F3] flex items-center justify-center cursor-pointer h-20" onClick={() => fileInputRef.current?.click()}>
            <div className="relative">
              <Camera size={24} className="text-[#6A38F3]" />
              <span className="absolute -bottom-1 -right-1 bg-[#6A38F3] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">+</span>
            </div>
          </div>
        ))}
      </div>

      {/* Campos */}
      <div className="w-full flex flex-col gap-3">
        <input type="text" placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)}
          className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm" />

        <div className="relative">
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 focus:outline-none shadow-sm text-sm appearance-none cursor-pointer">
            <option value="" disabled>Subcategoria</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-lg">⌄</span>
        </div>

        <textarea placeholder="Descrição do produto" value={descricao} onChange={(e) => setDescricao(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm resize-none" rows={3} />

        <input type="text" placeholder="Preço do produto" value={preco} onChange={(e) => setPreco(e.target.value)}
          className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm" />
      </div>

      {/* Controle de estoque */}
      <div className="flex items-center gap-6">
        <button type="button" onClick={() => setEstoque((v) => Math.max(0, v - 1))}
          className="w-10 h-10 rounded-full border-2 border-[#6A38F3] text-[#6A38F3] text-xl flex items-center justify-center hover:opacity-70 transition cursor-pointer">−</button>
        <span className="font-black text-[#6A38F3] text-3xl min-w-[32px] text-center">{estoque}</span>
        <button type="button" onClick={() => setEstoque((v) => v + 1)}
          className="w-10 h-10 rounded-full border-2 border-[#6A38F3] text-[#6A38F3] text-xl flex items-center justify-center hover:opacity-70 transition cursor-pointer">+</button>
      </div>

      {/* Botões */}
      <div className="w-full flex flex-col gap-2">
        <button type="button" onClick={handleDeletar}
          className="w-full h-11 border border-[#AE1125] text-[#AE1125] bg-[#EFEBEF] rounded-full font-medium hover:bg-red-50 transition text-sm cursor-pointer">
          Deletar produto
        </button>
        <button type="submit"
          className="w-full h-11 bg-[#6A3FF4] text-white rounded-full font-medium shadow-[0_4px_10px_rgba(106,63,244,0.35)] hover:bg-[#5733C9] transition text-sm cursor-pointer">
          Salvar
        </button>
      </div>
    </form>
  );
}
