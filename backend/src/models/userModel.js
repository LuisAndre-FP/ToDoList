const pool = require("../config/db");

const createUser = async (email, password) => {
  // insre um novo usuário no banco de dados
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, password],
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  // busca um usuário pelo email
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail };
