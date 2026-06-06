'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Procurar por...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(query);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="flex items-center bg-white rounded-full px-6"
        style={{
          height: '56px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
        }}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
          style={{
            fontSize: '16px',
            color: '#1a1a1a',
          }}
        />

        <button
          type="submit"
          className="flex-shrink-0 ml-3 transition-opacity hover:opacity-70 cursor-pointer"
          aria-label="Buscar"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        input::placeholder {
          color: #a78bfa;
        }
      `}</style>
    </form>
  );
}
