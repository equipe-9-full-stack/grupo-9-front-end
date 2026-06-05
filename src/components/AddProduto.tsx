'use client';

import React from 'react';

interface AddProdutoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProduto({ isOpen, onClose }: AddProdutoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Card do Modal */}
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Botão de fechar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Novo Produto</h2>

        {/* Formulário */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Produto</label>
            <input 
              type="text" 
              placeholder="Ex: Brownie de Pote" 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Preço</label>
            <input 
              type="text" 
              placeholder="R$ 0,00" 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">URL da Imagem</label>
            <input 
              type="text" 
              placeholder="https://..." 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-md shadow-purple-200"
            >
              Salvar Produto
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}