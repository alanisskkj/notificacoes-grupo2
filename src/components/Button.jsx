// src/components/Button.jsx
function Button({ children, variant = "primario", onClick, type = "button", disabled = false }) {
    const estilos = {
        primario: "bg-marca text-white",
        destaque: "bg-destaque text-white",
    };
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg font-semibold disabled:opacity-60 ${estilos[variant]}`}
        >
            {children}
        </button>
    );
}
export default Button;