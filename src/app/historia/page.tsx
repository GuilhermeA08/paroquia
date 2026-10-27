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
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Desde 1900"
				title={historia.titulo}
				subtitle={historia.subtitulo}
			/>

			{/* Linha do tempo */}
			<ol className="max-w-4xl">
				{historia.conteudo.map((item) => (
					<li
						key={item.ano}
						className="grid grid-cols-1 gap-2 border-t border-line py-8 sm:grid-cols-[11rem_1fr] sm:gap-8"
					>
						<p className="hora font-serif text-4xl leading-none text-rubrica">
							{item.ano}
						</p>
						<div className="min-w-0">
							<h2 className="text-2xl text-ink">{item.titulo}</h2>
							<p className="mt-2 max-w-prose leading-relaxed text-muted">
								{item.texto}
							</p>
						</div>
					</li>
				))}
			</ol>

			{/* Padroeira */}
			<section className="mt-16 grid grid-cols-1 gap-8 border-t-2 border-ink pt-10 lg:grid-cols-[1fr_2fr]">
				<div>
					<p className="rubrica">Festa em 26 de julho</p>
					<h2 className="mt-3 text-4xl text-ink">
						Sant&apos;Ana, nossa padroeira
					</h2>
				</div>
				<div className="max-w-prose space-y-4 font-serif text-xl leading-relaxed text-ink">
					<p className="capitular">
						Santa Ana é a mãe de Maria, a Mãe de Jesus, e avó de Nosso Senhor
						Jesus Cristo. Seu nome, de origem hebraica, significa
						&quot;graça&quot; ou &quot;cheia de graça&quot;.
					</p>
					<p>
						Segundo a tradição cristã, Ana e seu esposo Joaquim viveram por
						muito tempo sem filhos, o que era considerado uma grande provação na
						cultura judaica. Porém, sua fé e perseverança foram recompensadas
						com o nascimento de Maria, que viria a ser a Mãe do Salvador.
					</p>
					<p>
						Santa Ana é a padroeira das mães, das viúvas, dos mineiros e de
						muitas cidades ao redor do mundo. Sua festa é celebrada no dia 26 de
						julho, juntamente com São Joaquim.
					</p>
				</div>
			</section>
		</div>
	);
}
