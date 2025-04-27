'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react'; // Ícone da lixeira

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
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [idParaDeletar, setIdParaDeletar] = useState<number | null>(null); // <- ID para deletar
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);     // <- Mostrar modal

  async function buscarLembretes() {
    if (!nomeBusca) return;

    try {
      const response = await fetch('https://projetointegrador-4.onrender.com/lembrete', { method: 'GET' });
      const data: Lembrete[] = await response.json();

      const encontrados = data.filter(l => l.nome.toLowerCase().includes(nomeBusca.toLowerCase()));
      setLembretes(encontrados);
    } catch (error) {
      console.error('Erro ao buscar lembretes:', error);
      setLembretes([]);
    }
  }

  function pedirConfirmacao(id: number) {
    setIdParaDeletar(id);
    setMostrarConfirmacao(true);
  }

  async function deletarConfirmado() {
    if (!idParaDeletar) return;

    try {
      await fetch(`https://projetointegrador-4.onrender.com/lembrete/${idParaDeletar}`, {
        method: 'DELETE',
      });

      setLembretes(prev => prev.filter(l => l.id !== idParaDeletar));
      setIdParaDeletar(null);
      setMostrarConfirmacao(false);
    } catch (error) {
      console.error('Erro ao deletar lembrete:', error);
    }
  }

  useEffect(() => {
    if (nomeBusca === '') {
      setLembretes([]);
    }
  }, [nomeBusca]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Consultar Lembrete</h1>

      <div className="w-full max-w-md flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Digite o nome"
          value={nomeBusca}
          onChange={e => setNomeBusca(e.target.value)}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={buscarLembretes}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-3 rounded-2xl transition"
        >
          Buscar
        </button>
      </div>

      {lembretes.length > 0 ? (
        <div className="space-y-4 w-full max-w-md">
          {lembretes.map((lembrete) => (
            <div key={lembrete.id} className="bg-white p-6 rounded-2xl shadow-md relative text-gray-900">
              {/* Botão Deletar */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={() => pedirConfirmacao(lembrete.id)}
                  className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition"
                  title="Deletar"
                >
                  <Trash2 size={20} color="white" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-blue-500">{lembrete.nome}</h2>
              <p><strong>Idade:</strong> {lembrete.idade}</p>
              <p><strong>Medicamento:</strong> {lembrete.medicamento}</p>
              <p><strong>Dose:</strong> {lembrete.dose}</p>
              <p><strong>Dias:</strong> {lembrete.dias}</p>
              <p><strong>Horário:</strong> {lembrete.horario}</p>
            </div>
          ))}
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

      {/* Modal de Confirmação */}
      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmação</h2>
            <p className="text-gray-700 mb-6">Deseja realmente excluir este lembrete?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={deletarConfirmado}
                className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-2xl transition"
              >
                Sim
              </button>
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-2xl transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
