import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    try {
      const tokenFicticio = "token_de_teste_123456";
      login(tokenFicticio);
      navigate("/", { replace: true });
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Entrar</h1>

        <div className="flex flex-col gap-4">
          <label htmlFor="login-email" className="sr-only">
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            autoComplete="email"
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-destaque"
            required
          />

          <label htmlFor="login-password" className="sr-only">
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            autoComplete="current-password"
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-destaque"
            required
          />

          {erro && (
            <p role="alert" className="text-red-700 text-sm">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="bg-destaque text-white rounded-lg px-4 py-2 font-semibold"
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
