"use client";

import Link from "next/link";
import { horariosMissas, paroquiaInfo } from "@/lib/data";
import { proximaMissa, tempoLiturgico } from "@/lib/liturgia";
import { useAgora } from "@/lib/useAgora";

export default function ProximaMissa() {
	const agora = useAgora();
	const missa = agora ? proximaMissa(agora) : null;
	const tempo = agora ? tempoLiturgico(agora) : null;

	return (
		<aside className="rounded-sm border border-line bg-surface p-6 shadow-[0_1px_0_var(--line),0_12px_32px_-20px_rgb(0_0_0/0.25)] sm:p-8">
			<p className="rubrica">Próxima missa</p>

			<div className="mt-5 min-h-[7.5rem]">
				{missa ? (
					<>
						<p className="text-lg text-muted">{missa.quando}</p>
						<p className="hora font-serif text-7xl leading-none text-ink">
							{missa.horario}
						</p>
						<p className="mt-2 text-muted">{missa.descricao}</p>
					</>
				) : (
					<>
						<p className="text-lg text-muted">Domingo</p>
						<p className="hora font-serif text-4xl leading-tight text-ink">
							{horariosMissas[0].horarios.join(" · ")}
						</p>
					</>
				)}
			</div>

			<dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
				<div className="flex justify-between gap-4">
					<dt className="text-muted">Local</dt>
					<dd className="text-right text-ink">{paroquiaInfo.endereco.rua}</dd>
				</div>
				{tempo && (
					<div className="flex justify-between gap-4">
						<dt className="text-muted">Tempo litúrgico</dt>
						<dd className="flex items-center gap-2 text-ink">
							<span
								className="h-2.5 w-2.5 rounded-full ring-1 ring-line"
								style={{ background: tempo.cor }}
								aria-hidden="true"
							/>
							{tempo.nome}
						</dd>
					</div>
				)}
			</dl>

			<Link
				href="/localizacao"
				className="mt-6 inline-flex text-sm font-semibold text-verde underline decoration-ouro underline-offset-4 hover:decoration-2"
			>
				Como chegar
			</Link>
		</aside>
	);
}
