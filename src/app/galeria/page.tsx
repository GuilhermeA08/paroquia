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
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Memória da comunidade"
				title="Galeria de fotos"
				subtitle="A igreja, as celebrações e os momentos especiais da paróquia."
			/>

			<PhotoGallery fotos={galeriaFotos} />

			{/* Contribua */}
			<section className="mt-16 border-t border-line pt-8">
				<h2 className="text-2xl text-ink">Contribua com a galeria</h2>
				<p className="mt-2 max-w-prose text-muted">
					Tem fotos de eventos ou celebrações da paróquia? Envie para{" "}
					<strong className="font-semibold text-ink">
						fotos@paroquiasantana.com.br
					</strong>{" "}
					e ajude a preservar a memória da comunidade.
				</p>
			</section>
		</div>
	);
}
