import type { Metadata } from "next";
import PixDonation from "@/components/PixDonation";
import SectionTitle from "@/components/SectionTitle";
import { dadosPix } from "@/lib/data";

export const metadata: Metadata = {
	title: "Doações | Paróquia de Santana",
	description:
		"Contribua com a Paróquia de Santana. Faça sua doação via Pix de forma rápida e segura.",
};

export default function DoacoesPage() {
	return (
		<div className="py-16 bg-cream min-h-screen">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle
					title="Faça sua Doação"
					subtitle="Sua contribuição ajuda a manter nossa missão"
				/>

				<PixDonation
					chave={dadosPix.chave}
					tipoChave={dadosPix.tipoChave}
					nomeBeneficiario={dadosPix.nomeBeneficiario}
					qrCodeImagem={dadosPix.qrCodeImagem}
				/>

				{/* Transparência */}
				<div className="max-w-2xl mx-auto mt-12">
					<div className="bg-white rounded-xl p-8 shadow-md">
						<h3 className="text-xl font-serif font-bold text-primary mb-4 text-center">
							Transparência
						</h3>
						<p className="text-gray text-center mb-6">
							Sua doação é utilizada para:
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
									<span>🏛️</span>
								</div>
								<p className="text-sm text-gray">
									Manutenção da estrutura física da igreja
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
									<span>📚</span>
								</div>
								<p className="text-sm text-gray">
									Materiais para catequese e formação
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
									<span>🤝</span>
								</div>
								<p className="text-sm text-gray">
									Obras de caridade e assistência social
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
									<span>⛪</span>
								</div>
								<p className="text-sm text-gray">
									Celebrações e festas litúrgicas
								</p>
							</div>
						</div>
						<p className="text-xs text-gray text-center mt-6 border-t pt-4">
							Prestação de contas disponível mensalmente no mural da paróquia
						</p>
					</div>
				</div>

				{/* Outras formas de contribuir */}
				<div className="max-w-2xl mx-auto mt-8">
					<div className="bg-primary/5 rounded-xl p-6 border border-primary/10 text-center">
						<h4 className="font-bold text-primary mb-2">
							Outras Formas de Contribuir
						</h4>
						<p className="text-sm text-gray">
							Você também pode contribuir presencialmente durante as missas ou
							na secretaria paroquial. Aceitamos dinheiro, cartões de débito e
							crédito.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
