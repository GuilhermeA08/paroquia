import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import ProximaMissa from "@/components/ProximaMissa";
import WeekSchedule from "@/components/WeekSchedule";
import { outrosHorarios, paroquiaInfo } from "@/lib/data";
import { listarNoticias } from "@/lib/noticias";

const indice = [
	{
		href: "/historia",
		titulo: "Nossa história",
		texto: "Da capela de 1766 à paróquia de hoje",
	},
	{
		href: "/localizacao",
		titulo: "Localização",
		texto: "Endereço, mapa e como chegar",
	},
	{
		href: "/galeria",
		titulo: "Galeria de fotos",
		texto: "A igreja, as celebrações e os eventos",
	},
	{
		href: "/downloads",
		titulo: "Downloads",
		texto: "Brasão e materiais oficiais",
	},
	{
		href: "/doacoes",
		titulo: "Doações",
		texto: "Contribua pelo Pix",
	},
];

export default function Home() {
	const [principal, ...outras] = listarNoticias().slice(0, 3);
	const outros = [
		["Confissão", outrosHorarios.confissao],
		["Adoração ao Santíssimo", outrosHorarios.adoracao],
		["Secretaria", outrosHorarios.secretaria],
	].filter((item): item is [string, string] => Boolean(item[1]));

	return (
		<div>
			{/* Abertura */}
			<section className="relative isolate overflow-hidden border-b border-line bg-[#062f52]">
				<Image
					src="/images/igreja/matriz-fachada.jpg"
					alt=""
					fill
					priority
					sizes="100vw"
					className="-z-20 object-cover object-[62%_center] lg:object-[center_45%]"
				/>
				{/* Escurece a foto para o texto branco ficar legível */}
				<div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_47_82/0.78),rgb(6_47_82/0.92))] lg:bg-[linear-gradient(90deg,#062f52_30%,rgb(6_47_82/0.7)_50%,rgb(6_47_82/0.2))]" />
				<div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 md:py-24 lg:grid-cols-[1.35fr_1fr]">
					<div className="min-w-0">
						<Image
							src="/logos/brasao-paroquia-web.png"
							alt="Brasão da Paróquia de Sant’Ana de Campo Grande"
							width={304}
							height={512}
							priority
							className="mb-8 h-40 w-auto"
						/>
						<p className="eyebrow !text-gold">
							{paroquiaInfo.endereco.cidade}/{paroquiaInfo.endereco.estado} ·
							desde {paroquiaInfo.fundacao}
						</p>
						<h1 className="mt-5 text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
							Paróquia de <em className="text-gold">Sant’Ana</em>
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
							Uma comunidade de fé, esperança e amor ao próximo em{" "}
							{paroquiaInfo.endereco.cidade}. As portas estão abertas para você.
						</p>
						<div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
							<Link
								href="/missas"
								className="bg-gold px-6 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
							>
								Horários das missas
							</Link>
							<Link
								href="/historia"
								className="font-semibold text-white underline decoration-gold underline-offset-[6px] hover:text-gold"
							>
								Conheça nossa história
							</Link>
						</div>
					</div>

					<ProximaMissa />
				</div>
			</section>

			{/* Semana */}
			<section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
				<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="eyebrow">Celebrações</p>
						<h2 className="mt-3 text-3xl text-ink sm:text-4xl">
							Horários das missas
						</h2>
					</div>
					<Link
						href="/missas"
						className="text-sm font-semibold text-primary underline decoration-gold underline-offset-4"
					>
						Ver todos os horários
					</Link>
				</div>

				<WeekSchedule />

				{outros.length > 0 && (
					<dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
						{outros.map(([titulo, texto]) => (
							<div key={titulo}>
								<dt className="font-semibold text-ink">{titulo}</dt>
								<dd className="mt-1 text-muted">{texto}</dd>
							</div>
						))}
					</dl>
				)}
			</section>

			{/* Avisos */}
			<section className="border-y border-line bg-surface">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
					<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
						<div>
							<p className="eyebrow">Avisos paroquiais</p>
							<h2 className="mt-3 text-3xl text-ink sm:text-4xl">
								Últimas notícias
							</h2>
						</div>
						<Link
							href="/noticias"
							className="text-sm font-semibold text-primary underline decoration-gold underline-offset-4"
						>
							Todos os avisos
						</Link>
					</div>

					<div className="grid grid-cols-1 gap-x-12 lg:grid-cols-[1.3fr_1fr]">
						{principal && (
							<NewsCard
								slug={principal.slug}
								titulo={principal.titulo}
								resumo={principal.resumo}
								data={principal.data}
								destaque
							/>
						)}
						<div>
							{outras.map((noticia) => (
								<NewsCard
									key={noticia.slug}
									slug={noticia.slug}
									titulo={noticia.titulo}
									resumo={noticia.resumo}
									data={noticia.data}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Índice */}
			<section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
				<p className="eyebrow">Índice</p>
				<h2 className="mt-3 mb-8 text-3xl text-ink sm:text-4xl">
					Conheça a paróquia
				</h2>
				<ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
					{indice.map((item) => (
						<li key={item.href} className="border-t border-line">
							<Link
								href={item.href}
								className="group flex items-baseline gap-3 py-4"
							>
								<span className="min-w-0">
									<span className="block font-serif text-2xl text-ink group-hover:text-primary">
										{item.titulo}
									</span>
									<span className="block text-sm text-muted">{item.texto}</span>
								</span>
								<span className="pontilhado" aria-hidden="true" />
								<span
									className="text-accent transition-transform group-hover:translate-x-1"
									aria-hidden="true"
								>
									→
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			{/* Doações */}
			<section className="bg-tint text-ink">
				<div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_auto]">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
							Dízimo e ofertas
						</p>
						<p className="mt-4 max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
							“Deus ama quem dá com alegria.”
						</p>
						<p className="mt-3 max-w-xl text-muted">
							Sua contribuição mantém a igreja, a catequese e as obras de
							caridade da comunidade.
						</p>
					</div>
					<Link
						href="/doacoes"
						className="justify-self-start bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 md:justify-self-end"
					>
						Contribuir pelo Pix
					</Link>
				</div>
			</section>
		</div>
	);
}
