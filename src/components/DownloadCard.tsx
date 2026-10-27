import Image from "next/image";
import Link from "next/link";

interface DownloadCardProps {
	nome: string;
	arquivo: string;
	formato: string;
	tamanho: string;
	preview: string;
}

export default function DownloadCard({
	nome,
	arquivo,
	formato,
	tamanho,
	preview,
}: DownloadCardProps) {
	return (
		<div className="flex flex-col border border-line bg-surface">
			{/* Preview */}
			<div className="relative aspect-square border-b border-line bg-tint">
				<Image
					src={preview}
					alt={nome}
					fill
					sizes="(min-width: 640px) 360px, 100vw"
					className="object-contain p-8"
				/>
			</div>

			{/* Info */}
			<div className="flex flex-1 flex-col p-5">
				<h3 className="text-xl text-ink">{nome}</h3>
				<p className="mt-1 text-sm text-muted">
					<span className="font-semibold text-accent">{formato}</span> ·{" "}
					{tamanho}
				</p>

				<Link
					href={arquivo}
					download
					className="mt-5 inline-flex items-center justify-center gap-2 border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-paper"
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
