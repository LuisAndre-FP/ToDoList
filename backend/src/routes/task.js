const express = require("express");
// Importa o módulo Express para criar o roteador e definir as rotas relacionadas às tarefas

const router = express.Router();
// Cria um roteador do Express para definir as rotas relacionadas às tarefas

const {
  index,
  show,
  create,
  update,
  remove,
} = require("../controllers/taskController");

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
// Define as rotas para as operações CRUD de tarefas, associando cada rota a um controlador específico

module.exports = router;