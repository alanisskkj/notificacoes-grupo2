import { useState } from "react";
import Button from "./Button";
function NovaNotificacaoForm({ onAdicionar, carregando = false }) {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [canal, setCanal] = useState("PUSH");
  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    const resultado = onAdicionar({
      id: Date.now(),
      canal,
      hora: new Date().toLocaleTimeString().slice(0, 5),
      titulo,
      texto,
      lida: false,
    });
    Promise.resolve(resultado).then((salvo) => {
      if (!salvo) return;
      setTitulo("");
      setTexto("");
    });
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <label htmlFor="notification-title" className="sr-only">
        Título da notificação
      </label>
      <input
        id="notification-title"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título da notificação"
        className="border border-gray-200 rounded-lg px-3 py-2"
        required
      />
      <label htmlFor="notification-text" className="sr-only">
        Texto da notificação
      </label>
      <textarea
        id="notification-text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto"
        className="border border-gray-200 rounded-lg px-3 py-2"
      />
      <label htmlFor="notification-channel" className="sr-only">
        Canal da notificação
      </label>
      <select
        id="notification-channel"
        value={canal}
        onChange={(e) => setCanal(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2"
      >
        <option value="PUSH">Push</option>
        <option value="EMAIL">E-mail</option>
      </select>
      <Button variant="destaque" type="submit" disabled={carregando}>
        {carregando ? "Salvando..." : "Adicionar notificação"}
      </Button>
    </form>
  );
}

export default NovaNotificacaoForm;