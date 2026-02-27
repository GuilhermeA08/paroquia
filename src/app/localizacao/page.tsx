import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { outrosHorarios, paroquiaInfo } from "@/lib/data";

export const metadata: Metadata = {
	title: "Localização | Paróquia de Santana",
	description: `Encontre a Paróquia de Santana. Endereço: ${paroquiaInfo.endereco.rua}, ${paroquiaInfo.endereco.bairro}, ${paroquiaInfo.endereco.cidade}.`,
};

export default function LocalizacaoPage() {
	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle
					title="Localização"
					subtitle="Encontre-nos e faça-nos uma visita"
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Mapa */}
					<div className="order-2 lg:order-1">
						<div className="bg-gray-light rounded-xl overflow-hidden h-[400px] lg:h-full min-h-[400px]">
							{/* Placeholder para o mapa - substitua src pelo embed real do Google Maps */}
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976844847747!2d-46.6522202!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjkiUyA0NsKwMzknMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Localização da Paróquia de Santana"
								className="grayscale hover:grayscale-0 transition-all duration-300"
							/>
						</div>
					</div>

					{/* Informações */}
					<div className="order-1 lg:order-2 space-y-6">
						{/* Endereço */}
						<div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
									<svg
										className="w-6 h-6 text-primary"
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
								<div>
									<h3 className="text-lg font-serif font-bold text-primary mb-2">
										Endereço
									</h3>
									<p className="text-gray">
										{paroquiaInfo.endereco.rua}
										<br />
										{paroquiaInfo.endereco.bairro}
										<br />
										{paroquiaInfo.endereco.cidade} -{" "}
										{paroquiaInfo.endereco.estado}
										<br />
										CEP: {paroquiaInfo.endereco.cep}
									</p>
								</div>
							</div>
						</div>

						{/* Telefone */}
						<div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-secondary">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
									<svg
										className="w-6 h-6 text-secondary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-lg font-serif font-bold text-primary mb-2">
										Telefone
									</h3>
									<a
										href={`tel:${paroquiaInfo.telefone.replace(/\D/g, "")}`}
										className="text-gray hover:text-primary transition-colors"
									>
										{paroquiaInfo.telefone}
									</a>
								</div>
							</div>
						</div>

						{/* Email */}
						<div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
									<svg
										className="w-6 h-6 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-lg font-serif font-bold text-primary mb-2">
										E-mail
									</h3>
									<a
										href={`mailto:${paroquiaInfo.email}`}
										className="text-gray hover:text-primary transition-colors"
									>
										{paroquiaInfo.email}
									</a>
								</div>
							</div>
						</div>

						{/* Horário da Secretaria */}
						<div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-secondary">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
									<svg
										className="w-6 h-6 text-secondary"
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
								<div>
									<h3 className="text-lg font-serif font-bold text-primary mb-2">
										Horário da Secretaria
									</h3>
									<p className="text-gray">{outrosHorarios.secretaria}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Como Chegar */}
				<div className="mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/10">
					<h3 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
						Como Chegar
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-white text-xl">🚌</span>
							</div>
							<h4 className="font-bold text-primary mb-2">De Ônibus</h4>
							<p className="text-gray text-sm">
								Linhas que passam próximas: consulte o terminal mais próximo
								para informações atualizadas.
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-white text-xl">🚗</span>
							</div>
							<h4 className="font-bold text-primary mb-2">De Carro</h4>
							<p className="text-gray text-sm">
								Estacionamento disponível na rua. Aos domingos, há vagas
								reservadas para idosos e gestantes.
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-white text-xl">🚶</span>
							</div>
							<h4 className="font-bold text-primary mb-2">A Pé</h4>
							<p className="text-gray text-sm">
								Fácil acesso pelo centro da cidade. Siga as placas indicativas
								para a Igreja de Santana.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
