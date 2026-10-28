import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import SectionTitle from "@/components/SectionTitle";
import { listarNoticias } from "@/lib/noticias";

export const metadata: Metadata = {
	title: "Notícias | Paróquia de Sant’Ana",
	description:
		"Acompanhe as últimas notícias, eventos e avisos da Paróquia de Sant’Ana.",
};

export default function NoticiasPage() {
	const noticias = listarNoticias();

	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Avisos paroquiais"
				title="Notícias e avisos"
				subtitle="Fique por dentro das novidades da comunidade."
			/>

			<div className="max-w-3xl">
				{noticias.map((noticia) => (
					<NewsCard
						key={noticia.slug}
						slug={noticia.slug}
						titulo={noticia.titulo}
						resumo={noticia.resumo}
						data={noticia.data}
					/>
				))}
			</div>

			{/* Se não houver notícias */}
			{noticias.length === 0 && (
				<div className="border-t border-line py-12">
					<h2 className="text-2xl text-ink">Nenhum aviso no momento</h2>
					<p className="mt-2 text-muted">
						Volte em breve para conferir as novidades da comunidade.
					</p>
				</div>
			)}
		</div>
	);
}
