const express = require("express");
// Importa o módulo Express para criar o servidor e definir as rotas da aplicação
const cors = require("cors");
// Importa o módulo CORS para habilitar o Cross-Origin Resource Sharing,
// permitindo que o frontend acesse a API mesmo estando em domínios diferentes
require("dotenv").config();
// Lê e coloca as variaveis de ambiente disponíveis para o processo, como as configurações do banco de dados e a porta do servidor

const taskRoutes = require("./src/routes/task");
// Importa as rotas relacionadas às tarefas para poder usá-las na aplicação

const app = express();
// Cria uma instância do Express para configurar o servidor e as rotas da aplicação

app.use(cors());
// Habilita o CORS para permitir que o frontend acesse a API mesmo estando em domínios diferentes
app.use(express.json());
// Faz o servidor conseguir ler o corpo das requisições em formato JSON, o que é importante para receber os dados do frontend

app.use("/api/tasks", taskRoutes);
// Define a rota base para as operações relacionadas às tarefas, assSociando-a ao roteador de tarefas importado acima

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de Tarefas!" });
});
// Define uma rota GET para a raiz do servidor, que retorna uma mensagem de boas-vindas em formato JSON

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Inicia o servidor na porta definida na variável de ambiente PORT ou na porta 3000 se a variável não estiver definida
  console.log(`Servidor rodando na porta ${PORT}`);
});
