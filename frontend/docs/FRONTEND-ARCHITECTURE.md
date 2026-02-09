# Arquitetura do Frontend - Sistema de Agendamento de Consultas

## Indice

- [Visao Geral](#visao-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura e Princípios](#arquitetura-e-princípios)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Módulos de Dominio](#módulos-de-dominio)
- [Camada Compartilhada (Shared)](#camada-compartilhada-shared)
- [Funções Utilitárias](#funções-utilitárias)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Comúnicação com API](#comúnicação-com-api)
- [Validação e Formulários](#validação-e-formulários)
- [Estilização](#estilização)
- [Tipagem Global](#tipagem-global)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padrões e Convenções](#padrões-e-convenções)

---

## Visao Geral

Aplicação React para gerenciamento de agendamento de consultas medicas. O sistema permite autenticação de usuários, gestão de médicos, pacientes e consultas, alem de um dashboard com estatísticas.

A arquitetura segue o padrão **Feature-Based (Modular)**, onde o código e organizado por dominios de negócio independentes, promovendo escalabilidade e manutencao facilitada.

**Status atual:** Fase de scaffolding - estrutura de pastas e dependencias configuradas, implementação dos módulos pendente.

---

## Stack Tecnológica

### Core

| Tecnologia | Versão | Finalidade              |
| ---------- | ------ | ----------------------- |
| React      | 19.2.0 | Biblioteca de UI        |
| TypeScript | 5.9.3  | Tipagem estatica        |
| Vite       | 7.2.4  | Build tool e dev server |

### Dados e Estado

| Tecnologia           | Versão  | Finalidade                                 |
| -------------------- | ------- | ------------------------------------------ |
| TanStack React Query | 5.90.20 | Cache e sincronização de dados do servidor |
| React Hook Form      | 7.71.1  | Gerenciamento de formulários               |
| @hookform/resolvers  | 5.2.2   | Integração React Hook Form + Zod           |
| Zod                  | 4.3.6   | Validação de schemas                       |

### Navegação

| Tecnologia       | Versão | Finalidade              |
| ---------------- | ------ | ----------------------- |
| React Router DOM | 7.13.0 | Roteamento client-side  |

### Cliente HTTP

| Tecnologia | Versão | Finalidade                    |
| ---------- | ------ | ----------------------------- |
| Axios      | 1.13.4 | Cliente HTTP com interceptors |

### Interface

| Tecnologia     | Versão  | Finalidade                  |
| -------------- | ------- | --------------------------- |
| Tailwind CSS   | 3.4.19  | Framework CSS utility-first |
| PostCSS        | 8.5.6   | Processamento de CSS        |
| Autoprefixer   | 10.4.24 | Prefixos CSS automáticos    |
| React Icons    | 5.5.0   | Icones                      |
| React Toastify | 11.0.5  | Notificações toast          |

### Libs Auxiliares

| Tecnologia | Versão | Finalidade           |
| ---------- | ------ | -------------------- |
| date-fns   | 4.1.0  | Manipulação de datas |

### Desenvolvimento

| Tecnologia        | Versão | Finalidade          |
| ----------------- | ------ | ------------------- |
| ESLint            | 9.39.1 | Linting             |
| TypeScript ESLint | 8.46.4 | Regras ESLint p/ TS |

---

## Arquitetura e Princípios

### Camadas da Aplicação

```text
Presentation   ->  Pages, Components (JSX/UI)
Application    ->  Hooks, Providers, Routers
Domain         ->  Services, Schemas, Types
Infrastructure ->  API Client, Interceptors, Utils
```

O fluxo de dados segue uma direção:

```text
Ação do Usuário
      |
      v
  Componente (Page)
      |
      v
  Hook customizado  -->  React Query (cache)
      |                       |
      v                       v
   Service  ---------->  API Client (Axios)
                              |
                              v
                         Backend API
```

### Princípios

1. **Modularidade** - Cada dominio (auth, doctors, patients...) e um módulo isolado
2. **Separação de responsabilidades** - UI, lógica e dados em camadas distintas
3. **Barrel exports** - Cada pasta expõe seu conteúdo via `index.ts`
4. **TypeScript Strict** - Tipagem rigorosa em toda a base de código
5. **Single Responsibility** - Cada arquivo/componente tem uma única responsabilidade

---

## Estrutura de Pastas

```text
src/
|-- app/                          # Configuração da aplicação
|   |-- App.tsx                   # Componente raiz
|   |-- main.tsx                  # Entry point (React DOM)
|   |-- providers/
|   |   |-- providers.tsx         # Providers globais (QueryClient, Router, etc)
|   |   +-- index.ts
|   +-- routers/
|       |-- router.tsx            # Definicao de rotas
|       +-- index.ts
|
|-- modules/                      # Módulos de dominio
|   |-- auth/                     # Autenticação
|   |-- appointments/             # Consultas
|   |-- dashboard/                # Dashboard
|   |-- doctors/                  # Médicos
|   |-- patients/                 # Pacientes
|   +-- users/                    # Usuários
|
|-- shared/                       # Recursos compartilhados
|   |-- api/                      # Cliente HTTP e interceptors
|   |-- components/               # Componentes reutilizáveis
|   |-- hooks/                    # Hooks customizados
|   +-- layouts/                  # Layouts de página
|
|-- utils/                        # Funções utilitárias
|   |-- validators/               # Validadores e schemas Zod
|   |-- constants.ts
|   |-- formatters.ts
|   +-- helpers.ts
|
|-- types/                        # Tipos globais do TypeScript
|   +-- index.ts
|
|-- styles/                       # Estilos globais
|   |-- index.css                 # Tailwind directives + base CSS
|   |-- global.css
|   +-- App.css
|
+-- assets/                       # Arquivos estáticos
    |-- fonts/
    |-- icons/
    +-- images/
```

---

## Módulos de Dominio

Cada módulo em `src/modules/` representa um dominio de negócio e segue uma estrutura padrão:

```text
módulo/
|-- components/       # Componentes específicos do módulo
|   +-- index.ts
|-- hooks/            # Hooks específicos do módulo
|   +-- index.ts
|-- pages/            # Páginas/rotas do módulo
|   +-- index.ts
|-- schemas/          # Schemas Zod para validação
|   +-- index.ts
|-- services/         # Comúnicação com API
|   +-- index.ts
|-- types/            # Tipos TypeScript do módulo
|   +-- index.ts
+-- index.ts          # Barrel export do módulo
```

### Módulos existentes

| Módulo         | Descrição                                    | Subpastas extras           |
| -------------- | -------------------------------------------- | -------------------------- |
| `auth`         | Login, logout, sessao, protecao de rotas     | `store/`                   |
| `appointments` | CRUD de consultas, agendamento, cancelamento | -                          |
| `dashboard`    | Estatísticas, gráficos, próximas consultas   | sem `schemas/` e `types/`  |
| `doctors`      | CRUD de médicos, especialidades              | -                          |
| `patients`     | CRUD de pacientes, histórico de consultas    | -                          |
| `users`        | Gestão de usuários e permissões              | -                          |

### Exemplo de uso (import via barrel export)

```typescript
import { LoginForm, useLogin } from '@/modules/auth';
import { DoctorsList } from '@/modules/doctors';
```

---

## Camada Compartilhada (Shared)

### Componentes (`src/shared/components/`)

Componentes de UI reutilizáveis em toda a aplicação:

| Componente | Arquivo               | Descrição                       |
| ---------- | --------------------- | ------------------------------- |
| Button     | `Button/Button.tsx`   | Botão com variantes e estados   |
| Card       | `Card/Card.tsx`       | Container visual para conteúdo  |
| Input      | `Input/Input.tsx`     | Campo de entrada com label/erro |
| Loading    | `Loading/Loading.tsx` | Indicador de carregamento       |
| Modal      | `Modal/Modal.tsx`     | Dialog/modal sobreposto         |
| Table      | `Table/Table.tsx`     | Tabela com dados tabulares      |

Todos exportados via `shared/components/index.ts`.

### Hooks (`src/shared/hooks/`)

Hooks customizados reutilizáveis:

| Hook            | Arquivo              | Descrição                                  |
| --------------- | -------------------- | ------------------------------------------ |
| useAuth         | `useAuth.ts`         | Acesso ao estado de autenticação           |
| useLocalStorage | `useLocalStorage.ts` | Leitura/escrita no localStorage            |
| useModal        | `useModal.ts`        | Controle de abertura/fechamento de modais  |
| usePágination   | `usePágination.ts`   | Lógica de páginação                        |

Todos exportados via `shared/hooks/index.ts`.

### API (`src/shared/api/`)

| Arquivo           | Descrição                                                    |
| ----------------- | ------------------------------------------------------------ |
| `client.ts`       | Instância Axios configurada com baseURL e headers            |
| `interceptors.ts` | Interceptors para injeção de token e tratamento de erros     |
| `index.ts`        | Barrel export                                                |

---

## Funções Utilitárias

### Módulos (`src/utils/`)

| Arquivo         | Descrição                                    |
| --------------- | -------------------------------------------- |
| `constants.ts`  | Constantes da aplicação (URLs, limites, etc) |
| `formatters.ts` | Formatação de dados (CPF, telefone, datas)   |
| `helpers.ts`    | Funções auxiliares genéricas                 |

### Validadores (`src/utils/validators/`)

| Arquivo              | Descrição                   |
| -------------------- | --------------------------- |
| `cpf.validator.ts`   | Validação de CPF brasileiro |
| `email.validator.ts` | Validação de email          |

### Schemas Zod (`src/utils/validators/schemas/`)

| Arquivo             | Descrição                          |
| ------------------- | ---------------------------------- |
| `cpf.schema.ts`     | Schema Zod para validação de CPF   |
| `email.schema.ts`   | Schema Zod para validação de email |
| `custom-schemas.ts` | Schemas Zod adicionais             |

---

## Gerenciamento de Estado

A aplicação utiliza estrategias diferentes por tipo de estado:

### Estado do Servidor

**TanStack React Query** para dados vindos da API.

```typescript
// Hook de leitura (query)
function useDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: doctorService.getAll,
  });
}

// Hook de escrita (mutation)
function useCreateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: doctorService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}
```

### Estado de Autenticação

**Context API + localStorage** via módulo `auth/store/`.

- Token JWT armazenado no localStorage
- Estado do usuário disponível via `useAuth()` hook

### Estado de UI

**useState + hooks customizados** (useModal, usePágination).

### Estado de Formulários

**React Hook Form + Zod** para validação em runtime e tipagem em compile time.

---

## Rotas da Aplicação

**React Router DOM v7** configurado em `src/app/routers/router.tsx`.

### Estrutura de rotas prevista

```text
/login                    # Página de login (publica)
/                         # Layout protegido (requer autenticação)
  /dashboard              # Dashboard com estatísticas
  /doctors                # Lista de médicos
  /doctors/new            # Cadastro de medico
  /doctors/:id            # Detalhes do medico
  /doctors/:id/edit       # Edicao de medico
  /patients               # Lista de pacientes
  /patients/new           # Cadastro de paciente
  /patients/:id           # Detalhes do paciente
  /appointments           # Lista de consultas
  /appointments/new       # Nova consulta
  /appointments/:id       # Detalhes da consulta
```

### Protecao de rotas

Rotas autenticadas envolvidas por um componente de protecao que verifica o token JWT e redireciona para `/login` caso o usuário não esteja autenticado.

---

## Comúnicação com API

### Fluxo

```text
Componente -> Hook -> Service -> API Client (Axios) -> Backend
```

### API Client (`src/shared/api/client.ts`)

Instância Axios pre-configurada:

- `baseURL` via variavel de ambiente `VITE_API_URL`
- Headers padrão (`Content-Type: application/json`)
- Timeout configurável

### Interceptors (`src/shared/api/interceptors.ts`)

**Request:** Injeta o token JWT no header `Authorization: Bearer <token>`.

**Response:** Trata erros HTTP globalmente:

- `401` - Token expirado, redireciona para login
- `403` - Sem permissão, exibe notificação
- `5xx` - Erro do servidor, exibe notificação generica

### Services (por módulo)

Cada módulo tem seu próprio service em `modules/<módulo>/services/`:

```typescript
const doctorService = {
  getAll:    () => apiClient.get('/doctors'),
  getById:   (id: string) => apiClient.get(`/doctors/${id}`),
  create:    (data: CreateDoctorDto) => apiClient.post('/doctors', data),
  update:    (id: string, data: Partial<Doctor>) => apiClient.patch(`/doctors/${id}`, data),
  delete:    (id: string) => apiClient.delete(`/doctors/${id}`),
};
```

---

## Validação e Formulários

### React Hook Form + Zod

Formulários utilizam React Hook Form para gerenciamento de estado do formulario e Zod para definicao e validação de schemas.

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doctorSchema, type DoctorFormData } from './schemas';

function DoctorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} error={errors.name?.message} />
    </form>
  );
}
```

### Schemas

- **Schemas do módulo** em `modules/<módulo>/schemas/` - validação especifica do dominio
- **Schemas utilitarios** em `utils/validators/schemas/` - validacoes reutilizáveis (CPF, email)

---

## Estilização

### Tailwind CSS

Configurado em `tailwind.config.js` com paleta customizada:

```javascript
colors: {
  primary: {
    50:  '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
}
```

### Paleta de cores da aplicação

| Cor      | Hex       | Uso                    |
| -------- | --------- | ---------------------- |
| Azul     | `#3B82F6` | Primaria (tema medico) |
| Verde    | `#10B981` | Sucesso / Confirmado   |
| Amarelo  | `#F59E0B` | Alerta / Pendente      |
| Vermelho | `#EF4444` | Erro / Cancelado       |

### Arquivos de estilo

| Arquivo             | Descrição                                  |
| ------------------- | ------------------------------------------ |
| `styles/index.css`  | Diretivas Tailwind + reset CSS + variáveis |
| `styles/global.css` | Estilos globais adicionais                 |
| `styles/App.css`    | Estilos específicos do componente App      |

---

## Tipagem Global

Tipos compartilhados definidos em `src/types/index.ts`:

```typescript
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "receptionist" | "user";
};

export type Doctor = {
  id: string;
  name: string;
  crm: string;
  specialties: string[];
  phone: string;
  email: string;
};
```

Tipos específicos de cada módulo ficam em `modules/<módulo>/types/`.

---

## Variáveis de Ambiente

Arquivo `.env.example`:

```bash
VITE_API_URL=
VITE_APP_NAME=
```

| Variavel       | Descrição                       |
| -------------- | ------------------------------- |
| `VITE_API_URL` | URL base da API backend         |
| `VITE_APP_NAME`| Nome da aplicação para exibicao |

Variáveis prefixadas com `VITE_` sao expostas ao código cliente pelo Vite via `import.meta.env`.

---

## Scripts Disponíveis

```bash
npm run dev       # Inicia o servidor de desenvolvimento (Vite)
npm run build     # Compila TypeScript + build de produção
npm run preview   # Preview do build de produção
npm run lint      # Executa ESLint no diretório src/
npm run test      # Executa testes com Vitest
```

---

## Padrões e Convenções

### Nomenclatura de arquivos

| Tipo       | Padrão                      | Exemplo             |
| ---------- | --------------------------- | ------------------- |
| Componente | PascalCase                  | `Button.tsx`        |
| Hook       | camelCase com prefixo `use` | `useAuth.ts`        |
| Service    | camelCase                   | `doctor.service.ts` |
| Schema     | camelCase com `.schema`     | `cpf.schema.ts`     |
| Tipo       | camelCase ou PascalCase     | `auth.types.ts`     |
| Utilitario | camelCase                   | `formatters.ts`     |
| Constante  | camelCase                   | `constants.ts`      |

### Nomenclatura no código

| Tipo             | Padrão           | Exemplo                      |
| ---------------- | ---------------- | ---------------------------- |
| Componentes      | PascalCase       | `function UserCard() {}`     |
| Hooks            | camelCase + use  | `function useAuth() {}`      |
| Tipos/Interfaces | PascalCase       | `type User = {}`             |
| Constantes       | UPPER_SNAKE_CASE | `const API_BASE_URL = '...'` |
| Funções          | camelCase        | `function formatCpf() {}`    |

### Importações

Ordem de importações nos arquivos:

1. Bibliotecas externas (`react`, `react-router-dom`, etc.)
2. Módulos internos (`@/modules/...`, `@/shared/...`)
3. Tipos (`import type { ... }`)

### Barrel exports

Toda pasta possui um `index.ts` que re-exporta o conteúdo publico:

```typescript
// modules/doctors/index.ts
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';
```

### Configuração TypeScript

- `strict: true` - todas as verificações rigorosas ativadas
- `noUnusedLocals: true` - variáveis não utilizadas geram erro
- `noUnusedParameters: true` - parâmetros não utilizados geram erro
- `noFallthroughCasesInSwitch: true` - switch sem break gera erro
- Target: ES2022 com módulos ESNext
- JSX: react-jsx (automatic runtime)

---
