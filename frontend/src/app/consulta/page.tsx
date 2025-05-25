'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react'; // Ícone da lixeira
import CustomButton from '../components/CustomButton';
import CustomTextBox from '../components/CustomTextBox';

interface Lembrete {
  id: number;
  nome: string;
  idade: number;
  medicamento: string;
  doseValor: number;
  doseUnidade: string;
  usoContinuo: boolean;
  dias: number | null;
  horario: string | null;
  intervalo: number;
  usoInicio: string | null;
  notificacao: boolean;
  telefone: string | null;
  email: string | null;
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
      const response = await fetch('http://localhost:3000/lembrete', { method: 'GET' });
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

    try {{/*https://projetointegrador-4.onrender.com/lembrete/${idParaDeletar}*/}
      await fetch(`http://localhost:3000/lembrete/${idParaDeletar}`, {
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
        <CustomTextBox name="nomeBusca" placeholder="Digite o nome" value={nomeBusca} onChange={e => setNomeBusca(e.target.value)} required />

        <CustomButton onClick={buscarLembretes} variant="third">
          Buscar
        </CustomButton>
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
              </div>              <h2 className="text-xl font-bold text-blue-500">{lembrete.nome}</h2>
              <p><strong>Idade:</strong> {lembrete.idade} anos</p>
              <p><strong>Medicamento:</strong> {lembrete.medicamento}</p>
              <p><strong>Dose:</strong> {lembrete.doseValor} {lembrete.doseUnidade}</p>
                {lembrete.usoContinuo ? (
                <p><strong>Uso:</strong> Contínuo</p>
              ) : (
                <p><strong>Duração:</strong> {lembrete.dias} dias</p>
              )}
              
              {lembrete.intervalo > 0 && (
                <p><strong>Intervalo:</strong> A cada {lembrete.intervalo} horas</p>
              )}
              
              {lembrete.horario && (
                <p><strong>Horário:</strong> {lembrete.horario}</p>
              )}
              
              {lembrete.usoInicio && (
                <p><strong>Início:</strong> {new Date(lembrete.usoInicio).toLocaleDateString('pt-BR')}</p>
              )}
              
              {lembrete.notificacao && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm"><strong>Notificações:</strong> Ativadas</p>
                  {lembrete.telefone && <p className="text-sm">📱 {lembrete.telefone}</p>}
                  {lembrete.email && <p className="text-sm">📧 {lembrete.email}</p>}
                </div>
              )}
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
