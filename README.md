# ToDoList

Uma aplicação web fullstack de gerenciamento de tarefas com backend em Node.js e frontend em React.

## O que é este projeto?

Um app de **lista de tarefas (To-Do List)** completo. O usuário pode criar, visualizar, editar, marcar como concluída e excluir tarefas. O projeto foi construído para praticar o desenvolvimento de APIs REST com Node.js integradas a um frontend React moderno.

## Tecnologias

**Backend**
- Node.js + Express — servidor HTTP e roteamento
- PostgreSQL — banco de dados relacional para persistência das tarefas
- dotenv — gerenciamento de variáveis de ambiente
- helmet — headers de segurança HTTP
- express-rate-limit — proteção contra abuso de requisições
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
        ├── services/
        │   └── api.js         # Funções de comunicação com a API
        └── App.jsx            # Componente principal
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
```

Crie o banco de dados no PostgreSQL:

```sql
CREATE DATABASE todo_app;
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

Edite o `docker-compose.yml` com sua senha real e suba os containers:

```bash
docker-compose up --build
```

> **Atenção:** o `docker-compose.yml` está no `.gitignore` pois pode conter credenciais reais. Nunca versione esse arquivo.

## Endpoints da API

| Método | Rota             | Descrição               |
|--------|------------------|-------------------------|
| GET    | /api/tasks       | Lista todas as tarefas  |
| GET    | /api/tasks/:id   | Busca uma tarefa por ID |
| POST   | /api/tasks       | Cria uma nova tarefa    |
| PUT    | /api/tasks/:id   | Atualiza uma tarefa     |
| DELETE | /api/tasks/:id   | Remove uma tarefa       |

## Funcionalidades

- Listar todas as tarefas
- Criar nova tarefa com título
- Editar título e descrição de uma tarefa
- Marcar tarefa como concluída (checkbox)
- Deletar tarefa
