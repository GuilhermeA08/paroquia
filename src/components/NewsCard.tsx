import Link from "next/link";

interface NewsCardProps {
	slug: string;
	titulo: string;
	resumo: string;
	data: string;
}

export default function NewsCard({
	slug,
	titulo,
	resumo,
	data,
}: NewsCardProps) {
	const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return (
		<article className="bg-white rounded-lg border border-gray-light overflow-hidden hover:shadow-lg transition-all group">
			{/* Imagem Placeholder */}
			<div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
				<span className="text-6xl">⛪</span>
			</div>

			{/* Conteúdo */}
			<div className="p-6">
				<time className="text-sm text-secondary font-medium">
					{dataFormatada}
				</time>
				<h3 className="text-xl font-serif font-bold text-primary mt-2 mb-3 group-hover:text-secondary transition-colors">
					{titulo}
				</h3>
				<p className="text-gray text-sm mb-4 line-clamp-2">{resumo}</p>
				<Link
					href={`/noticias/${slug}`}
					className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors"
				>
					Ler mais
					<svg
						className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</Link>
			</div>
		</article>
	);
}
