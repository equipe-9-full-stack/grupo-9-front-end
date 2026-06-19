'use client';

import { useRef } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onClear,
  isLoading = false,
  placeholder = 'Procurar por...',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full relative">
      <div
        className="flex items-center bg-white rounded-full px-6"
        style={{ height: '56px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize: '16px', color: '#1a1a1a' }}
        />

        {/* spinner ou ícone de limpar */}
        {isLoading ? (
          <div
            className="ml-3 w-5 h-5 rounded-full border-2 border-purple-300 border-t-purple-600 animate-spin flex-shrink-0"
          />
        ) : value ? (
          <button
            type="button"
            onClick={() => { onClear(); inputRef.current?.focus(); }}
            className="ml-3 text-purple-400 hover:text-purple-600 transition-colors flex-shrink-0"
            aria-label="Limpar busca"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="flex-shrink-0 ml-3">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        )}
      </div>

      <style jsx>{`
        input::placeholder { color: #a78bfa; }
      `}</style>
    </div>
  );
}
