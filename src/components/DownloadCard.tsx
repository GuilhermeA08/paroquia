import Link from "next/link";

interface DownloadCardProps {
	nome: string;
	arquivo: string;
	formato: string;
	tamanho: string;
	preview: string;
}

// Fundo da prévia conforme a variante do logo
function estiloPrevia(nome: string) {
	if (nome.includes("Branco")) return "bg-band text-on-band";
	if (nome.includes("Preto")) return "bg-surface text-ink";
	return "bg-tint text-verde";
}

export default function DownloadCard({
	nome,
	arquivo,
	formato,
	tamanho,
}: DownloadCardProps) {
	return (
		<div className="flex flex-col border border-line bg-surface">
			{/* Preview */}
			<div
				className={`flex aspect-square items-center justify-center border-b border-line ${estiloPrevia(nome)}`}
			>
				<span className="flex h-24 w-24 items-center justify-center rounded-full border border-current font-serif text-5xl">
					S
				</span>
			</div>

			{/* Info */}
			<div className="flex flex-1 flex-col p-5">
				<h3 className="text-xl text-ink">{nome}</h3>
				<p className="mt-1 text-sm text-muted">
					<span className="font-semibold text-rubrica">{formato}</span> ·{" "}
					{tamanho}
				</p>

				<Link
					href={arquivo}
					download
					className="mt-5 inline-flex items-center justify-center gap-2 border border-verde px-4 py-2 text-sm font-semibold text-verde transition-colors hover:bg-verde hover:text-paper"
				>
					<svg
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/>
					</svg>
					Baixar
				</Link>
			</div>
		</div>
	);
}
