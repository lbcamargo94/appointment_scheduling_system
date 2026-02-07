# Sistema de Agendamento de Consultas

## 📋 Contexto do Problema

A clínica MedicineCare está crescendo e precisa modernizar seu sistema de agendamentos. Atualmente, os agendamentos são feitos manualmente via telefone e planilhas, gerando conflitos de horários e insatisfação dos pacientes.

Você foi contratado para desenvolver uma **aplicação web completa** (frontend + backend) que permita gerenciar médicos, pacientes e agendamentos de forma eficiente e intuitiva.

---

## 🎯 Requisitos do Projeto

O projeto deve ser dividido em duas partes integradas:

- **Backend:** API RESTful em Node.js
- **Frontend:** Aplicação web em React

---

## 🔧 PARTE 1: BACKEND (Node.js)

## Requisitos Funcionais - Backend

### Obrigatórios

#### 1. Autenticação e Autorização

- Sistema de autenticação com JWT
- Dois tipos de usuário:
  - **Admin:** Acesso total (gerenciar médicos, pacientes, consultas)
  - **Recepcionista:** Criar/visualizar consultas e pacientes
- Endpoints de login e registro
- Middleware de autenticação para rotas protegidas

#### 2. Gestão de Médicos

- **POST** `/api/doctors` - Cadastrar médico
  - Dados: nome, CRM, telefone, email, especialidades[]
- **GET** `/api/doctors` - Listar médicos
  - Query params: `?specialty=Cardiologia`
- **GET** `/api/doctors/:id` - Buscar médico específico
- **PATCH** `/api/doctors/:id` - Atualizar médico
- **DELETE** `/api/doctors/:id` - Desativar médico (soft delete)
- Um médico pode ter múltiplas especialidades
- Validar formato de CRM e email

#### 3. Gestão de Pacientes

- **POST** `/api/patients` - Cadastrar paciente
  - Dados: nome, CPF, telefone, email, data_nascimento
- **GET** `/api/patients` - Listar pacientes
  - Query params: `?search=nome` (busca por nome ou CPF)
- **GET** `/api/patients/:id` - Buscar paciente específico
- **PATCH** `/api/patients/:id` - Atualizar paciente
- CPF deve ser único e validado
- Calcular idade automaticamente

#### 4. Agendamento de Consultas

- **POST** `/api/appointments` - Agendar consulta
  - Dados: doctor_id, patient_id, date, time, notes
- **GET** `/api/appointments` - Listar consultas
  - Query params:
    - `?doctor_id=X`
    - `?patient_id=Y`
    - `?date=2024-03-15`
    - `?status=scheduled|completed|cancelled`
- **GET** `/api/appointments/:id` - Buscar consulta específica
- **PATCH** `/api/appointments/:id` - Atualizar consulta
- **DELETE** `/api/appointments/:id/cancel` - Cancelar consulta
  - Requer: cancellation_reason

**Regras de Negócio Críticas:**

- ✅ Consultas têm duração fixa de 30 minutos
- ✅ Horário de funcionamento: Segunda a Sexta, 08:00 às 18:00
- ❌ Não permitir agendamentos conflitantes para o mesmo médico
- ❌ Não permitir agendamentos em finais de semana
- ❌ Não permitir agendamentos no passado
- ❌ Não permitir cancelamento de consultas já realizadas

#### 5. Disponibilidade de Horários

- **GET** `/api/doctors/:id/availability` - Horários disponíveis
  - Query params: `?date=2024-03-15`
  - Retorna: array de horários livres (08:00, 08:30, 09:00, etc.)
  - Considera: consultas já agendadas

#### 6. Relatórios e Dashboards

- **GET** `/api/reports/appointments-by-doctor` - Total de consultas por médico
  - Query params: `?start_date=...&end_date=...`
- **GET** `/api/reports/appointments-by-status` - Distribuição por status
- **GET** `/api/dashboard/stats` - Estatísticas gerais
  - Total médicos ativos, pacientes, consultas do dia, etc.

### Diferenciais Backend (Não obrigatórios, mas valorizados)

- Sistema de notificações por email (pode ser mockado/simulado)
- Confirmação de presença do paciente (endpoint para confirmar)
- Lista de espera para horários cancelados
- Histórico completo de consultas do paciente com médico
- Upload de avatar para médicos
- Exportação de relatórios em PDF
- WebSockets para notificações em tempo real
- Rate limiting
- Logs estruturados (Winston ou similar)

---

## Requisitos Técnicos - Backend

### Stack Obrigatória

- **Node.js:** 18+ com TypeScript
- **Framework:** Express.js ou NestJS
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM, Prisma ou Sequelize
- **Autenticação:** JWT (jsonwebtoken)
- **Validação:** Joi, Zod ou class-validator
- **Testes:** Jest + Supertest

### Obrigatório

- ✅ API RESTful seguindo boas práticas
- ✅ TypeScript configurado corretamente
- ✅ Autenticação JWT
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros centralizado
- ✅ Migrations do banco de dados
- ✅ Seeds para popular dados de teste
- ✅ Testes automatizados (cobertura mínima de 70%)
- ✅ Documentação da API (Swagger/OpenAPI)
- ✅ CORS configurado
- ✅ Variáveis de ambiente (.env)

### Modelagem de Dados

```typescript
// Users (Autenticação)
interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'receptionist';
  created_at: Date;
  updated_at: Date;
}

// Doctors
interface Doctor {
  id: string;
  name: string;
  crm: string; // unique
  phone: string;
  email: string;
  specialties: string[]; // ['Cardiologia', 'Clínica Geral']
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Patients
interface Patient {
  id: string;
  name: string;
  cpf: string; // unique
  phone: string;
  email: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
}

// Appointments
interface Appointment {
  id: string;
  doctor_id: string;
  patient_id: string;
  date: Date; // data da consulta
  time: string; // '08:00', '08:30', etc.
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  cancellation_reason?: string;
  created_at: Date;
  updated_at: Date;
}

// Índices importantes:
// - doctor_id, date, time (unique together para evitar conflitos)
// - patient_id (para consultas do paciente)
// - date, status (para filtragens)
```

### Estrutura de Pastas Backend

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── auth.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── modules/
│   │   ├── users/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.entity.ts
│   │   │   ├── user.dto.ts
│   │   │   └── user.routes.ts
│   │   ├── doctors/
│   │   ├── patients/
│   │   └── appointments/
│   ├── utils/
│   │   ├── validation.ts
│   │   └── date.helpers.ts
│   ├── types/
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── unit/
│   └── integration/
├── database/
│   ├── migrations/
│   └── seeds/
├── .env.example
├── package.json
├── tsconfig.json
└── jest.config.js
```

---

## 🎨 PARTE 2: FRONTEND (React)

## Requisitos Funcionais - Frontend

### Obrigatórios

#### 1. Autenticação

- **Página de Login**
  - Formulário com email e senha
  - Validação de campos
  - Feedback de erro (credenciais inválidas)
  - Redirecionar após login bem-sucedido
  - Armazenar token JWT (localStorage ou Context)
- **Proteção de Rotas**
  - Usuários não autenticados redirecionados para login
  - Logout com limpeza de token

#### 2. Dashboard (Página Inicial)

- **Cards com estatísticas:**
  - Total de médicos ativos
  - Total de pacientes cadastrados
  - Consultas agendadas hoje
  - Consultas pendentes de confirmação
- **Gráfico simples** (opcional: Chart.js ou Recharts)
  - Consultas por status (pie chart ou bar chart)
- **Lista das próximas consultas** (hoje e amanhã)
  - Mostrar: horário, médico, paciente, status
  - Botão de ação rápida (confirmar/cancelar)

#### 3. Gestão de Médicos

- **Listagem de Médicos**
  - Tabela com: nome, CRM, especialidades, telefone, status
  - Filtro por especialidade
  - Busca por nome
  - Indicador visual de médico ativo/inativo
  - Paginação (se > 10 médicos)
- **Cadastro de Médico**
  - Formulário modal ou página separada
  - Campos: nome, CRM, telefone, email, múltiplas especialidades
  - Validação em tempo real
  - Feedback de sucesso/erro
- **Edição de Médico**
  - Mesmo formulário do cadastro, preenchido
- **Desativação**
  - Confirmação antes de desativar

#### 4. Gestão de Pacientes

- **Listagem de Pacientes**
  - Tabela com: nome, CPF, telefone, idade
  - Busca por nome ou CPF
  - Paginação
- **Cadastro de Paciente**
  - Formulário: nome, CPF (com máscara), telefone (com máscara), email, data de nascimento
  - Validação de CPF
  - Idade calculada automaticamente
- **Edição de Paciente**
- **Visualização de Histórico**
  - Modal ou página com consultas anteriores do paciente

#### 5. Agendamento de Consultas

- **Página/Modal de Novo Agendamento**
  - Seleção de médico (dropdown ou autocomplete)
  - Seleção de paciente (autocomplete com busca)
  - Seleção de data (date picker)
    - Bloquear finais de semana
    - Bloquear datas passadas
  - Seleção de horário (dropdown)
    - Mostrar apenas horários disponíveis
    - Consultar endpoint de disponibilidade
  - Campo de observações (opcional)
  - Botão "Agendar"
- **Lista de Consultas**
  - Visualização tipo calendário OU lista
  - Filtros: médico, paciente, data, status
  - Ações: visualizar detalhes, cancelar
- **Cancelamento de Consulta**
  - Modal de confirmação
  - Campo obrigatório: motivo do cancelamento
  - Feedback visual de sucesso

#### 6. Visualização de Horários Disponíveis

- **Calendário/Grade de Horários**
  - Ao selecionar médico e data, mostrar grade de horários
  - Horários ocupados em cinza/desabilitados
  - Horários livres clicáveis
  - Visual claro (ex: grid 08:00-18:00)

### Diferenciais Frontend (Valorizados)

- Tema escuro/claro (toggle)
- Responsividade mobile completa
- Animações e transições suaves
- Notificações toast (react-toastify ou similar)
- Skeleton loading enquanto carrega dados
- Confirmação de presença do paciente
- Filtros avançados com múltiplos critérios
- Exportação de relatórios (download PDF/CSV)
- Dashboard com gráficos mais elaborados
- PWA (Progressive Web App)
- Testes com React Testing Library

---

## Requisitos Técnicos - Frontend

### Stack Obrigatória

- **React:** 18+ com TypeScript
- **Build Tool:** Vite
- **Roteamento:** React Router v6
- **Gerenciamento de Estado:** Context API + Hooks OU Zustand OU Redux Toolkit
- **HTTP Client:** Axios ou Fetch API
- **Formulários:** React Hook Form
- **Validação:** Zod ou Yup
- **UI Components:** Escolha uma:
  - Tailwind CSS + Headless UI
  - Material-UI (MUI)
  - Ant Design
  - Chakra UI
  - ShadCN UI

### Obrigatório

- ✅ TypeScript configurado
- ✅ Componentização adequada
- ✅ Gerenciamento de estado global (Auth, etc.)
- ✅ Tratamento de erros da API
- ✅ Loading states
- ✅ Validação de formulários
- ✅ Feedback visual (sucesso/erro)
- ✅ Responsivo (desktop e mobile)
- ✅ Rotas protegidas
- ✅ Código organizado e limpo

### Estrutura de Pastas Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── doctors/
│   │   │   ├── DoctorList.tsx
│   │   │   ├── DoctorForm.tsx
│   │   │   └── DoctorCard.tsx
│   │   ├── patients/
│   │   └── appointments/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDoctors.ts
│   │   └── useAppointments.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Doctors.tsx
│   │   ├── Patients.tsx
│   │   └── Appointments.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── doctors.service.ts
│   │   ├── patients.service.ts
│   │   └── appointments.service.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Design e UX

### Requisitos de Interface

1. **Layout Consistente**
   - Header com logo e informações do usuário logado
   - Sidebar com navegação (Dashboard, Médicos, Pacientes, Consultas)
   - Breadcrumbs para orientação

2. **Paleta de Cores Sugerida**
   - Primária: azul (#3B82F6) - médico/saúde
   - Secundária: verde (#10B981) - confirmação/sucesso
   - Alerta: amarelo (#F59E0B) - pendente
   - Erro: vermelho (#EF4444) - cancelado
   - Neutros: cinzas para backgrounds

3. **Componentes Importantes**
   - Tabelas com ordenação
   - Modais para formulários
   - Date pickers intuitivos
   - Dropdowns com busca (autocomplete)
   - Cards informativos
   - Badges de status (agendada, confirmada, cancelada)

4. **Estados Visuais**
   - Loading skeletons ou spinners
   - Empty states (quando não há dados)
   - Error states (quando API falha)
   - Success feedback (toast ou alert)

---

## 🧪 Testes

### Backend

**Testes Unitários:**

- Services (lógica de negócio)
- Validators
- Helpers

**Testes de Integração:**

- Endpoints da API
- Autenticação
- Regras de agendamento

**Casos Críticos:**

```
✅ POST /api/appointments com horário livre → 201 Created
❌ POST /api/appointments com conflito → 409 Conflict
❌ POST /api/appointments no sábado → 400 Bad Request
✅ GET /api/doctors/:id/availability → retorna apenas horários livres
✅ DELETE /api/appointments/:id/cancel → status muda para cancelled
❌ Cancelar consulta já realizada → 400 Bad Request
```

### Frontend

**Testes Recomendados (Bônus):**

- Renderização de componentes
- Interações de usuário (cliques, formulários)
- Navegação entre rotas
- Autenticação (login/logout)

---

## 📦 Estrutura de Entrega

```
projeto-fullstack/
├── backend/
│   ├── src/
│   ├── tests/
│   ├── database/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md          # Instruções específicas do backend
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md          # Instruções específicas do frontend
├── docs/
│   ├── api-documentation.md
│   ├── architecture.md
│   └── screenshots/       # Capturas de tela da aplicação
├── docker-compose.yml     # (Opcional) Para rodar tudo junto
└── README.md              # README principal do projeto
```

---

## 📝 O que seu README Principal deve conter

# Sistema de Agendamento MedCare

## 📋 Sobre o Projeto

Aplicação Full Stack para gestão de consultas médicas...

## 🚀 Tecnologias Utilizadas

### Backend

- Node.js + TypeScript
- Express.js
- PostgreSQL
- TypeORM / Prisma
- Jest

### Frontend

- React + TypeScript
- Vite
- React Router
- Material-UI / Tailwind
- Axios

## 📁 Estrutura do Projeto

[Explicar organização das pastas]

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurar .env com credenciais do banco
npm run migration:run
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Configurar VITE_API_URL
npm run dev
```

### Com Docker (Opcional)

```bash
docker-compose up
```

## 🧪 Como Rodar os Testes

### Backend

```bash
cd backend
npm test
npm run test:coverage
```

### Frontend

```bash
cd frontend
npm test
```

## 📖 Documentação da API

Swagger disponível em: `http://localhost:3000/api-docs`

OU ver: [docs/api-documentation.md](docs/api-documentation.md)

## 🎨 Screenshots

[Incluir capturas de tela das principais telas]

## 🔐 Segurança Implementada

- Hashing de senhas com bcrypt
- JWT com expiração
- Validação de inputs
- CORS configurado
- Sanitização de dados
- Rate limiting (se implementou)

## 🚧 Melhorias Futuras

- Notificações em tempo real (WebSockets)
- Sistema de lembretes por email/SMS
- Integração com calendário (Google Calendar)
- App mobile (React Native)
- Relatórios mais avançados
- Sistema de pagamentos

## 🐛 Problemas Conhecidos

[Se houver algum problema ou limitação]

## 📄 Licença

MIT

---

## 💡 Dicas de desenvolvimento

### Backend
>
> "Valide tudo. Não confie nos dados do cliente."
> "Use transactions para operações críticas."
> "Testes de integração são mais valiosos que unitários para APIs."

### Frontend
>
> "Componentes pequenos e reutilizáveis > componentes grandes."
> "Loading states e error handling fazem toda diferença na UX."
> "TypeScript é seu amigo. Use tipos bem definidos."

---

## ✅ Checklist Final

### Backend

- [ ] Todos os endpoints obrigatórios implementados
- [ ] Autenticação JWT funcionando
- [ ] Validações de regras de negócio
- [ ] Testes com 70%+ cobertura
- [ ] Swagger/documentação da API
- [ ] Seeds com dados de teste
- [ ] .env.example configurado
- [ ] README do backend

### Frontend

- [ ] Todas as páginas obrigatórias
- [ ] Autenticação e rotas protegidas
- [ ] Formulários com validação
- [ ] Integração completa com API
- [ ] Responsivo
- [ ] Loading e error states
- [ ] .env.example configurado
- [ ] README do frontend

### Geral

- [ ] README principal completo
- [ ] Projeto roda localmente
- [ ] Git com commits organizados
- [ ] Screenshots ou GIFs
- [ ] (Opcional) Deploy funcionando

---

## 🎬 Fluxos de Usuário Principais

### 1. Login

```
1. Usuário acessa aplicação
2. Vê tela de login
3. Insere email e senha
4. Clica em "Entrar"
5. Sistema valida credenciais
6. Redireciona para Dashboard
```

### 2. Agendar Nova Consulta

```
1. Usuário autenticado clica em "Nova Consulta"
2. Modal/página de agendamento abre
3. Seleciona médico (dropdown com busca)
4. Sistema filtra especialidades
5. Seleciona paciente (autocomplete)
6. Seleciona data (date picker - sem finais de semana)
7. Sistema busca horários disponíveis do médico
8. Exibe grade de horários (08:00 - 18:00)
9. Usuário seleciona horário disponível
10. Adiciona observações (opcional)
11. Clica em "Agendar"
12. Sistema valida e cria consulta
13. Mostra confirmação de sucesso
14. Redireciona para lista de consultas
```

### 3. Visualizar Agenda do Médico

```
1. Usuário acessa página de Consultas
2. Filtra por médico específico
3. Seleciona data
4. Sistema exibe todas as consultas do dia
5. Código de cores por status:
   - Verde: confirmada
   - Amarelo: agendada (pendente confirmação)
   - Vermelho: cancelada
6. Usuário pode clicar para ver detalhes
```

### 4. Cancelar Consulta

```
1. Usuário encontra consulta na lista
2. Clica em "Cancelar"
3. Modal de confirmação abre
4. Campo obrigatório: "Motivo do cancelamento"
5. Usuário preenche motivo
6. Clica em "Confirmar Cancelamento"
7. Sistema valida (não pode ser consulta passada/realizada)
8. Atualiza status para "cancelada"
9. Mostra feedback de sucesso
10. Atualiza lista automaticamente
```

---
