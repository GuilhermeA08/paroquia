import Image from "next/image";
import type { Comunidade } from "@/lib/data";

// Uma igreja ou capela; o que ainda não foi informado simplesmente não aparece
export default function ComunidadeCard({
	comunidade,
}: {
	comunidade: Comunidade;
}) {
	const { slug, nome, localidade, padroeiro, festa, foto, mapa, historico } =
		comunidade;

	const detalhes = [
		["Padroeiro", padroeiro],
		["Festa", festa],
	].filter((item): item is [string, string] => Boolean(item[1]));

	return (
		<article id={slug} className="scroll-mt-32 border-t border-line pt-6">
			<div className="relative aspect-[4/3] overflow-hidden bg-tint">
				{foto ? (
					<Image
						src={foto}
						alt={`Foto da ${nome}`}
						fill
						sizes="(min-width: 768px) 50vw, 100vw"
						className="object-cover"
					/>
				) : (
					<div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
						<span
							className="font-serif text-5xl text-accent"
							aria-hidden="true"
						>
							✠
						</span>
						<span className="text-sm">Foto em breve</span>
					</div>
				)}
			</div>

			{localidade && <p className="eyebrow mt-5">{localidade}</p>}
			<h3 className="mt-2 text-3xl text-ink">{nome}</h3>

			{detalhes.length > 0 && (
				<dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
					{detalhes.map(([rotulo, valor]) => (
						<div key={rotulo}>
							<dt className="text-muted">{rotulo}</dt>
							<dd className="text-ink">{valor}</dd>
						</div>
					))}
				</dl>
			)}

			{comunidade.missas.length > 0 && (
				<div className="mt-4">
					<p className="text-sm text-muted">Missas</p>
					<ul className="mt-1 space-y-1 text-ink">
						{comunidade.missas.map((missa) => (
							<li key={`${missa.dia}-${missa.horarios.join()}`}>
								{missa.dia}:{" "}
								<span className="hora font-semibold text-primary">
									{missa.horarios.join(" e ")}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{historico && (
				<p className="mt-4 max-w-prose leading-relaxed text-muted">
					{historico}
				</p>
			)}

			{mapa && (
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapa)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-5 inline-flex text-sm font-semibold text-primary underline decoration-gold underline-offset-4"
				>
					Como chegar
				</a>
			)}
		</article>
	);
}
