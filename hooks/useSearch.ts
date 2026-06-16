import { useState, useMemo } from 'react';

interface Produto {
  id: number;
  nome: string;
  subtitulo: string;
  imagem: string;
  status: string;
  logoLoja: string;
}

interface Loja {
  id: number;
  nome: string;
  subtitulo: string;
  imagem: string;
}

export function useSearch(produtos: Produto[], lojas: Loja[]) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return {
      produtos: produtos.filter((p) => p.nome.toLowerCase().includes(q)),
      lojas: lojas.filter((l) => l.nome.toLowerCase().includes(q)),
    };
  }, [query, produtos, lojas]);

  const clearSearch = () => setQuery('');

  return { query, setQuery, results, clearSearch };
}