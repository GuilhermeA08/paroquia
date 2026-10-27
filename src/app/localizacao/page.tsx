import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { outrosHorarios, paroquiaInfo } from "@/lib/data";

export const metadata: Metadata = {
	title: "Localização | Paróquia de Santana",
	description: `Encontre a Paróquia de Santana. Endereço: ${paroquiaInfo.endereco.rua}, ${paroquiaInfo.endereco.bairro}, ${paroquiaInfo.endereco.cidade}.`,
};

const comoChegar = [
	{
		titulo: "De ônibus",
		texto:
			"Consulte o terminal mais próximo para saber as linhas que passam perto da igreja.",
	},
	{
		titulo: "De carro",
		texto:
			"Estacionamento disponível na rua. Aos domingos há vagas reservadas para idosos e gestantes.",
	},
	{
		titulo: "A pé",
		texto:
			"Fácil acesso pelo centro da cidade. Siga as placas indicativas para a Igreja de Santana.",
	},
];

export default function LocalizacaoPage() {
	const { endereco } = paroquiaInfo;

	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Visite-nos"
				title="Localização"
				subtitle="Encontre a igreja e faça-nos uma visita."
			/>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
				{/* Mapa */}
				<div className="order-2 min-h-[380px] overflow-hidden border border-line bg-tint lg:order-1">
					{/* Placeholder para o mapa - substitua src pelo embed real do Google Maps */}
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976844847747!2d-46.6522202!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjkiUyA0NsKwMzknMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
						width="100%"
						height="100%"
						style={{ border: 0, minHeight: 380 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Localização da Paróquia de Santana"
					/>
				</div>

				{/* Informações */}
				<dl className="order-1 lg:order-2">
					<div className="border-t border-line py-5">
						<dt className="rubrica">Endereço</dt>
						<dd className="mt-2 font-serif text-2xl leading-snug text-ink">
							{endereco.rua}
							<br />
							{endereco.bairro}, {endereco.cidade} – {endereco.estado}
						</dd>
						<dd className="hora mt-1 text-sm text-muted">CEP {endereco.cep}</dd>
					</div>
					<div className="border-t border-line py-5">
						<dt className="rubrica">Telefone</dt>
						<dd className="mt-2">
							<a
								href={`tel:${paroquiaInfo.telefone.replace(/\D/g, "")}`}
								className="hora text-lg text-ink hover:text-verde"
							>
								{paroquiaInfo.telefone}
							</a>
						</dd>
					</div>
					<div className="border-t border-line py-5">
						<dt className="rubrica">E-mail</dt>
						<dd className="mt-2 break-all">
							<a
								href={`mailto:${paroquiaInfo.email}`}
								className="text-lg text-ink hover:text-verde"
							>
								{paroquiaInfo.email}
							</a>
						</dd>
					</div>
					<div className="border-y border-line py-5">
						<dt className="rubrica">Secretaria</dt>
						<dd className="mt-2 text-lg text-ink">{outrosHorarios.secretaria}</dd>
					</div>
				</dl>
			</div>

			{/* Como Chegar */}
			<section className="mt-16">
				<h2 className="text-3xl text-ink">Como chegar</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-3">
					{comoChegar.map((item) => (
						<div key={item.titulo} className="border-t border-line py-5">
							<h3 className="text-xl text-ink">{item.titulo}</h3>
							<p className="mt-1 text-muted">{item.texto}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
