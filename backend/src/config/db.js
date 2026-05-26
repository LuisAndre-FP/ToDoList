const { Pool } = require("pg");
//  Seria tipo uma piscina de conexões com o banco de dados,
//  onde a gente pode pegar uma conexão quando precisar e depois devolver para a piscina quando terminar,
//  ao invés de abrir e fechar uma conexão toda vez que precisar acessar o banco de dados.
//  Isso ajuda a melhorar o desempenho da aplicação, porque abrir e fechar conexões pode ser um processo demorado.

require("dotenv").config();
// Lê e coloca as variaveis de ambiente disponíveis para o processo

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
// Cria uma nova piscina de conexões com as configurações do banco de dados definidas nas variáveis de ambiente

module.exports = db;
// Exporta o pool para ser usado em outros arquivos
