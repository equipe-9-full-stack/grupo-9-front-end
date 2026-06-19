import React, { ReactNode } from 'react';

interface Item {
  id: number;
  nome: string;
  subtitulo?: string;
  imagem: string;
  status?: 'DISPONÍVEL' | 'INDISPONÍVEL';
  logoLoja?: string;
}

interface CarrosselProps {
  titulo?: string;
  subtituloLink?: string;
  itens?: Item[];
  tipo?: 'produto' | 'loja';
  children?: ReactNode;
}

export default function Carrossel({
  titulo,
  subtituloLink,
  itens,
  tipo = 'produto',
  children,
}: CarrosselProps) {

  if (children) {
    return (
      <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
        {children}
      </div>
    );
  }

  return (
    <div className="my-8 px-4 max-w-7xl mx-auto">
      {/* seu código atual */}
    </div>
  );
}