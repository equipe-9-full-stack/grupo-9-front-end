'use client';

import { useState } from "react";

interface AddProdutoProps {
  onAddProduct: (product: { name: string; badge: string; badgeColor: string }) => void;
}

export default function AddProduto({ onAddProduct }: AddProdutoProps) {
  const [name, setName] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeColor, setBadgeColor] = useState("bg-purple-900");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !badge) return;

    onAddProduct({ name, badge, badgeColor });

    setName("");
    setBadge("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
          Nome do Produto
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Cookie de Baunilha"
          className="w-full bg-[#FDFBF2] px-4 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D2CFF]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
            Sigla (Badge)
          </label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value.toUpperCase())}
            maxLength={5}
            placeholder="Ex: CJR"
            className="w-full bg-[#FDFBF2] px-4 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D2CFF]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wider">
            Cor da Badge
          </label>
          <select
            value={badgeColor}
            onChange={(e) => setBadgeColor(e.target.value)}
            className="w-full bg-[#FDFBF2] px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D2CFF] h-[38px]"
          >
            <option value="bg-purple-900">Roxo Escuro</option>
            <option value="bg-blue-600">Azul</option>
            <option value="bg-amber-600">Laranja/Cookies</option>
            <option value="bg-emerald-600">Verde Hortifruti</option>
            <option value="bg-black">Preto</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-zinc-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-[#5D2CFF] transition-colors uppercase tracking-wider mt-2"
      >
        Confirmar Cadastro
      </button>
    </form>
  );
}