import FilterChip from "./FilterChip";
function FilterBar({ filtroAtual, onFiltroChange }) {
	return (
		<div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar notificações">
			<FilterChip
				label="Todas"
				ativo={filtroAtual === "todas"}
				onClick={() => onFiltroChange("todas")}
			/>
			<FilterChip
				label="Não lidas"
				ativo={filtroAtual === "naoLidas"}
				onClick={() => onFiltroChange("naoLidas")}
			/>
			<FilterChip
				label="Push"
				ativo={filtroAtual === "push"}
				onClick={() => onFiltroChange("push")}
			/>
			<FilterChip
				label="E-mail"
				ativo={filtroAtual === "email"}
				onClick={() => onFiltroChange("email")}
			/>
		</div>
	);
}
export default FilterBar;