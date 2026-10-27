import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { outrosHorarios, paroquiaInfo } from "@/lib/data";

export const metadata: Metadata = {
	title: "Localização | Paróquia de Sant’Ana",
	description: `Encontre a Paróquia de Sant’Ana: ${paroquiaInfo.endereco.rua}, ${paroquiaInfo.endereco.cidade}/${paroquiaInfo.endereco.estado}.`,
};

const consultaMapa = encodeURIComponent(paroquiaInfo.plusCode);

export default function LocalizacaoPage() {
	const { endereco, telefone, email, igreja, paroco } = paroquiaInfo;

	return (
		<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
			<SectionTitle
				as="h1"
				eyebrow="Visite-nos"
				title="Localização"
				subtitle={`A Igreja Matriz de Sant’Ana fica em ${endereco.cidade}, no Rio Grande do Norte.`}
			/>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
				{/* Mapa */}
				<div className="order-2 min-h-[380px] overflow-hidden border border-line bg-tint lg:order-1">
					<iframe
						src={`https://www.google.com/maps?q=${consultaMapa}&z=17&output=embed`}
						width="100%"
						height="100%"
						style={{ border: 0, minHeight: 380 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Mapa da Igreja Matriz de Sant’Ana"
					/>
				</div>

				{/* Informações */}
				<dl className="order-1 lg:order-2">
					<div className="border-t border-line py-5">
						<dt className="eyebrow">Endereço</dt>
						<dd className="mt-2 font-serif text-2xl leading-snug text-ink">
							{igreja}
						</dd>
						<dd className="mt-1 text-lg text-ink">
							{endereco.rua}, {endereco.bairro}
							<br />
							{endereco.cidade} – {endereco.estado}
						</dd>
						<dd className="hora mt-1 text-sm text-muted">CEP {endereco.cep}</dd>
						<dd className="mt-4">
							<a
								href={`https://www.google.com/maps/search/?api=1&query=${consultaMapa}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-semibold text-primary underline decoration-gold underline-offset-4"
							>
								Abrir no Google Maps
							</a>
						</dd>
					</div>
					{paroco && (
						<div className="border-t border-line py-5">
							<dt className="eyebrow">Pároco</dt>
							<dd className="mt-2 text-lg text-ink">{paroco}</dd>
						</div>
					)}
					{telefone && (
						<div className="border-t border-line py-5">
							<dt className="eyebrow">Telefone</dt>
							<dd className="mt-2">
								<a
									href={`tel:${telefone.replace(/\D/g, "")}`}
									className="hora text-lg text-ink hover:text-primary"
								>
									{telefone}
								</a>
							</dd>
						</div>
					)}
					{email && (
						<div className="border-t border-line py-5">
							<dt className="eyebrow">E-mail</dt>
							<dd className="mt-2 break-all">
								<a
									href={`mailto:${email}`}
									className="text-lg text-ink hover:text-primary"
								>
									{email}
								</a>
							</dd>
						</div>
					)}
					{outrosHorarios.secretaria && (
						<div className="border-t border-line py-5">
							<dt className="eyebrow">Secretaria</dt>
							<dd className="mt-2 text-lg text-ink">
								{outrosHorarios.secretaria}
							</dd>
						</div>
					)}
				</dl>
			</div>
		</div>
	);
}
