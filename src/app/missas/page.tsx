import type { Metadata } from "next";
import MassScheduleCard from "@/components/MassScheduleCard";
import SectionTitle from "@/components/SectionTitle";
import { horariosMissas, outrosHorarios } from "@/lib/data";

export const metadata: Metadata = {
	title: "Horários das Missas | Paróquia de Santana",
	description:
		"Confira os horários das missas e celebrações na Paróquia de Santana. Missas de domingo, dias de semana e horários especiais.",
};

export default function MissasPage() {
	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4">
				<SectionTitle
					title="Horários das Missas"
					subtitle="Venha celebrar conosco"
				/>

				{/* Grid de horários */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{horariosMissas.map((missa) => (
						<MassScheduleCard
							key={missa.dia}
							dia={missa.dia}
							horarios={missa.horarios}
							descricao={missa.descricao}
							destaque={missa.destaque}
						/>
					))}
				</div>

				{/* Outras atividades */}
				<div className="mt-16">
					<h3 className="text-2xl font-serif font-bold text-primary text-center mb-8">
						<span className="ornament">Outras Celebrações</span>
					</h3>
					<div className="section-divider mb-8" />

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						{/* Confissão */}
						<div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-secondary text-center">
							<div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-3xl">🙏</span>
							</div>
							<h4 className="text-lg font-serif font-bold text-primary mb-2">
								Confissão
							</h4>
							<p className="text-gray">{outrosHorarios.confissao}</p>
						</div>

						{/* Adoração */}
						<div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-primary text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-3xl">✝️</span>
							</div>
							<h4 className="text-lg font-serif font-bold text-primary mb-2">
								Adoração ao Santíssimo
							</h4>
							<p className="text-gray">{outrosHorarios.adoracao}</p>
						</div>

						{/* Secretaria */}
						<div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-secondary text-center">
							<div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-3xl">📋</span>
							</div>
							<h4 className="text-lg font-serif font-bold text-primary mb-2">
								Secretaria Paroquial
							</h4>
							<p className="text-gray">{outrosHorarios.secretaria}</p>
						</div>
					</div>
				</div>

				{/* Aviso */}
				<div className="mt-12 bg-secondary/10 rounded-xl p-6 border border-secondary/30 max-w-2xl mx-auto text-center">
					<p className="text-primary">
						<strong>Atenção:</strong> Em dias santos e festas especiais, os
						horários podem sofrer alterações. Acompanhe nossas redes sociais e a
						seção de notícias para ficar informado.
					</p>
				</div>
			</div>
		</div>
	);
}
