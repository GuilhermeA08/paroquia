import type { Metadata } from "next";
import DownloadCard from "@/components/DownloadCard";
import SectionTitle from "@/components/SectionTitle";
import { logosDownload } from "@/lib/data";

export const metadata: Metadata = {
	title: "Downloads | Paróquia de Santana",
	description:
		"Baixe logos e materiais oficiais da Paróquia de Santana em diferentes formatos.",
};

export default function DownloadsPage() {
	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle
					title="Downloads"
					subtitle="Baixe logos e materiais oficiais da paróquia"
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
				<div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10">
					<h3 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
						Diretrizes de Uso
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						<div className="bg-white rounded-lg p-6">
							<h4 className="font-bold text-primary mb-3 flex items-center gap-2">
								<span className="text-green-500">✓</span> Uso Permitido
							</h4>
							<ul className="space-y-2 text-gray text-sm">
								<li>• Materiais de divulgação de eventos paroquiais</li>
								<li>• Publicações em redes sociais da paróquia</li>
								<li>• Cartazes e folhetos de atividades</li>
								<li>• Documentos oficiais da comunidade</li>
							</ul>
						</div>
						<div className="bg-white rounded-lg p-6">
							<h4 className="font-bold text-primary mb-3 flex items-center gap-2">
								<span className="text-red-500">✗</span> Uso Não Permitido
							</h4>
							<ul className="space-y-2 text-gray text-sm">
								<li>• Fins comerciais sem autorização</li>
								<li>• Modificação do logo ou cores oficiais</li>
								<li>• Uso em materiais não relacionados à paróquia</li>
								<li>• Reprodução em baixa qualidade que descaracterize</li>
							</ul>
						</div>
					</div>
					<p className="text-center text-sm text-gray mt-6">
						Em caso de dúvidas sobre o uso dos materiais, entre em contato com a
						secretaria paroquial.
					</p>
				</div>
			</div>
		</div>
	);
}
