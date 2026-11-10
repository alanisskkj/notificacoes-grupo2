function NotificationCard({
    id,
    canal,
    hora,
    titulo,
    texto,
    lida,
    onMarcarComoLida,
    onExcluir,
    carregando,
}) {
    return (
        <article className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-500 mb-2">
                <span className="bg-teal-50 text-marca px-2 py-0.5 rounded">{canal}</span>
                <span>{hora}</span>
                {!lida && <span>não lida</span>}
            </div>
            <h3 className="font-semibold text-base mb-1">{titulo}</h3>
            <p className="text-gray-600 text-sm">{texto}</p>
            <div className="flex gap-3 mt-4">
                {!lida && (
                    <button
                        type="button"
                        onClick={() => onMarcarComoLida(id)}
                        disabled={carregando}
                        className="text-sm font-semibold text-marca disabled:opacity-60"
                    >
                        Marcar como lida
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => onExcluir(id)}
                    disabled={carregando}
                    className="text-sm font-semibold text-red-700 disabled:opacity-60"
                >
                    Excluir
                </button>
            </div>
        </article>
    );
}
export default NotificationCard;