'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    notificacao: false,
    telefone: '',
    email: '',
    medicamento: '',
    dose: '',
    dias: '',
    horario: '',
  });
  const [descricao, setDescricao] = useState('');
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarErro, setMostrarErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Formatar telefone (remover tudo que não é número e adicionar + no início)
    let telefoneFormatado = null;
    if (form.telefone) {
      const soNumeros = form.telefone.replace(/\D/g, '');
      telefoneFormatado = `+${soNumeros}`;
    }

    await fetch('https://projetointegrador-4.onrender.com/lembrete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        idade: parseInt(form.idade),
        notificacao: form.notificacao,
        telefone: form.notificacao ? telefoneFormatado : null,
        email: form.notificacao ? form.email : null,
        medicamento: form.medicamento,
        dose: form.dose,
        dias: parseInt(form.dias),
        horario: form.horario,
      }),
    });

    setSucesso(true);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  async function buscarDescricaoMedicamento() {
    if (!form.medicamento) {
      setMostrarErro(true);
      return;
    }

    setCarregandoDescricao(true);

    const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Explique de forma resumida (em até 3 linhas) para que serve o medicamento ${form.medicamento}.`
          }]
        }]
      })
    });

    const data = await resposta.json();
    const textoGerado = data.candidates?.[0]?.content?.parts?.[0]?.text || "Descrição não encontrada.";

    setDescricao(textoGerado);
    setMostrarModal(true);
    setCarregandoDescricao(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Cadastrar Lembrete</h1>

        {carregandoDescricao && (
          <p className="text-blue-500 text-center font-semibold mb-4">Buscando informações do medicamento...</p>
        )}

        {sucesso && (
          <div className="bg-green-100 text-green-700 p-3 rounded-2xl text-center font-semibold">
            Lembrete cadastrado com sucesso!
          </div>
        )}

        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />

        <input name="idade" placeholder="Idade" type="number" value={form.idade} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="notificacao" checked={form.notificacao} onChange={handleChange} />
          <label className="text-gray-600">Receber Notificação</label>
        </div>

        {form.notificacao && (
          <>
            <InputMask
              mask="+55 (99) 99999-9999"
              value={form.telefone}
              onChange={handleChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  name="telefone"
                  placeholder="+55 (11) 91234-5678"
                  className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              )}
            </InputMask>

            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
              className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </>
        )}

        <input name="medicamento" placeholder="Medicamento" value={form.medicamento} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />

        <button type="button" onClick={buscarDescricaoMedicamento}
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl transition">
          Procurar informações sobre este medicamento
        </button>

        <input name="dose" placeholder="Dose" value={form.dose} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />

        <input name="dias" placeholder="Por quantos dias" type="number" value={form.dias} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />

        <input name="horario" placeholder="Horário" value={form.horario} onChange={handleChange}
          className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" required />

        <button type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl transition">
          Salvar Lembrete
        </button>

        <button type="button" onClick={() => router.push('/')}
          className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-2xl transition">
          Voltar ao Menu
        </button>
      </form>

      {/* Modal IA (busca medicamento) */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Informações sobre {form.medicamento}
            </h2>
            <p className="text-gray-700 mb-6">{descricao}</p>
            <button
              onClick={() => setMostrarModal(false)}
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-2xl transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal ERRO (campo medicamento vazio) */}
      {mostrarErro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-blue-500 mb-4">Atenção!</h2>
            <p className="text-gray-900 mb-6">Por favor, preencha o nome do medicamento para pesquisar.</p>
            <button
              onClick={() => setMostrarErro(false)}
              className="bg-blue-400 text-white font-semibold px-6 py-2 rounded-2xl transition"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
