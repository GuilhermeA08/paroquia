import { horariosMissas } from "@/lib/data";

// Semana de missas em colunas, como um ordo: domingo e vigília destacados
export default function WeekSchedule() {
	return (
		<ol className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-7">
			{horariosMissas.map((missa) => (
				<li
					key={missa.dia}
					className={`flex items-baseline justify-between gap-4 border-b border-line px-1 py-4 lg:flex-col lg:justify-start lg:gap-3 lg:border-r lg:px-4 lg:py-6 lg:last:border-r-0 ${
						missa.destaque ? "bg-tint" : ""
					}`}
				>
					<div>
						<p className="font-serif text-xl text-ink">
							{missa.dia.replace("-feira", "")}
						</p>
						<p
							className={`text-sm ${missa.destaque ? "text-rubrica" : "text-muted"}`}
						>
							{missa.descricao}
						</p>
					</div>
					<ul className="hora flex flex-wrap justify-end gap-x-3 gap-y-1 text-lg font-semibold text-verde lg:flex-col lg:justify-start">
						{missa.horarios.map((horario) => (
							<li key={horario}>{horario}</li>
						))}
					</ul>
				</li>
			))}
		</ol>
	);
}
