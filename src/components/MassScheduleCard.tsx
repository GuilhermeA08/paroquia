interface MassScheduleCardProps {
	dia: string;
	horarios: string[];
	descricao: string;
	destaque: boolean;
}

export default function MassScheduleCard({
	dia,
	horarios,
	descricao,
	destaque,
}: MassScheduleCardProps) {
	return (
		<div
			className={`rounded-lg p-6 transition-all hover:shadow-lg ${
				destaque
					? "bg-primary text-white border-2 border-secondary"
					: "bg-white border border-gray-light"
			}`}
		>
			<h3
				className={`text-xl font-serif font-bold mb-2 ${
					destaque ? "text-secondary" : "text-primary"
				}`}
			>
				{dia}
			</h3>
			<p className={`text-sm mb-4 ${destaque ? "text-white/80" : "text-gray"}`}>
				{descricao}
			</p>
			<div className="flex flex-wrap gap-2">
				{horarios.map((horario) => (
					<span
						key={horario}
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							destaque
								? "bg-secondary text-primary-dark"
								: "bg-cream text-primary"
						}`}
					>
						{horario}
					</span>
				))}
			</div>
		</div>
	);
}
