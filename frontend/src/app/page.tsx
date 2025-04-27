'use client';

import Link from 'next/link';
import { AlarmClock, Pill } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      
      {/* Logo */}
      <div className="flex items-center mb-10 space-x-2">
        <Pill className="w-10 h-10 text-blue-500" />
        <AlarmClock className="w-10 h-10 text-blue-500" />
      </div>

      {/* Menu */}
      <h1 className="text-3xl font-bold text-gray-700 mb-8">Gerenciador de Lembretes</h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link href="/cadastro">
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl transition">
            Cadastrar Lembrete
          </button>
        </Link>

        <Link href="/consulta">
          <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-2xl transition">
            Consultar Lembretes
          </button>
        </Link>
      </div>
    </div>
  );
}
