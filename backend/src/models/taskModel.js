const pool = require("../config/db");
// Importa o pool de conexões com o banco de dados para poder usar nas funções abaixo

const getAllTasks = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM task WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
  // Executa uma consulta SQL para selecionar todas as tarefas da tabela "task" e ordená-las por data de criação em ordem decrescente.
  // O resultado é retornado como um array de objetos, onde cada objeto representa uma tarefa.
};
// Função para buscar todas as tarefas no banco de dados, ordenando por data de criação em ordem decrescente (as mais recentes primeiro)

const getTaskById = async (id, userId) => {
  const result = await pool.query("SELECT * FROM task WHERE id = $1 AND user_id = $2", [id, userId]);
  return result.rows[0]; // pega só o primeiro do array
  // Executa uma consulta SQL para selecionar uma tarefa específica da tabela "task" usando o ID da tarefa como parâmetro.
  // O resultado é retornado como um objeto, representando a tarefa encontrada. Se nenhuma tarefa for encontrada com o ID fornecido, o resultado será undefined.
};
// Função para buscar uma tarefa específica no banco de dados, usando o ID da tarefa como parâmetro.

const createTask = async (title, description, userId) => {
  const result = await pool.query(
    "INSERT INTO task (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId],
  );
  return result.rows[0];
};
// Função para criar uma nova tarefa no banco de dados, inserindo o título e a descrição fornecidos como parâmetros.

const updateTask = async (id, title, description, completed, userId) => {
  const result = await pool.query(
    "UPDATE task SET title = $1, description = $2, completed = $3, updated_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING *",
    [title, description, completed, id, userId],
  );
  return result.rows[0];
};
// Função para atualizar uma tarefa existente no banco de dados,
// usando o ID da tarefa como parâmetro para identificar qual tarefa deve ser atualizada.
// Os novos valores para o título, descrição e status de conclusão são passados como parâmetros,
// e a data de atualização é definida como a data e hora atuais usando a função NOW() do PostgreSQL.

const deleteTask = async (id, userId) => {
  await pool.query("DELETE FROM task WHERE id = $1 AND user_id = $2", [id, userId]);
};
// Função para deletar uma tarefa do banco de dados,
// usando o ID da tarefa como parâmetro para identificar qual tarefa deve ser deletada.
// A função não retorna nenhum valor, apenas executa a consulta SQL para remover a tarefa do banco de dados.

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
// Exporta as funções para serem usadas em outros arquivos, como o controller das tarefas
