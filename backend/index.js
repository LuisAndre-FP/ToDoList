const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const taskRoutes = require("./src/routes/task");

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
}));

app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições, tente novamente em 15 minutos." },
});
app.use("/api/", limiter);

if (process.env.NODE_ENV !== "production") {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "To-Do List API",
        version: "1.0.0",
        description: "API de gerenciamento de tarefas",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./src/routes/*.js"],
  };
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de To-Do List!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
  }
});
