'use client';

import { useState } from 'react';
import { 
  Search, 
  User, 
  LogOut, 
  ShoppingBag, 
  PlusCircle, 
  Sparkles, 
  Shirt, 
  Laptop, 
  Gamepad2, 
  Baby, 
  Home as HomeIcon 
} from "lucide-react";

import ModalEditarPerfil from '@/componentes/ModalEditarPerfil';
import ModalAlterarSenha from '@/componentes/ModalAlterarSenha';
import AddProductForm from "@/componentes/AddProduto";

const categories = [
  { name: "Mercado", icon: ShoppingBag },
  { name: "Farmácia", icon: PlusCircle },
  { name: "Beleza", icon: Sparkles },
  { name: "Moda", icon: Shirt },
  { name: "Eletrônicos", icon: Laptop },
  { name: "Jogos", icon: Gamepad2 },
  { name: "Brinquedos", icon: Baby },
  { name: "Casa", icon: HomeIcon },
];

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);

  const [products, setProducts] = useState([
    { id: 1, name: "Brownie Chocolate", badge: "CJR", color: "bg-purple-950", img: "🟫" },
    { id: 2, name: "Brownie Tradicional", badge: "CJR", color: "bg-blue-600", img: "🟫" },
    { id: 3, name: "Cookies", badge: "Bake", color: "bg-amber-600", img: "🍪" },
    { id: 4, name: "Bananas", badge: "Horti", color: "bg-emerald-600", img: "🍌" },
    { id: 5, name: "Limões", badge: "Horti", color: "bg-emerald-700", img: "🍋" },
  ]);

  const handleAddProduct = (newProduct: { name: string; badge: string; badgeColor: string }) => {
    const product = {
      id: Date.now(),
      name: newProduct.name,
      badge: newProduct.badge,
      color: newProduct.badgeColor,
      img: "📦"
    };
    setProducts((prev) => [...prev, product]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF2] text-zinc-800 font-sans antialiased">

      <section className="bg-black text-white px-6 md:px-16 pt-6 pb-16 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        <header className="flex justify-between items-center max-w-7xl w-full mx-auto relative z-10">
          <div className="flex items-center gap-1 text-2xl font-black tracking-tighter">
            <span>STOCK.</span>
            <span className="bg-[#D1FF25] text-black px-1.5 py-0.5 rounded-sm text-xl flex items-center justify-center">IO</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setModalPerfilAberto(true)} className="hover:text-[#D1FF25] transition-colors">
              <User size={22} />
            </button>
            <button onClick={() => setModalSenhaAberto(true)} className="text-xs uppercase font-bold tracking-wider hover:text-zinc-300 transition-colors">
              Alterar Senha
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="hover:text-red-400 transition-colors">
              <LogOut size={22} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center pt-10 relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-md">
              Do <span className="font-black">CAOS</span> à organização, em alguns cliques
            </h1>
          </div>
          
          <div className="hidden md:flex justify-end items-end h-full relative min-h-[240px]">
            <div className="relative bottom-0 right-10 flex items-end translate-y-4">
              <div className="w-40 h-40 bg-[#D1FF25] rounded-full relative flex items-center justify-center border-4 border-black">
                <div className="absolute -top-3 w-44 h-16 bg-[#5D2CFF] rounded-t-full" />
                <div className="flex flex-col items-center space-y-2 relative z-10 pt-4">
                  <div className="flex gap-6">
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                  </div>
                  <div className="w-6 h-3 border-b-4 border-black rounded-b-full" />
                </div>
              </div>
              <div className="w-24 h-24 bg-[#5D2CFF] border-2 border-white rounded-md shadow-lg flex items-center justify-center text-white font-bold ml-[-20px] mb-2 transform rotate-3">📦</div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center -mt-7 mb-10 relative z-20 px-6">
        <div className="relative w-full max-w-2xl shadow-sm">
          <input 
            type="text" 
            placeholder="Procurar por..." 
            className="w-full bg-white pl-5 pr-12 py-3.5 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#5D2CFF] text-sm text-zinc-600 placeholder-zinc-300" 
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 w-5 h-5" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-16">

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5 tracking-tight text-zinc-900">Categoria</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div key={index} className="flex flex-col items-center justify-center bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer aspect-square group">
                  <div className="text-[#5D2CFF] group-hover:scale-110 transition-transform mb-2">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-500 text-center tracking-tight">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-baseline mb-5">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">Produtos</h2>
              <span className="text-xs text-[#5D2CFF] font-medium underline cursor-pointer">melhores avaliados</span>
            </div>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#5D2CFF] text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-black transition-colors"
            >
              {showAddForm ? "Fechar" : "+ Produto"}
            </button>
          </div>

          {showAddForm && (
            <div className="mb-8 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-md">
              <AddProductForm onAddProduct={handleAddProduct} />
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 p-3 flex flex-col justify-between aspect-[4/5] relative group hover:shadow-md transition-all">
                <div className={`absolute top-3 right-3 w-10 h-10 ${product.color} rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm z-10`}>
                  {product.badge}
                </div>
                <div className="w-full h-32 bg-zinc-50 rounded-xl flex items-center justify-center text-4xl group-hover:scale-105 transition-transform relative z-0">
                  {product.img}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-bold text-zinc-700 truncate">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {modalPerfilAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <ModalEditarPerfil 
            isOpen={modalPerfilAberto} 
            onClose={() => setModalPerfilAberto(false)} 
          />
        </div>
      )}

      {modalSenhaAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <ModalAlterarSenha 
            isOpen={modalSenhaAberto} 
            onClose={() => setModalSenhaAberto(false)} 
          />
        </div>
      )}
    </div>
  );
}