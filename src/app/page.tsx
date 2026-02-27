import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { horariosMissas, noticias, paroquiaInfo } from "@/lib/data";

export default function Home() {
	const missaDomingo = horariosMissas.find((m) => m.dia === "Domingo");
	const ultimasNoticias = noticias.slice(0, 3);

	return (
		<div>
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary min-h-[70vh] flex items-center">
				<div className="absolute inset-0 bg-[url('/images/hero/church-bg.jpg')] bg-cover bg-center opacity-20" />
				<div className="relative max-w-7xl mx-auto px-4 py-20 text-center text-white">
					<div className="inline-block mb-6">
						<span className="text-secondary text-sm font-medium tracking-widest uppercase">
							Bem-vindo à
						</span>
					</div>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
						{paroquiaInfo.nome}
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
						Uma comunidade de fé, esperança e amor ao próximo
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/missas"
							className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-light transition-colors"
						>
							Horários das Missas
						</Link>
						<Link
							href="/historia"
							className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-colors"
						>
							Conheça Nossa História
						</Link>
					</div>
				</div>
			</section>

			{/* Próxima Missa */}
			<section className="bg-secondary py-4">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col md:flex-row items-center justify-center gap-4 text-primary-dark">
						<span className="font-medium">⛪ Próximas Missas de Domingo:</span>
						<div className="flex flex-wrap gap-2">
							{missaDomingo?.horarios.map((horario) => (
								<span
									key={horario}
									className="bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium"
								>
									{horario}
								</span>
							))}
						</div>
						<Link
							href="/missas"
							className="text-primary-dark font-medium hover:underline"
						>
							Ver todos →
						</Link>
					</div>
				</div>
			</section>

			{/* Cards de Acesso Rápido */}
			<section className="py-20 bg-cream">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
							<span className="ornament">Explore Nossa Paróquia</span>
						</h2>
						<div className="section-divider" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Card História */}
						<Link
							href="/historia"
							className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-secondary"
						>
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-serif font-bold text-primary mb-2">
								Nossa História
							</h3>
							<p className="text-gray">
								Conheça a trajetória de fé da nossa comunidade ao longo dos
								anos.
							</p>
						</Link>

						{/* Card Localização */}
						<Link
							href="/localizacao"
							className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-secondary"
						>
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-serif font-bold text-primary mb-2">
								Localização
							</h3>
							<p className="text-gray">
								Encontre-nos facilmente com mapa e instruções de como chegar.
							</p>
						</Link>

						{/* Card Missas */}
						<Link
							href="/missas"
							className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-secondary"
						>
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-serif font-bold text-primary mb-2">
								Horários das Missas
							</h3>
							<p className="text-gray">
								Confira os horários de todas as celebrações da semana.
							</p>
						</Link>

						{/* Card Galeria */}
						<Link
							href="/galeria"
							className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-secondary"
						>
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-serif font-bold text-primary mb-2">
								Galeria de Fotos
							</h3>
							<p className="text-gray">
								Veja fotos da nossa igreja, celebrações e eventos.
							</p>
						</Link>

						{/* Card Downloads */}
						<Link
							href="/downloads"
							className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-secondary"
						>
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
								<svg
									className="w-8 h-8"
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
							</div>
							<h3 className="text-xl font-serif font-bold text-primary mb-2">
								Downloads
							</h3>
							<p className="text-gray">
								Baixe logos e materiais oficiais da paróquia.
							</p>
						</Link>

						{/* Card Doações */}
						<Link
							href="/doacoes"
							className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-secondary"
						>
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-serif font-bold text-primary mb-2">
								Doações
							</h3>
							<p className="text-gray">Contribua com nossa paróquia via Pix.</p>
						</Link>
					</div>
				</div>
			</section>

			{/* Últimas Notícias */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
							<span className="ornament">Últimas Notícias</span>
						</h2>
						<div className="section-divider" />
						<p className="text-gray mt-4">
							Fique por dentro das novidades da nossa comunidade
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{ultimasNoticias.map((noticia) => (
							<NewsCard
								key={noticia.id}
								slug={noticia.slug}
								titulo={noticia.titulo}
								resumo={noticia.resumo}
								data={noticia.data}
							/>
						))}
					</div>

					<div className="text-center mt-10">
						<Link
							href="/noticias"
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
						>
							Ver Todas as Notícias
							<svg
								className="w-4 h-4"
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
				</div>
			</section>

			{/* CTA Doações */}
			<section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
						Ajude Nossa Paróquia
					</h2>
					<p className="text-white/80 text-lg mb-8">
						Sua contribuição é fundamental para mantermos nossa missão
						evangelizadora e os serviços de caridade à comunidade.
					</p>
					<Link
						href="/doacoes"
						className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary-dark font-bold rounded-lg hover:bg-secondary-light transition-colors"
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
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						Fazer uma Doação
					</Link>
				</div>
			</section>
		</div>
	);
}
