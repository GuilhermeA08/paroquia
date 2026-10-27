import type { Metadata } from "next";
import PixDonation from "@/components/PixDonation";
import SectionTitle from "@/components/SectionTitle";
import { dadosPix } from "@/lib/data";

export const metadata: Metadata = {
	title: "Doações | Paróquia de Santana",
	description:
		"Contribua com a Paróquia de Santana. Faça sua doação via Pix de forma rápida e segura.",
};

const destinos = [
	"Manutenção da estrutura física da igreja",
	"Materiais para catequese e formação",
	"Obras de caridade e assistência social",
	"Celebrações e festas litúrgicas",
];

export default function DoacoesPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Dízimo e ofertas"
				title="Faça sua doação"
				subtitle="Sua contribuição ajuda a manter a missão da paróquia."
			/>

			<PixDonation
				chave={dadosPix.chave}
				tipoChave={dadosPix.tipoChave}
				nomeBeneficiario={dadosPix.nomeBeneficiario}
				qrCodeImagem={dadosPix.qrCodeImagem}
			/>

			<div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
				{/* Transparência */}
				<section>
					<h2 className="text-3xl text-ink">Para onde vai sua doação</h2>
					<ul className="mt-6">
						{destinos.map((destino) => (
							<li
								key={destino}
								className="flex gap-3 border-t border-line py-3 text-ink"
							>
								<span className="text-rubrica" aria-hidden="true">
									✠
								</span>
								{destino}
							</li>
						))}
					</ul>
					<p className="mt-4 text-sm text-muted">
						A prestação de contas é publicada todo mês no mural da paróquia.
					</p>
				</section>

				{/* Outras formas de contribuir */}
				<section>
					<h2 className="text-3xl text-ink">Outras formas de contribuir</h2>
					<p className="mt-6 max-w-prose leading-relaxed text-muted">
						Você também pode contribuir presencialmente durante as missas ou na
						secretaria paroquial. Aceitamos dinheiro e cartões de débito e
						crédito.
					</p>
				</section>
			</div>
		</div>
	);
}
