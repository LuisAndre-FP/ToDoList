import { useState } from "react";
import { login, register } from "../services/api";

function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = isLogin
        ? await login(email, password)
        : await register(email, password);

      if (data.error) {
        setError(data.error);
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        onLogin(data.user);
      } else {
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setError("Cadastro realizado! Faça login.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-sm border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? "Entrar" : "Criar conta"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />

          {error && (
            <p
              className={`text-sm text-center ${error.includes("realizado") ? "text-green-400" : "text-red-400"}`}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-3 transition-colors"
          >
            {loading ? "Aguarde..." : isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue-400 hover:text-blue-300 ml-1"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
