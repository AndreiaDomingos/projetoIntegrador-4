'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '../components/CustomButton';
import CustomTextBox from '../components/CustomTextBox';

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

    let telefoneFormatado = null;
    if (form.telefone) {
      const numeros = form.telefone.replace(/\D/g, '');
      telefoneFormatado = `+${numeros}`;
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

        <CustomTextBox name='nome' placeholder='Nome' value={form.nome} onChange={handleChange} required />
        <CustomTextBox name='idade' placeholder='Idade' value={form.idade} onChange={handleChange} required type="number" />

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="notificacao" checked={form.notificacao} onChange={handleChange} />
          <label className="text-gray-600">Receber Notificação</label>
        </div>

        {form.notificacao && (
          <>
            <input
              type="tel"
              name="telefone"
              placeholder="+55 (11) 91234-5678"
              value={form.telefone}
              onChange={handleChange}
              pattern="\+55\s\(\d{2}\)\s\d{5}-\d{4}"
              className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
              className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </>
        )}
        
        <CustomTextBox name='medicamento' placeholder='Medicamento' value={form.medicamento} onChange={handleChange} required />

        <CustomButton type="button" onClick={buscarDescricaoMedicamento} variant="primary">Procurar informações sobre este medicamento</CustomButton>
        
        <CustomTextBox name='dose' placeholder='Dose' value={form.dose} onChange={handleChange} required />
        <CustomTextBox name='dias' placeholder='Por quantos dias' type="number" value={form.dias} onChange={handleChange} required />
        <CustomTextBox name='horario' placeholder='Horário' value={form.horario} onChange={handleChange} required />
        <CustomButton type="submit" variant="primary">Salvar Lembrete</CustomButton>
        <CustomButton onClick={() => router.push('/')} variant="secondary">Voltar ao Menu</CustomButton>
      </form>

      {/* Modal IA (busca medicamento) */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Informações sobre {form.medicamento}
            </h2>
            <p className="text-gray-700 mb-6">{descricao}</p>
            <CustomButton onClick={() => setMostrarModal(false)} variant="third" >
              Fechar
            </CustomButton>
          </div>
        </div>
      )}

      {/* Modal ERRO (campo medicamento vazio) */}
      {mostrarErro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-blue-500 mb-4">Atenção!</h2>
            <p className="text-gray-900 mb-6">Por favor, preencha o nome do medicamento para pesquisar.</p>
            <CustomButton onClick={() => setMostrarErro(false)} variant="third" >
              Ok
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
