const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const taskRoutes = require("./src/routes/task");

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  // define as informações (nome,versão, descrição e o servidor base) da API para o Swagger
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do List API",
      version: "1.0.0",
      description: "API de gerenciamento de tarefas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], //diz para o swagger-Jsdoc onde encontrar os arquivos de rotas para extrair as anotações de documentação. Todos em routes/*.js
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Configura o Swagger UI para servir a documentação gerada a partir das opções definidas

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de To-Do List!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
