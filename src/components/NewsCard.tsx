import Link from "next/link";

interface NewsCardProps {
	slug: string;
	titulo: string;
	resumo: string;
	data: string;
	destaque?: boolean;
}

export function formatarData(data: string) {
	return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

export default function NewsCard({
	slug,
	titulo,
	resumo,
	data,
	destaque = false,
}: NewsCardProps) {
	return (
		<article className="group relative border-t border-line py-6">
			<time dateTime={data} className="eyebrow">
				{formatarData(data)}
			</time>
			<h3
				className={`mt-2 text-ink transition-colors group-hover:text-primary ${
					destaque ? "text-3xl sm:text-4xl" : "text-2xl"
				}`}
			>
				<Link
					href={`/noticias/${slug}`}
					className="after:absolute after:inset-0"
				>
					{titulo}
				</Link>
			</h3>
			<p className={`mt-2 text-muted ${destaque ? "text-lg" : "line-clamp-2"}`}>
				{resumo}
			</p>
			<span className="mt-3 inline-block text-sm font-semibold text-primary">
				Ler aviso
				<span
					aria-hidden="true"
					className="ml-1 inline-block transition-transform group-hover:translate-x-1"
				>
					→
				</span>
			</span>
		</article>
	);
}
