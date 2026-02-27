import type { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";
import SectionTitle from "@/components/SectionTitle";
import { galeriaFotos } from "@/lib/data";

export const metadata: Metadata = {
	title: "Galeria de Fotos | Paróquia de Santana",
	description:
		"Veja fotos da Paróquia de Santana, nossas celebrações, eventos e momentos especiais da comunidade.",
};

export default function GaleriaPage() {
	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle
					title="Galeria de Fotos"
					subtitle="Momentos especiais da nossa comunidade"
				/>

				<PhotoGallery fotos={galeriaFotos} />

				{/* Contribua */}
				<div className="mt-16 bg-secondary/10 rounded-xl p-8 border border-secondary/30 text-center max-w-2xl mx-auto">
					<h3 className="text-xl font-serif font-bold text-primary mb-2">
						Contribua com a Galeria
					</h3>
					<p className="text-gray mb-4">
						Tem fotos de eventos ou celebrações da paróquia? Envie para nós e
						ajude a preservar a memória da nossa comunidade.
					</p>
					<p className="text-sm text-gray">
						Envie suas fotos para:{" "}
						<strong className="text-primary">
							fotos@paroquiasantana.com.br
						</strong>
					</p>
				</div>
			</div>
		</div>
	);
}
