"use client";

import { useAgora } from "@/lib/useAgora";
import { tempoLiturgico } from "@/lib/liturgia";

export default function TempoLiturgicoChip() {
	const agora = useAgora();

	if (!agora) {
		return <span className="opacity-0">Tempo litúrgico</span>;
	}

	const tempo = tempoLiturgico(agora);

	return (
		<span className="inline-flex items-center gap-2">
			<span
				className="h-2.5 w-2.5 rounded-full ring-1 ring-line"
				style={{ background: tempo.cor }}
				aria-hidden="true"
			/>
			<span>
				{tempo.nome} · cor litúrgica {tempo.corNome}
			</span>
		</span>
	);
}
