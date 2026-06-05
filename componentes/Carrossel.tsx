import React from 'react';

interface Item {
  id: number;
  nome: string;
  subtitulo?: string; 
  imagem: string;
  status?: 'DISPONÍVEL' | 'INDISPONÍVEL';
  logoLoja?: string;
}

interface CarrosselProps {
  titulo: string;
  subtituloLink?: string; 
  itens: Item[];
  tipo?: 'produto' | 'loja';
}

export default function Carrossel({ titulo, subtituloLink, itens, tipo = 'produto' }: CarrosselProps) {
  return (
    <div className="my-8 px-4 max-w-7xl mx-auto">
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{titulo}</h2>
        {subtituloLink && (
          <span className="text-sm font-semibold text-purple-600 cursor-pointer hover:underline">
            {subtituloLink}
          </span>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 snap-x">
        {itens.map((item) => (
          <div 
            key={item.id} 
            className="snap-start shrink-0 transition-transform duration-200 hover:scale-[1.02]"
          >
            {tipo === 'produto' ? (
              /* CARD DE PRODUTO */
              <div className="bg-white rounded-3xl p-4 w-48 shadow-sm flex flex-col justify-between border border-gray-100 h-72">
                <div className="relative bg-gray-50 rounded-2xl p-2 flex items-center justify-center h-36">
                  {item.logoLoja && (
                    <img src={item.logoLoja} alt="Loja" className="absolute top-2 right-2 w-7 h-7 rounded-full object-contain" />
                  )}
                  <img src={item.imagem} alt={item.nome} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.nome}</h3>
                  <p className="text-gray-900 font-bold mt-1 text-sm">{item.subtitulo}</p>
                  <span className={`text-[10px] font-black block mt-1 ${
                    item.status === 'DISPONÍVEL' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ) : (
              /* CARD DE LOJA (CÍRCULO) */
              <div className="flex flex-col items-center w-28 text-center cursor-pointer">
                <div className="w-20 h-20 bg-white rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={item.imagem} alt={item.nome} className="max-w-full max-h-full object-contain" />
                </div>
                <span className="text-sm font-semibold text-gray-800 mt-2">{item.nome}</span>
                <span className="text-xs text-purple-500 font-medium">{item.subtitulo}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}