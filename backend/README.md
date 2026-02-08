<!-- # 🏥 Sistema de Agendamento de Consultas

---

## 📋 Contexto do Problema

A clínica **MedCare** está crescendo e precisa modernizar seu sistema de agendamentos. Atualmente, os agendamentos são feitos manualmente via telefone e planilhas, gerando conflitos de horários e insatisfação dos pacientes.

Você foi contratado para desenvolver uma **aplicação web completa** (frontend + backend) que permita gerenciar médicos, pacientes e agendamentos de forma eficiente e intuitiva.

---

## 🎯 Requisitos do Projeto

O projeto deve ser dividido em duas partes integradas:

- **Backend:** API RESTful em NodeJs
- **Frontend:** Aplicação web em ReactJs

--- -->

# 🔧 BACKEND

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

## 📦 Estrutura

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
