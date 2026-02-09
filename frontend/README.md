
# 🎨 FRONTEND

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

### Diferenciais Frontend

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

### Stacks Obrigatórias

- **React:** 18+ com TypeScript
- **Build Tool:** Vite

### Stacks Recomendadas

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
  - Outro de sua preferência

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

### Frontend

**Testes Recomendados:**

- Renderização de componentes
- Interações de usuário (cliques, formulários)
- Navegação entre rotas
- Autenticação (login/logout)

---

## 📦 Estrutura

```
projeto-fullstack/
├── backend/
│   ├── docs/
│   ├── src/
│   ├── tests/
│   ├── database/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md          # Instruções específicas do backend
├── frontend/
│   ├── docs/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
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

### Frontend

- [ ] Autenticação e rotas protegidas
- [ ] Formulários com validação
- [ ] Integração completa com API
- [ ] Responsivo
- [ ] Loading e error states
- [ ] .env.example configurado
- [ ] README do frontend

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
