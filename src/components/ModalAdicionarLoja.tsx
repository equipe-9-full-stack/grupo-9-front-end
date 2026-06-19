'use client';

import { X, ChevronDown, FileUp } from 'lucide-react';

interface ModalAdicionarLojaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAdicionarLoja({
  isOpen,
  onClose,
}: ModalAdicionarLojaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-[600px] bg-[#EFEFEF] rounded-[24px] p-6 shadow-sm mx-4">

        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-black hover:opacity-70 transition-opacity"
        >
          <X size={32} />
        </button>

        <h1 className="text-center text-[28px] font-semibold mb-5">
          Adicionar loja
        </h1>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Nome da loja"
            className="
              w-full
              h-12
              rounded-full
              px-8
              bg-white
              outline-none
              text-zinc-700
            "
          />

          <div className="relative">
            <select
              defaultValue=""
              className="
                w-full
                h-16
                rounded-full
                px-8
                bg-white
                appearance-none
                outline-none
                text-zinc-700
              "
            >
              <option value="" disabled>
                Categoria
              </option>
              <option>Beleza</option>
              <option>Tecnologia</option>
              <option>Moda</option>
              <option>Games</option>
            </select>
            <ChevronDown
              size={24}
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500"
            />
          </div>

          {/* Upload foto de perfil */}
          <label
            className="
              flex flex-col items-center justify-center
              gap-3
              h-20
              rounded-[18px]
              border-2 border-dashed border-[#6C38FF]
              cursor-pointer
              text-zinc-700
              text-sm
            "
          >
            <span className="bg-[#6C38FF] p-2 rounded-md">
              <FileUp size={20} className="text-white" />
            </span>
            Anexe a foto de perfil de sua loja
            <input type="file" className="hidden" />
          </label>

          {/* Upload logo */}
          <label
            className="
              flex flex-col items-center justify-center
              gap-3
              h-32
              rounded-[18px]
              border-2 border-dashed border-[#6C38FF]
              cursor-pointer
              text-zinc-700
              text-sm
            "
          >
            <span className="bg-[#6C38FF] p-2 rounded-md">
              <FileUp size={20} className="text-white" />
            </span>
            Anexe a logo em SVG de sua loja
            <input type="file" className="hidden" accept=".svg" />
          </label>

          {/* Upload banner */}
          <label
            className="
              flex flex-col items-center justify-center
              gap-1
              h-32
              rounded-[18px]
              border-2 border-dashed border-[#6C38FF]
              cursor-pointer
              text-zinc-700
              text-sm
            "
          >
            <span className="bg-[#6C38FF] p-2 rounded-md">
              <FileUp size={20} className="text-white" />
            </span>
            Anexe o banner de sua loja
            <input type="file" className="hidden" />
          </label>

          <div className="flex justify-center pt-4">
            <button
              className="
                bg-[#6C38FF]
                hover:bg-[#5524E0]
                text-white
                px-24
                py-1
                rounded-full
                shadow-md
                transition-all
              "
            >
              Adicionar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}