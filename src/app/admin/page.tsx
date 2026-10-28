import Link from "next/link";
import { apagarNoticia, sair } from "@/app/admin/acoes";
import BotaoApagar from "@/components/admin/BotaoApagar";
import { formatarData } from "@/components/NewsCard";
import { noticiasDoRepositorio } from "@/lib/admin/noticias";
import { exigirSessao } from "@/lib/admin/sessao";

interface PageProps {
	searchParams: Promise<{ salvo?: string; apagado?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
	await exigirSessao();
	const { salvo, apagado } = await searchParams;
	const noticias = await noticiasDoRepositorio();

	return (
		<div>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="eyebrow">Área da secretaria</p>
					<h1 className="mt-3 text-4xl text-ink">Notícias e avisos</h1>
				</div>
				<form action={sair}>
					<button
						type="submit"
						className="text-sm text-muted underline underline-offset-4 hover:text-ink"
					>
						Sair
					</button>
				</form>
			</div>

			{(salvo || apagado) && (
				<p
					role="status"
					className="mt-6 border border-line bg-tint p-4 text-sm text-ink"
				>
					{salvo ? "Notícia salva." : "Notícia apagada."} O site é atualizado em
					cerca de 1 minuto.
				</p>
			)}

			<Link
				href="/admin/nova"
				className="mt-8 inline-block bg-primary px-5 py-2.5 text-sm font-semibold text-paper hover:opacity-90"
			>
				Nova notícia
			</Link>

			<ul className="mt-8">
				{noticias.map((noticia) => (
					<li
						key={noticia.slug}
						className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-4"
					>
						<div className="min-w-0">
							<p className="eyebrow">{formatarData(noticia.data)}</p>
							<p className="mt-1 font-serif text-xl text-ink">
								{noticia.titulo}
							</p>
						</div>
						<div className="flex items-center gap-4 text-sm">
							<Link
								href={`/admin/editar/${noticia.slug}`}
								className="font-semibold text-primary underline decoration-gold underline-offset-4"
							>
								Editar
							</Link>
							<form action={apagarNoticia}>
								<input type="hidden" name="slug" value={noticia.slug} />
								<BotaoApagar titulo={noticia.titulo} />
							</form>
						</div>
					</li>
				))}
			</ul>

			{noticias.length === 0 && (
				<p className="border-t border-line py-8 text-muted">
					Nenhuma notícia cadastrada ainda.
				</p>
			)}
		</div>
	);
}
