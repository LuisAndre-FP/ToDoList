// controller é a camada que recebe o req(request - oq o cliente mandou)
// // e devolve o res(response - oq o servidor responde para o cliente)

// try/catch garante que se algo der errado dentro do bloco try,
// o erro será capturado e tratado no bloco catch,
// evitando que a aplicação quebre e permitindo enviar uma resposta de erro adequada para o cliente.
// Isso é importante para melhorar a robustez e a experiência do usuário,
// pois em vez de receber uma resposta de erro genérica ou uma falha na aplicação,
// o cliente recebe uma mensagem clara sobre o que deu errado.
//

const pool = require("../config/db");
// Importa o pool de conexões com o banco de dados para poder usar nas funções abaixo
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../models/taskModel");
// Importa as funções do modelo de tarefas para poder usá-las nos controladores abaixo

const index = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};
// Controlador para a rota GET /tasks, que busca todas as tarefas no banco de dados e retorna como resposta em formato JSON.
// Se ocorrer um erro durante a busca, retorna um status 500 com uma mensagem de erro.

const show = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
};
// Controlador para a rota GET /tasks/:id, que busca uma tarefa específica no banco de dados usando o ID fornecido como parâmetro na URL.
// Se a tarefa for encontrada, retorna a tarefa como resposta em formato JSON.
// Se a tarefa não for encontrada, retorna um status 404 com uma mensagem de erro.
// Se ocorrer um erro durante a busca, retorna um status 500 com uma mensagem de erro.

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Título é obrigatório" });
    const task = await createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};
// Controlador para a rota POST /tasks, que cria uma nova tarefa no banco de dados usando os dados fornecidos no corpo da requisição (title e description).
// Se o título não for fornecido, retorna um status 400 com uma mensagem de erro.
// Se a tarefa for criada com sucesso, retorna a tarefa criada como resposta em formato JSON com status 201.
// Se ocorrer um erro durante a criação, retorna um status 500 com uma mensagem de erro.

const update = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await updateTask(req.params.id, title, description, completed);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};
// Controlador para a rota PUT /tasks/:id, que atualiza uma tarefa existente no banco de dados usando
// o ID fornecido como parâmetro na URL e os dados fornecidos no corpo da requisição (title, description, completed).
// Se a tarefa for encontrada e atualizada com sucesso, retorna a tarefa atualizada como resposta em formato JSON.
// Se a tarefa não for encontrada, retorna um status 404 com uma mensagem de erro.
// Se ocorrer um erro durante a atualização, retorna um status 500 com uma mensagem de erro.

const remove = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
    await deleteTask(req.params.id);
    res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};
// Controlador para a rota DELETE /tasks/:id, que deleta uma tarefa do banco de dados usando o ID fornecido como parâmetro na URL.
// Se a tarefa for deletada com sucesso, retorna um status 204 sem conteúdo.
// Se ocorrer um erro durante a deleção, retorna um status 500 com uma mensagem de erro.

module.exports = {
  index,
  show,
  create,
  update,
  remove,
};
// Exporta os controladores para serem usados em outros arquivos, como as rotas das tarefas
