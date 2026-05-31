'use client';

import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';

interface ModalEditarPerfilProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function ModalEditarPerfil({ isOpen, onClose }: ModalEditarPerfilProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setAvatarUrl(localUrl);
    }
  };

  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('username', username);
      formData.append('email', email);
      if (selectedFile) {
        formData.append('foto', selectedFile);
      }

      const response = await fetch('http://localhost:3001/api/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      alert('Perfil updated com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Falha na conexão com o servidor.');
    }
  };

  const handleDeletarConta = async () => {
    if (!confirm('Tem certeza de que deseja deletar permanentemente a sua conta?')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/profile/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar conta');
      }

      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
      alert('Não foi possível deletar a conta.');
    }
  };

  return (
    <form onSubmit={handleSalvarPerfil} className="w-[400px] h-[540px] bg-[#EEEEEE] rounded-[32px] p-8 relative flex flex-col items-center justify-between shadow-lg">
      <div className="w-full flex justify-end items-center">
        <button type="button" onClick={onClose} className="text-black hover:opacity-70 transition cursor-pointer">
          <X size={28} strokeWidth={2} />
        </button>
      </div>

      <div className="w-full flex flex-col items-center flex-1 justify-center gap-5 -mt-4">
        <div className="relative w-28 h-28 mb-2">
          <img 
            src={avatarUrl} 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full border border-gray-200"
          />
          
          <button 
            onClick={handleCameraClick}
            type="button"
            className="absolute bottom-0 right-1 bg-white p-2 rounded-full shadow-md text-black hover:bg-gray-100 transition border border-gray-100 cursor-pointer"
          >
            <Camera size={16} strokeWidth={2.5} />
          </button>

          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-5 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none shadow-sm text-sm"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 mt-4">
        <button type="button" onClick={handleDeletarConta} className="w-full h-11 border border-[#AE1125] text-[#AE1125] bg-[#EFEBEF] rounded-full font-medium hover:bg-red-50 transition text-sm cursor-pointer">
          Deletar conta
        </button>
        
        <button type="button" className="w-full h-11 border border-[#6A3FF4] text-[#6A3FF4] bg-[#EFEBEF] rounded-full font-medium hover:bg-purple-50 transition text-sm cursor-pointer">
          Alterar senha
        </button>
        
        <button type="submit" className="w-full h-11 bg-[#6A3FF4] text-white rounded-full font-medium shadow-[0_4px_10px_rgba(106,63,244,0.35)] hover:bg-[#5733C9] transition text-sm cursor-pointer">
          Salvar
        </button>
      </div>
    </form>
  );
}