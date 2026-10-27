import Link from "next/link";
import { horariosMissas, menuItems, paroquiaInfo } from "@/lib/data";

const redes = [
	{
		label: "Facebook",
		href: paroquiaInfo.redesSociais.facebook,
		path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
	},
	{
		label: "Instagram",
		href: paroquiaInfo.redesSociais.instagram,
		path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.898-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413a3.71 3.71 0 01-1.38-.898 3.71 3.71 0 01-.898-1.38c-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.422-.164 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.261 2.15.558 2.913a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.763.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.15-.261 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.763.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.261-2.15-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63C19.098.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
	},
	{
		label: "YouTube",
		href: paroquiaInfo.redesSociais.youtube,
		path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
	},
];

export default function Footer() {
	const missaDomingo = horariosMissas.find((m) => m.dia === "Domingo");

	return (
		<footer className="bg-band-deep text-on-band-muted">
			<div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
					{/* Sobre */}
					<div className="min-w-0">
						<p className="font-serif text-2xl text-on-band">{paroquiaInfo.nome}</p>
						<p className="mt-3 max-w-xs text-sm leading-relaxed">
							Comunidade católica dedicada à oração, aos sacramentos e ao
							serviço ao próximo, sob a proteção de Sant&apos;Ana.
						</p>
						<div className="mt-5 flex gap-4">
							{redes.map((rede) => (
								<a
									key={rede.label}
									href={rede.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={rede.label}
									className="transition-colors hover:text-on-band"
								>
									<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
										<path d={rede.path} />
									</svg>
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-ouro">
							Páginas
						</p>
						<ul className="mt-4 space-y-2 text-sm">
							{menuItems.slice(1).map((item) => (
								<li key={item.href}>
									<Link href={item.href} className="hover:text-on-band">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Horários */}
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-ouro">
							Missas de domingo
						</p>
						{missaDomingo && (
							<p className="hora mt-4 font-serif text-2xl text-on-band">
								{missaDomingo.horarios.join(" · ")}
							</p>
						)}
						<Link
							href="/missas"
							className="mt-3 inline-block text-sm underline decoration-ouro/60 underline-offset-4 hover:text-on-band"
						>
							Todos os horários
						</Link>
					</div>

					{/* Contato */}
					<div className="min-w-0">
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-ouro">
							Contato
						</p>
						<address className="mt-4 space-y-1 text-sm not-italic">
							<p>
								{paroquiaInfo.endereco.rua}, {paroquiaInfo.endereco.bairro}
							</p>
							<p>
								{paroquiaInfo.endereco.cidade} – {paroquiaInfo.endereco.estado}
							</p>
							<p className="pt-2">{paroquiaInfo.telefone}</p>
							<p className="break-all">{paroquiaInfo.email}</p>
						</address>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-3 border-t border-on-band/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {new Date().getFullYear()} {paroquiaInfo.nome}
					</p>
					<p className="font-serif text-sm italic">
						“Ide por todo o mundo e pregai o Evangelho a toda criatura.” Mc 16,15
					</p>
				</div>
			</div>
		</footer>
	);
}
