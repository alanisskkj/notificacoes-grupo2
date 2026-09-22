import NotificationCard from "./NotificationCard";
function NotificationList({ notificacoesVisiveis }) {
    if (notificacoesVisiveis.length === 0) {
        return (
            <p className="text-gray-500 text-sm">Nenhuma notificação por aqui.</p>
        );
    }
    return (
        <div>
            {notificacoesVisiveis.map((n) => (
                <NotificationCard key={n.id} {...n} />
            ))}
        </div>
    );
}
export default NotificationList;