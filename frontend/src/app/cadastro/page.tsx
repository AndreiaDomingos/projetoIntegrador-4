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
    doseValor: '',
    doseUnidade: 'ml',
    usoContinuo: false,
    dias: '',
    horario: '',
    posologiaPorIntervalo: false, // para escolher entre horário fixo ou intervalo
    usoInicio: '',
    intervalo: '',
    quantidade: '',
  });

  const [descricao, setDescricao] = useState('');
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarErro, setMostrarErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target;
  
    // Verifica se target é input do tipo checkbox
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validações básicas:
    if (!form.nome.trim() || !form.medicamento.trim()) {
      alert('Por favor, preencha os campos Nome e Medicamento.');
      return;
    }

    if (!form.doseValor || Number(form.doseValor) <= 0) {
      alert('Informe uma dose válida.');
      return;
    }

    if (!form.usoContinuo && !form.posologiaPorIntervalo && !form.horario) {
      alert('Informe um horário fixo ou escolha posologia por intervalo.');
      return;
    }

    if (form.usoContinuo === false && !form.dias) {
      alert('Informe por quantos dias.');
      return;
    }

    if (form.posologiaPorIntervalo) {
      if (!form.usoInicio || !form.intervalo || !form.quantidade) {
        alert('Preencha todos os campos de posologia por intervalo.');
        return;
      }
    }

    let telefoneFormatado = null;
    if (form.telefone) {
      const numeros = form.telefone.replace(/\D/g, '');
      telefoneFormatado = `+${numeros}`;
    }

    const body = {
      nome: form.nome,
      idade: Number(form.idade),
      notificacao: form.notificacao,
      telefone: form.notificacao ? telefoneFormatado : null,
      email: form.notificacao ? form.email : null,
      medicamento: form.medicamento,
      doseValor: Number(form.doseValor),
      doseUnidade: form.doseUnidade,
      usoContinuo: form.usoContinuo,
      dias: form.usoContinuo ? null : Number(form.dias),
      horario: form.posologiaPorIntervalo ? null : form.horario,
      usoInicio: form.posologiaPorIntervalo ? new Date(form.usoInicio).toISOString() : null,
      intervalo: form.posologiaPorIntervalo ? Number(form.intervalo) : null,
      quantidade: form.posologiaPorIntervalo ? Number(form.quantidade) : null,
    };

    await fetch('http://localhost:3000/lembrete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
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

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </>
        )}

        <CustomTextBox name='medicamento' placeholder='Medicamento' value={form.medicamento} onChange={handleChange} required />

        <CustomButton type="button" onClick={buscarDescricaoMedicamento} variant="primary">Procurar informações sobre este medicamento</CustomButton>

        {/* Dose - valor e unidade */}
        <div className="flex space-x-2">
          <input
            type="number"
            name="doseValor"
            placeholder="Dose (valor)"
            value={form.doseValor}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="flex-1 border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            name="doseUnidade"
            value={form.doseUnidade}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="cápsula">cápsula</option>
            <option value="comprimido">comprimido</option>
            <option value="gota">gota</option>
            {/* Adicione mais unidades se quiser */}
          </select>
        </div>

        {/* Uso contínuo */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="usoContinuo" checked={form.usoContinuo} onChange={handleChange} />
          <label className="text-gray-600">Uso contínuo</label>
        </div>

        {/* Dias (aparece só se não for uso contínuo) */}
        {!form.usoContinuo && (
          <CustomTextBox
            name="dias"
            placeholder="Por quantos dias"
            type="number"
            value={form.dias}
            onChange={handleChange}
            required
          />
        )}

        {/* Escolha entre horário fixo e posologia por intervalo */}
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="horarioFixo"
            name="posologiaPorIntervalo"
            value="false"
            checked={!form.posologiaPorIntervalo}
            onChange={() => setForm(prev => ({ ...prev, posologiaPorIntervalo: false }))}
          />
          <label htmlFor="horarioFixo" className="text-gray-600">Horário fixo</label>

          <input
            type="radio"
            id="posologiaIntervalo"
            name="posologiaPorIntervalo"
            value="true"
            checked={form.posologiaPorIntervalo}
            onChange={() => setForm(prev => ({ ...prev, posologiaPorIntervalo: true }))}
          />
          <label htmlFor="posologiaIntervalo" className="text-gray-600">Posologia por intervalo</label>
        </div>

        {/* Horário fixo */}
        {!form.posologiaPorIntervalo && (
          <CustomTextBox
            name="horario"
            placeholder="Horário (ex: 08:00)"
            value={form.horario}
            onChange={handleChange}
            required
          />
        )}

        {/* Posologia por intervalo */}
        {form.posologiaPorIntervalo && (
          <>
            <label className="text-gray-700 font-semibold">Início do tratamento</label>
            <input
              type="datetime-local"
              name="usoInicio"
              value={form.usoInicio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <CustomTextBox
              name="intervalo"
              placeholder="Intervalo (em horas)"
              type="number"
              value={form.intervalo}
              onChange={handleChange}
              required
            />

            <CustomTextBox
              name="quantidade"
              placeholder="Quantidade de doses"
              type="number"
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </>
        )}

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