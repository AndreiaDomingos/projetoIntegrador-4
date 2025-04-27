'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Lembrete {
  id: number;
  nome: string;
  idade: number;
  medicamento: string;
  dose: string;
  dias: number;
  horario: string;
}

export default function ConsultaPage() {
  const router = useRouter();
  const [nomeBusca, setNomeBusca] = useState('');
  const [lembrete, setLembrete] = useState<Lembrete | null>(null);

  async function buscarLembrete() {
    if (!nomeBusca) return;

    try {
      const response = await fetch('https://projetointegrador-4.onrender.com/lembrete', { method: 'GET' });
      const data: Lembrete[] = await response.json();

      const encontrado = data.find(l => l.nome.toLowerCase().includes(nomeBusca.toLowerCase()));
      setLembrete(encontrado || null);
    } catch (error) {
      console.error('Erro ao buscar lembrete:', error);
      setLembrete(null);
    }
  }

  useEffect(() => {
    if (nomeBusca === '') {
      setLembrete(null);
    }
  }, [nomeBusca]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Consultar Lembrete</h1>

      <div className="w-full max-w-md flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Digite o nome"
          value={nomeBusca}
          onChange={e => setNomeBusca(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={buscarLembrete}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-3 rounded-2xl transition"
        >
          Buscar
        </button>
      </div>

      {lembrete ? (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-2 mb-4">
          <h2 className="text-xl font-bold text-blue-500">{lembrete.nome}</h2>
          <p><strong>Idade:</strong> {lembrete.idade}</p>
          <p><strong>Medicamento:</strong> {lembrete.medicamento}</p>
          <p><strong>Dose:</strong> {lembrete.dose}</p>
          <p><strong>Dias:</strong> {lembrete.dias}</p>
          <p><strong>Horário:</strong> {lembrete.horario}</p>
        </div>
      ) : (
        nomeBusca && (
          <p className="text-gray-600 mt-4">Nenhum lembrete encontrado.</p>
        )
      )}

      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-2xl transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}
