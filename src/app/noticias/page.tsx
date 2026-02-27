import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import SectionTitle from "@/components/SectionTitle";
import { noticias } from "@/lib/data";

export const metadata: Metadata = {
	title: "Notícias | Paróquia de Santana",
	description:
		"Acompanhe as últimas notícias, eventos e avisos da Paróquia de Santana.",
};

export default function NoticiasPage() {
	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle
					title="Notícias e Avisos"
					subtitle="Fique por dentro das novidades da nossa comunidade"
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{noticias.map((noticia) => (
						<NewsCard
							key={noticia.id}
							slug={noticia.slug}
							titulo={noticia.titulo}
							resumo={noticia.resumo}
							data={noticia.data}
						/>
					))}
				</div>

				{/* Se não houver notícias */}
				{noticias.length === 0 && (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-3xl">📰</span>
						</div>
						<h3 className="text-xl font-serif font-bold text-primary mb-2">
							Nenhuma notícia no momento
						</h3>
						<p className="text-gray">
							Volte em breve para conferir as novidades da nossa comunidade.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
