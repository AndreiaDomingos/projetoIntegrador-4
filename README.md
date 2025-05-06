![Fatec](Fatec.jpg)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/>
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" alt="Jest" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind CSS" width="40" height="40"/>
  <img src="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" alt="AWS" width="40" height="40"/>
  <img src="Render.JPG" alt="Render" width="" height="40"/>
  <img src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" alt="Vercel" width="40" height="40"/>
</p>

# Sistema de Gerenciamento de Lembretes

Este projeto é um sistema de gerenciamento de lembretes de remédios com funcionalidades de notificação via e-mail e SMS. A aplicação é composta por uma API desenvolvida em NestJS (Node.js) e um front-end construído com Next.js e React, utilizando TypeScript e Tailwind CSS para uma interface moderna e responsiva. O sistema permite cadastrar, consultar e gerenciar lembretes, enviando notificações automáticas conforme programado.

**Alunos**

    ANDRÉIA DOMINGOS SERAFIM
    GABRIEL CRUZ DOS PASSOS
    MILENA OLIVEIRA ARANTES
    NÚBIA CAROLINE RAMOS CISCATI

**Curso**

    Curso: Análise e Desenvolvimento de Sistemas
    Semestre: 4 Semestre
    Faculdade: FATEC Indaiatuba

# Projeto Integrador 4

## Estrutura de Pastas

```
projetoIntegrador-4/
│
├── backend/
│   ├── src/
│   │   ├── lembrete/           # Módulo de lembretes (controllers, services, DTOs, entidades)
│   │   ├── mail/               # Serviço de envio de e-mails
│   │   ├── prisma/             # Serviço de integração com o Prisma
│   │   ├── sms/                # Serviço de envio de SMS
│   │   └── ...                 # Outros arquivos do NestJS
│   ├── prisma/
│   │   ├── schema.prisma       # Definição do schema do banco de dados
│   │   └── migrations/         # Migrações do banco de dados
│   ├── package.json            # Dependências e scripts do backend
│   └── ...                     # Outros arquivos de configuração
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Componentes reutilizáveis (ex: CustomButton)
│   │   │   ├── cadastro/       # Página de cadastro de lembretes
│   │   │   ├── consulta/       # Página de consulta de lembretes
│   │   │   ├── layout.tsx      # Layout global
│   │   │   ├── page.tsx        # Página principal
│   │   │   └── globals.css     # Estilos globais
│   ├── public/                 # Arquivos estáticos (imagens, ícones)
│   ├── package.json            # Dependências e scripts do frontend
│   └── ...                     # Outros arquivos de configuração
│
└── ...                         # Arquivos de configuração do projeto
```

## Tecnologias Utilizadas

### Backend
- **Node.js**
- **NestJS**: Framework para construção de APIs escaláveis
- **Prisma ORM**: Mapeamento objeto-relacional para banco de dados
- **SQLite** (ou outro banco, conforme configuração do Prisma)
- **Jest**: Testes automatizados
- **AWS**: Serviços de nuvem
- **Render**: Hospedagem do backend

### Frontend
- **Next.js**: Framework React para aplicações web
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework utilitário para estilização
- **Vercel**: Hospedagem do frontend

## Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd projetoIntegrador-4
```

### 2. Instale as dependências
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Configure as variáveis de ambiente
- No backend, configure o acesso ao banco de dados em `backend/prisma/schema.prisma` e, se necessário, crie um arquivo `.env`.
- No frontend, configure a URL da API no arquivo `.env.local`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

### 4. Execute as migrações do banco de dados (backend)
```bash
cd backend
npx prisma migrate dev
```

### 5. Inicie o backend (deve ser iniciado primeiro)
```bash
npm run start:dev
```
O backend estará disponível em `http://localhost:3000` (ou porta configurada).

### 6. Inicie o frontend
```bash
cd ../frontend
npm run dev
```
O frontend estará disponível em `http://localhost:3001` (ou porta configurada).

---

Siga esses passos para rodar o projeto localmente. Para dúvidas ou sugestões, consulte os arquivos `README.md` de cada subprojeto ou abra uma issue.
