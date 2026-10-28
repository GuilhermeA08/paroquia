import { horariosMissas, type Missa } from "@/lib/data";
import { rotuloRecorrencia } from "@/lib/liturgia";

// Celebrações fixas de uma igreja, uma por coluna; a missa dominical em destaque
export default function WeekSchedule({
	missas = horariosMissas,
}: {
	missas?: Missa[];
}) {
	return (
		<ol className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
			{missas.map((missa) => (
				<li
					key={missa.dia}
					className={`flex flex-col gap-4 p-6 sm:p-8 ${
						missa.destaque ? "bg-tint" : "bg-paper"
					}`}
				>
					<div>
						<p className="eyebrow">{rotuloRecorrencia(missa.recorrencia)}</p>
						<p className="mt-2 font-serif text-3xl text-ink">{missa.dia}</p>
						<p className="mt-1 text-muted">{missa.descricao}</p>
					</div>
					<ul className="hora mt-auto flex flex-wrap gap-x-6 gap-y-1 font-serif text-5xl text-primary">
						{missa.horarios.map((horario) => (
							<li key={horario}>{horario}</li>
						))}
					</ul>
				</li>
			))}
		</ol>
	);
}
