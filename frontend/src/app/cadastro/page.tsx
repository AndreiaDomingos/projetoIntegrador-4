'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch('http://localhost:3000/lembrete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        idade: parseInt(form.idade),
        notificacao: form.notificacao,
        telefone: form.notificacao ? form.telefone : null,
        email: form.notificacao ? form.email : null,
        medicamento: form.medicamento,
        dose: form.dose,
        dias: parseInt(form.dias),
        horario: form.horario,
      }),
    });

    router.push('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Cadastrar Lembrete</h1>

        <input 
          name="nome" 
          placeholder="Nome" 
          value={form.nome} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          required 
        />

        <input 
          name="idade" 
          placeholder="Idade" 
          type="number" 
          value={form.idade} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          required 
        />

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            name="notificacao" 
            checked={form.notificacao} 
            onChange={handleChange} 
          />
          <label className="text-gray-600">Receber Notificação</label>
        </div>

        {form.notificacao && (
          <>
            <input 
              name="telefone" 
              placeholder="Telefone" 
              value={form.telefone} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
          </>
        )}

        <input 
          name="medicamento" 
          placeholder="Medicamento" 
          value={form.medicamento} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          required 
        />

        <input 
          name="dose" 
          placeholder="Dose" 
          value={form.dose} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          required 
        />

        <input 
          name="dias" 
          placeholder="Por quantos dias" 
          type="number" 
          value={form.dias} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          required 
        />

        <input 
          name="horario" 
          placeholder="Horário" 
          value={form.horario} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          required 
        />

        <button 
          type="submit" 
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl transition"
        >
          Salvar Lembrete
        </button>
      </form>
    </div>
  );
}
