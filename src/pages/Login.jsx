// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
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
            const resposta = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            if (!resposta.ok) throw new Error("Credenciais inválidas");
            const { token } = await resposta.json();
            login(token);
            navigate("/");
        } catch (e) {
            setErro(e.message);
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto p-4 flex flex-col gap-2"
        >
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="border border-gray-200 rounded-lg px-3 py-2"

            />
            <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="border border-gray-200 rounded-lg px-3 py-2"
            />
            {erro && <p className="text-red-600 text-sm">{erro}</p>}
            <button className="bg-marca text-white rounded-lg px-4 py-2 font-semibold">
                Entrar
            </button>
        </form>
    );
}
export default Login;