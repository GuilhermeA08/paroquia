import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { historia } from "@/lib/data";

export const metadata: Metadata = {
	title: "História | Paróquia de Santana",
	description:
		"Conheça a história da Paróquia de Santana, uma trajetória de fé e tradição que atravessa gerações.",
};

export default function HistoriaPage() {
	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle title={historia.titulo} subtitle={historia.subtitulo} />

				{/* Timeline */}
				<div className="max-w-4xl mx-auto">
					<div className="relative">
						{/* Linha vertical */}
						<div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary" />

						{historia.conteudo.map((item, index) => (
							<div
								key={item.ano}
								className={`relative flex items-center mb-12 ${
									index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
								}`}
							>
								{/* Marcador */}
								<div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-cream z-10" />

								{/* Conteúdo */}
								<div
									className={`ml-10 md:ml-0 md:w-1/2 ${
										index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
									}`}
								>
									<div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-secondary">
										<span className="inline-block px-3 py-1 bg-primary text-white text-sm font-bold rounded-full mb-3">
											{item.ano}
										</span>
										<h3 className="text-xl font-serif font-bold text-primary mb-2">
											{item.titulo}
										</h3>
										<p className="text-gray leading-relaxed">{item.texto}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Seção adicional */}
				<div className="max-w-4xl mx-auto mt-16">
					<div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
						<h3 className="text-2xl font-serif font-bold text-primary mb-4 text-center">
							Santa Ana - Nossa Padroeira
						</h3>
						<div className="text-gray leading-relaxed space-y-4">
							<p>
								Santa Ana é a mãe de Maria, a Mãe de Jesus, e avó de Nosso
								Senhor Jesus Cristo. Seu nome, de origem hebraica, significa
								&quot;graça&quot; ou &quot;cheia de graça&quot;.
							</p>
							<p>
								Segundo a tradição cristã, Ana e seu esposo Joaquim viveram por
								muito tempo sem filhos, o que era considerado uma grande
								provação na cultura judaica. Porém, sua fé e perseverança foram
								recompensadas com o nascimento de Maria, que viria a ser a Mãe
								do Salvador.
							</p>
							<p>
								Santa Ana é a padroeira das mães, das viúvas, dos mineiros e de
								muitas cidades ao redor do mundo. Sua festa é celebrada no dia
								26 de julho, juntamente com São Joaquim.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
