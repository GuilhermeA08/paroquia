import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import WeekSchedule from "@/components/WeekSchedule";
import { outrosHorarios } from "@/lib/data";

export const metadata: Metadata = {
	title: "Horários das Missas | Paróquia de Sant’Ana",
	description:
		"Confira os horários das missas e celebrações na Paróquia de Sant’Ana. Missas de domingo, dias de semana e horários especiais.",
};

const outrasCelebracoes = [
	{ titulo: "Confissão", texto: outrosHorarios.confissao },
	{ titulo: "Adoração ao Santíssimo", texto: outrosHorarios.adoracao },
	{ titulo: "Secretaria paroquial", texto: outrosHorarios.secretaria },
].filter((item) => item.texto);

export default function MissasPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Celebrações"
				title="Horários das missas"
				subtitle="Venha celebrar conosco na Igreja Matriz de Sant’Ana."
			/>

			<WeekSchedule />

			{/* Outras atividades */}
			{outrasCelebracoes.length > 0 && (
				<section className="mt-16">
					<h2 className="text-3xl text-ink">Outras celebrações</h2>
					<dl className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-3">
						{outrasCelebracoes.map((item) => (
							<div key={item.titulo} className="border-t border-line py-5">
								<dt className="font-serif text-xl text-ink">{item.titulo}</dt>
								<dd className="mt-1 text-muted">{item.texto}</dd>
							</div>
						))}
					</dl>
				</section>
			)}

			{/* Aviso */}
			<p className="mt-10 max-w-2xl border-l-2 border-accent pl-4 text-muted">
				<span className="font-semibold text-accent">Atenção.</span> Em dias
				santos e festas especiais os horários podem mudar. Acompanhe as redes
				sociais e os avisos paroquiais.
			</p>
		</div>
	);
}
