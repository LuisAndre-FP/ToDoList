const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // frontend manda o token no cabeçalho Authorization, no formato "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ error: "Token de autenticação ausente" });
  }

  const token = authHeader.split(" ")[1]; // Extrai o token do cabeçalho (formato "Bearer <token>")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica o token usando a chave secreta
    req.userId = decoded.id; // Armazena as informações do usuário decodificadas na requisição para uso posterior
    next(); // Continua para a próxima função de middleware ou rota
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido" });
  }
};

module.exports = authMiddleware;
