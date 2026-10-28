import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { fotosPadres, historia, padres } from "@/lib/data";

export const metadata: Metadata = {
	title: "História | Paróquia de Sant’Ana",
	description:
		"A história da Paróquia de Sant’Ana de Campo Grande/RN, criada em 1837, e a relação dos padres que a conduziram.",
};

export default function HistoriaPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Paróquia desde 1837"
				title={historia.titulo}
				subtitle={historia.subtitulo}
			/>

			<p className="capitular mb-12 max-w-3xl font-serif text-xl leading-relaxed text-ink sm:text-2xl">
				{historia.introducao}
			</p>

			{/* Linha do tempo */}
			<ol className="max-w-4xl">
				{historia.conteudo.map((item) => (
					<li
						key={item.ano}
						className="grid grid-cols-1 gap-2 border-t border-line py-8 sm:grid-cols-[11rem_1fr] sm:gap-8"
					>
						<p className="hora font-serif text-4xl leading-none text-accent">
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

			{/* Padres */}
			<section className="mt-16 border-t-2 border-ink pt-10">
				<p className="eyebrow">Desde 1837</p>
				<h2 className="mt-3 text-4xl text-ink">Os padres da paróquia</h2>
				<p className="mt-3 max-w-prose text-muted">
					Vigários, párocos e padres que serviram à comunidade de Sant’Ana ao
					longo de quase dois séculos.
				</p>

				<ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
					{fotosPadres.map((padre) => (
						<li key={padre.foto}>
							<Image
								src={padre.foto}
								alt={padre.nome}
								width={480}
								height={600}
								sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
								className="aspect-[4/5] w-full bg-tint object-cover"
							/>
							<p className="mt-3 font-serif text-lg leading-snug text-ink">
								{padre.nome}
							</p>
							<p className="hora text-sm text-muted">{padre.periodo}</p>
						</li>
					))}
				</ul>

				<h3 className="mt-16 text-2xl text-ink">Relação completa</h3>
				<ol className="mt-4 gap-x-12 lg:columns-2">
					{padres.map((item, i) => (
						<li
							// Há anos repetidos na lista, então o índice entra na chave
							key={`${item.periodo}-${i}`}
							className="grid break-inside-avoid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-2.5"
						>
							<span className="hora text-sm text-accent">{item.periodo}</span>
							<span className="min-w-0 text-ink">{item.nomes}</span>
						</li>
					))}
				</ol>
			</section>

			{/* Padroeira */}
			<section className="mt-16 grid grid-cols-1 gap-8 border-t-2 border-ink pt-10 lg:grid-cols-[1fr_2fr]">
				<div>
					<p className="eyebrow">Festa em 26 de julho</p>
					<h2 className="mt-3 text-4xl text-ink">Sant’Ana, nossa padroeira</h2>
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
