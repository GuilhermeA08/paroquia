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
}: DownloadCardProps) {
	return (
		<div className="bg-white rounded-lg border border-gray-light p-6 hover:shadow-lg transition-all group">
			{/* Preview */}
			<div className="aspect-square bg-cream rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-light transition-colors">
				<div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold font-serif">
					PS
				</div>
			</div>

			{/* Info */}
			<h3 className="text-lg font-medium text-primary mb-2">{nome}</h3>
			<div className="flex items-center gap-2 text-sm text-gray mb-4">
				<span className="px-2 py-1 bg-cream rounded">{formato}</span>
				<span>{tamanho}</span>
			</div>

			{/* Download Button */}
			<Link
				href={arquivo}
				download
				className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
			>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
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
	);
}
