import type { Metadata } from "next";
import DownloadCard from "@/components/DownloadCard";
import SectionTitle from "@/components/SectionTitle";
import { logosDownload } from "@/lib/data";

export const metadata: Metadata = {
	title: "Downloads | Paróquia de Santana",
	description:
		"Baixe logos e materiais oficiais da Paróquia de Santana em diferentes formatos.",
};

const permitido = [
	"Materiais de divulgação de eventos paroquiais",
	"Publicações em redes sociais da paróquia",
	"Cartazes e folhetos de atividades",
	"Documentos oficiais da comunidade",
];

const naoPermitido = [
	"Fins comerciais sem autorização",
	"Modificação do logo ou das cores oficiais",
	"Uso em materiais não relacionados à paróquia",
	"Reprodução em baixa qualidade que descaracterize o logo",
];

export default function DownloadsPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Identidade visual"
				title="Downloads"
				subtitle="Logos e materiais oficiais da paróquia."
			/>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{logosDownload.map((logo) => (
					<DownloadCard
						key={logo.id}
						nome={logo.nome}
						arquivo={logo.arquivo}
						formato={logo.formato}
						tamanho={logo.tamanho}
						preview={logo.preview}
					/>
				))}
			</div>

			{/* Instruções de uso */}
			<section className="mt-16">
				<h2 className="text-3xl text-ink">Diretrizes de uso</h2>
				<div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
					<div>
						<h3 className="text-xl text-verde">Uso permitido</h3>
						<ul className="mt-3">
							{permitido.map((item) => (
								<li
									key={item}
									className="border-t border-line py-2.5 text-muted"
								>
									{item}
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="text-xl text-rubrica">Uso não permitido</h3>
						<ul className="mt-3">
							{naoPermitido.map((item) => (
								<li
									key={item}
									className="border-t border-line py-2.5 text-muted"
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
				<p className="mt-6 text-sm text-muted">
					Em caso de dúvidas sobre o uso dos materiais, fale com a secretaria
					paroquial.
				</p>
			</section>
		</div>
	);
}
