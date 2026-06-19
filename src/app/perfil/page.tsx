'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import Navbar from '@/components/Navbar';
import ModalEditarPerfil from '@/components/ModalEditarPerfil';
import ModalAlterarSenha from '@/components/ModalAlterarSenha';
import CardProduto from '@/components/CardProduto';
import ModalAdicionarLoja from '@/components/ModalAdicionarLoja';
import Link from 'next/link'; 
const MOCK_PRODUCTS = [
  { id: 1, nome: 'Bronzer',      preco: 254.99, estoque: 10 },
  { id: 2, nome: 'Blush',        preco: 199.99, estoque: 0  },
  { id: 3, nome: 'Perfume Rare', preco: 599.90, estoque: 5  },
  { id: 4, nome: 'Iluminador',   preco: 249.90, estoque: 3  },
  { id: 5, nome: 'Mini Blush',   preco: 99.99,  estoque: 0  },
];

const MOCK_AVALIACOES = [
  {
    id: 1,
    autor: 'Chico Bento',
    comentario: 'O cachorro mais lindo do mundo! 🐶❤️',
    nota: 4,
    avatar: 'chico_image.jpeg',
  },
];

interface Loja {
  id: number;
  nome: string;
  descricao?: string;
  endereco: string;
  logo_url?: string;
  banner_url?: string;
  usuario_id: number;
}

export default function PerfilPage() {
  const { user, isLoading } = useAuth();
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto]   = useState(false);
  const [modalLojaAberto, setModalLojaAberto]     = useState(false);
  const [lojas, setLojas]                         = useState<Loja[]>([]);
  const [loadingLojas, setLoadingLojas]           = useState(false);

  const nome     = user?.nome     ?? 'Selena Gomez';
  const username = user?.username ?? 'selenagomez';
  const email    = user?.email    ?? 'selenamariegomez@rare.com';
  const avatar   = 'chico_image.jpeg';

  async function fetchLojas() {
    if (!user) return;
    setLoadingLojas(true);
    try {
      const token = localStorage.getItem('meu_token');
      const response = await fetch('http://localhost:3000/lojas', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      // filtra só as lojas do usuário logado
      const minhasLojas = data.filter((l: Loja) => l.usuario_id === user.id);
      setLojas(minhasLojas);
    } catch (err) {
      console.error('Erro ao buscar lojas:', err);
    } finally {
      setLoadingLojas(false);
    }
  }

  useEffect(() => {
    if (user) fetchLojas();
  }, [user]);

  function handleLojaAdicionada() {
    setModalLojaAberto(false);
    fetchLojas(); // recarrega a lista após criar
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F7E8] flex items-center justify-center">
        <p className="text-[#6A38F3] font-black tracking-widest uppercase">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7E8] font-sans">

      <Navbar />

      <div className="w-full bg-black" style={{ height: '220px' }} />

      <div className="relative bg-[#F9F7E8] px-10 pb-6" style={{ paddingTop: '20px' }}>

        <div className="absolute" style={{ top: '-110px', left: '60px' }}>
          <div
            className="rounded-full overflow-hidden border-4 border-[#F9F7E8] shadow-md"
            style={{ width: '200px', height: '200px' }}
          >
            <img
              src={avatar}
              alt={nome}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {user && (
          <div className="flex justify-end">
            <button
              onClick={() => setModalPerfilAberto(true)}
              className="bg-[#6A38F3] hover:bg-[#5733C9] text-white font-bold px-10 py-4 rounded-full transition cursor-pointer text-base"
            >
              Editar Perfil
            </button>
          </div>
        )}

        <div style={{ marginTop: '100px' }}>
          <h1 className="font-black text-[#1a1a1a]" style={{ fontSize: '36px' }}>{nome}</h1>
          <p className="text-gray-500 mt-2 flex items-center gap-2" style={{ fontSize: '16px' }}>
            <span>@</span> {username}
          </p>
          <p className="text-gray-500 mt-1 flex items-center gap-2" style={{ fontSize: '16px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {email}
          </p>
        </div>
      </div>

      <div className="px-10 pb-16">

        <div className="mt-8">
          <h2 className="font-black text-[#1a1a1a] mb-4" style={{ fontSize: '24px' }}>Produtos</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {MOCK_PRODUCTS.map((product) => (
              <CardProduto key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* ── Lojas ── */}
        <div className="mt-10">
  <div className="flex items-center justify-between mb-4">
    <h2 className="font-black text-[#1a1a1a]" style={{ fontSize: '24px' }}>Lojas</h2>
    <button
      onClick={() => setModalLojaAberto(true)}
      className="w-10 h-10 rounded-full bg-[#6A38F3] text-white flex items-center justify-center hover:bg-[#5733C9] transition cursor-pointer"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  </div>

  {loadingLojas ? (
    <p className="text-gray-400 text-sm">Carregando lojas...</p>
  ) : lojas.length === 0 ? (
    <p className="text-gray-400 text-sm">Nenhuma loja cadastrada ainda.</p>
  ) : (
    <div className="flex flex-col gap-3">
      {lojas.map((loja) => (
        <Link href={`/lojas/${loja.id}`} key={loja.id}>  {/* ← Link aqui */}
          <div
            className="bg-white flex items-center justify-between shadow-sm hover:shadow-md transition cursor-pointer"
            style={{ borderRadius: '16px', padding: '14px 20px', maxWidth: '460px' }}
          >
            <div>
              <p className="font-black text-[#1a1a1a]" style={{ fontSize: '20px' }}>{loja.nome}</p>
              <p className="font-bold text-[#6A38F3]" style={{ fontSize: '15px' }}>{loja.descricao}</p>
            </div>
            <div
              className="rounded-full bg-[#f5eaea] flex flex-col items-center justify-center flex-shrink-0"
              style={{ width: '80px', height: '80px' }}
            >
              <p className="text-center font-semibold text-[#8B1A4A]" style={{ fontSize: '10px', lineHeight: 1.3 }}>
                {loja.nome}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>

        {/* ── Avaliações ── */}
        <div className="mt-10">
          <h2 className="font-black text-[#1a1a1a] mb-4" style={{ fontSize: '24px' }}>Avaliações</h2>
          <div className="flex flex-col gap-3">
            {MOCK_AVALIACOES.map((av) => (
              <div
                key={av.id}
                className="bg-white shadow-sm"
                style={{ borderRadius: '16px', padding: '14px 20px', maxWidth: '700px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                      <img src={av.avatar} alt={av.autor} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1a1a]" style={{ fontSize: '15px' }}>{av.autor}</p>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>{av.comentario}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < av.nota ? '#FACC15' : 'none'} stroke="#FACC15" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button className="font-bold text-[#6A38F3] hover:opacity-70 transition cursor-pointer" style={{ fontSize: '13px' }}>
                    ver mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalPerfilAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <ModalEditarPerfil isOpen={modalPerfilAberto} onClose={() => setModalPerfilAberto(false)} />
        </div>
      )}

      {modalSenhaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <ModalAlterarSenha isOpen={modalSenhaAberto} onClose={() => setModalSenhaAberto(false)} />
        </div>
      )}

      <ModalAdicionarLoja
        isOpen={modalLojaAberto}
        onClose={handleLojaAdicionada}
      />

    </div>
  );
}