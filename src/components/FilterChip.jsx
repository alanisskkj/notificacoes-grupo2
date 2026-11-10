// src/components/FilterChip.jsx
function FilterChip({ label, ativo, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={ativo}
            className={`px-3 py-1.5 rounded-full text-sm border ${ativo
                    ? "bg-marca text-white border-marca"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
        >
            {label}
        </button>
    );
}
export default FilterChip;