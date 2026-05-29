# ToDoList

Uma aplicação web fullstack de gerenciamento de tarefas com autenticação JWT, backend em Node.js e frontend em React.

## O que é este projeto?

Um app de **lista de tarefas (To-Do List)** completo com sistema de contas. O usuário cria uma conta, faz login e gerencia suas próprias tarefas — criar, visualizar, editar, marcar como concluída e excluir. As tarefas de cada usuário são isoladas das de outros.

## Tecnologias

**Backend**
- Node.js + Express — servidor HTTP e roteamento
- PostgreSQL — banco de dados relacional para persistência
- bcrypt — hash seguro de senhas
- jsonwebtoken — geração e verificação de tokens JWT
- helmet — headers de segurança HTTP
- express-rate-limit — proteção contra brute force e abuso de requisições
- dotenv — gerenciamento de variáveis de ambiente
- swagger-jsdoc + swagger-ui-express — documentação interativa da API (apenas em desenvolvimento)

**Frontend**
- React 19 — interface do usuário
- Tailwind CSS — estilização
- Vite — bundler e servidor de desenvolvimento

## Estrutura do projeto

```
ToDoLIst/
├── backend/
│   ├── src/
│   │   ├── config/        # Conexão com o banco de dados
│   │   ├── controllers/   # Lógica das requisições HTTP
│   │   ├── middleware/
│   │   │   └── auth.js    # Middleware de verificação do token JWT
│   │   ├── models/        # Queries SQL
│   │   └── routes/        # Definição das rotas da API
│   ├── .dockerignore
│   ├── Dockerfile
│   └── index.js           # Ponto de entrada do servidor
├── docker-compose.example.yml  # Template para rodar com Docker
└── frontend/
    └── src/
        ├── components/
        │   ├── TaskCard.jsx   # Card de cada tarefa (editar, deletar, marcar)
        │   └── TaskForm.jsx   # Formulário para criar nova tarefa
        ├── pages/
        │   ├── LoginPage.jsx  # Tela de login e cadastro
        │   └── TasksPage.jsx  # Tela principal das tarefas
        ├── services/
        │   └── api.js         # Funções de comunicação com a API
        └── App.jsx            # Componente raiz e controle de autenticação
```

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL rodando localmente

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com base no exemplo abaixo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
PORT=3000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=uma_chave_secreta_longa_e_aleatoria
```

Crie o banco de dados e as tabelas no PostgreSQL:

```sql
CREATE DATABASE todo_app;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Inicie o servidor:

```bash
node index.js
```

A API estará disponível em `http://localhost:3000`.

A documentação interativa (Swagger UI) estará disponível em `http://localhost:3000/api-docs` (apenas quando `NODE_ENV` não for `production`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`.

## Como rodar com Docker

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp docker-compose.example.yml docker-compose.yml
```

Edite o `docker-compose.yml` com sua senha real e sua chave JWT, depois suba os containers:

```bash
docker-compose up --build
```

> **Atenção:** o `docker-compose.yml` está no `.gitignore` pois contém credenciais reais. Nunca versione esse arquivo.

## Endpoints da API

### Autenticação

| Método | Rota             | Descrição                        |
|--------|------------------|----------------------------------|
| POST   | /auth/register   | Cadastra um novo usuário         |
| POST   | /auth/login      | Faz login e retorna o token JWT  |

### Tarefas (requer token JWT no header `Authorization: Bearer <token>`)

| Método | Rota             | Descrição               |
|--------|------------------|-------------------------|
| GET    | /api/tasks       | Lista as tarefas do usuário  |
| GET    | /api/tasks/:id   | Busca uma tarefa por ID |
| POST   | /api/tasks       | Cria uma nova tarefa    |
| PUT    | /api/tasks/:id   | Atualiza uma tarefa     |
| DELETE | /api/tasks/:id   | Remove uma tarefa       |

## Funcionalidades

- Cadastro e login com email e senha
- Autenticação via token JWT (válido por 7 dias)
- Cada usuário vê e gerencia apenas suas próprias tarefas
- Criar nova tarefa com título e descrição opcional
- Editar título e descrição de uma tarefa
- Marcar tarefa como concluída (checkbox)
- Deletar tarefa
