import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import NotificationList from "../components/NotificationList";
import NovaNotificacaoForm from "../components/NovaNotificacaoForm";
import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("todas");
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [criando, setCriando] = useState(false);
  const [acaoId, setAcaoId] = useState(null);

  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        if (!API_URL) throw new Error("Configure VITE_API_URL no arquivo .env.local");

        const resposta = await fetch(`${API_URL}/notificacoes`);

        if (!resposta.ok) {
          throw new Error("Erro ao buscar notificações");
        }

        const dados = await resposta.json();
        const lista = Array.isArray(dados) ? dados : dados?.notificacoes;
        setNotificacoes(Array.isArray(lista) ? lista : []);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarNotificacoes();
  }, []);

  const notificacoesVisiveis = useMemo(() => {
    return notificacoes.filter((n) => {
      if (filtro === "todas") return true;
      if (filtro === "naoLidas") return !n.lida;
      if (filtro === "push") return n.canal === "PUSH";
      if (filtro === "email") return n.canal === "EMAIL";
      return true;
    });
  }, [filtro, notificacoes]);

  async function adicionarNotificacao(novaNotificacao) {
    setErro("");
    setCriando(true);

    try {
      const resposta = await fetch(`${API_URL}/notificacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          canal: novaNotificacao.canal,
          titulo: novaNotificacao.titulo,
          texto: novaNotificacao.texto,
          lida: false,
        }),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || dados.erro || "Não foi possível criar a notificação");
      }

      const criada = dados.notificacao || dados;
      setNotificacoes((atual) => [
        {
          ...novaNotificacao,
          ...(criada && typeof criada === "object" ? criada : {}),
          id: criada?.id ?? Date.now(),
          lida: false,
        },
        ...atual,
      ]);
      return true;
    } catch (e) {
      setErro(e.message);
      return false;
    } finally {
      setCriando(false);
    }
  }

  async function marcarComoLida(id) {
    setErro("");
    setAcaoId(id);

    try {
      const resposta = await fetch(`${API_URL}/notificacoes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lida: true }),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || dados.erro || "Não foi possível marcar como lida");
      }

      setNotificacoes((atual) =>
        atual.map((notificacao) =>
          notificacao.id === id ? { ...notificacao, lida: true } : notificacao
        )
      );
    } catch (e) {
      setErro(e.message);
    } finally {
      setAcaoId(null);
    }
  }

  async function excluirNotificacao(id) {
    setErro("");
    setAcaoId(id);

    try {
      const resposta = await fetch(`${API_URL}/notificacoes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(dados.message || dados.erro || "Não foi possível excluir a notificação");
      }

      setNotificacoes((atual) => atual.filter((notificacao) => notificacao.id !== id));
    } catch (e) {
      setErro(e.message);
    } finally {
      setAcaoId(null);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <header className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Sessão autenticada</p>
          <h1 className="text-2xl font-bold">Central de Notificações</h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-slate-800 text-white rounded-lg px-4 py-2 font-medium"
        >
          Sair
        </button>
      </header>

      <NovaNotificacaoForm onAdicionar={adicionarNotificacao} carregando={criando} />
      <FilterBar filtroAtual={filtro} onFiltroChange={setFiltro} />

      <section aria-label="Lista de notificações" aria-live="polite" aria-busy={carregando}>
        {carregando && <p className="text-gray-700">Carregando notificações...</p>}

        {erro && (
          <p role="alert" className="mb-4 text-red-800 bg-red-50 border border-red-300 rounded-lg p-3">
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <NotificationList
            notificacoes={notificacoesVisiveis}
            onMarcarComoLida={marcarComoLida}
            onExcluir={excluirNotificacao}
            acaoId={acaoId}
          />
        )}
      </section>
    </main>
  );
}

export default Home;
