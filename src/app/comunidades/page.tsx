import type { Metadata } from "next";
import ComunidadeCard from "@/components/ComunidadeCard";
import SectionTitle from "@/components/SectionTitle";
import { comunidades } from "@/lib/data";

export const metadata: Metadata = {
	title: "Comunidades | Paróquia de Sant’Ana",
	description:
		"A Igreja Matriz de Sant’Ana, a Capela de Nossa Senhora de Fátima e as capelas das comunidades rurais de Campo Grande/RN.",
};

const naCidade = comunidades.filter((c) => c.zona === "urbana");
const naZonaRural = comunidades.filter((c) => c.zona === "rural");

export default function ComunidadesPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Igrejas e capelas"
				title="Comunidades"
				subtitle="A paróquia reúne a Igreja Matriz e as capelas da cidade e da zona rural de Campo Grande."
			/>

			<section>
				<h2 className="text-3xl text-ink">Na cidade</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
					{naCidade.map((comunidade) => (
						<ComunidadeCard key={comunidade.slug} comunidade={comunidade} />
					))}
				</div>
			</section>

			<section className="mt-20">
				<h2 className="text-3xl text-ink">Comunidades rurais</h2>
				{naZonaRural.length > 0 ? (
					<div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
						{naZonaRural.map((comunidade) => (
							<ComunidadeCard key={comunidade.slug} comunidade={comunidade} />
						))}
					</div>
				) : (
					<p className="mt-4 max-w-prose border-t border-line pt-6 text-muted">
						As capelas das comunidades rurais serão publicadas aqui em breve,
						com os horários das celebrações e como chegar.
					</p>
				)}
			</section>
		</div>
	);
}
