import NotificationCard from "./NotificationCard";

function NotificationList({ notificacoes, onMarcarComoLida, onExcluir, acaoId }) {
    if (!notificacoes || notificacoes.length === 0) {
        return (
            <p className="text-gray-500 text-sm">Nenhuma notificação por aqui.</p>
        );
    }

    return (
        <div>
            {notificacoes.map((n) => (
                <NotificationCard
                    key={n.id}
                    {...n}
                    onMarcarComoLida={onMarcarComoLida}
                    onExcluir={onExcluir}
                    carregando={acaoId === n.id}
                />
            ))}
        </div>
    );
}

export default NotificationList;
