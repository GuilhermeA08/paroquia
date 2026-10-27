"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menuItems, paroquiaInfo } from "@/lib/data";
import TempoLiturgicoChip from "@/components/TempoLiturgicoChip";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
			{/* Faixa superior */}
			<div className="bg-band text-on-band-muted">
				<div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4 text-xs sm:px-6">
					<TempoLiturgicoChip />
					<span className="hidden sm:inline">
						{paroquiaInfo.endereco.rua} · {paroquiaInfo.endereco.bairro}
					</span>
				</div>
			</div>

			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex h-18 items-center justify-between gap-6">
					{/* Logo e Nome */}
					<Link href="/" className="group flex items-center gap-3">
						<span className="flex h-11 w-11 items-center justify-center rounded-full border border-ouro font-serif text-2xl text-verde">
							S
						</span>
						<span className="leading-tight">
							<span className="block font-serif text-xl text-ink group-hover:text-verde">
								{paroquiaInfo.nome}
							</span>
							<span className="block text-xs text-muted">
								Diocese de Sua Cidade
							</span>
						</span>
					</Link>

					{/* Menu Desktop */}
					<nav className="hidden items-center gap-1 lg:flex">
						{menuItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive(item.href) ? "page" : undefined}
								className={`border-b-2 px-2.5 py-2 text-sm transition-colors ${
									isActive(item.href)
										? "border-rubrica text-ink"
										: "border-transparent text-muted hover:text-ink"
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Botão Menu Mobile */}
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="rounded-md p-2 text-ink hover:bg-tint lg:hidden"
						aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
						aria-expanded={isMenuOpen}
					>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4 7h16M4 12h16M4 17h16"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Menu Mobile */}
				{isMenuOpen && (
					<nav className="border-t border-line py-3 lg:hidden">
						<ul className="flex flex-col">
							{menuItems.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										onClick={() => setIsMenuOpen(false)}
										aria-current={isActive(item.href) ? "page" : undefined}
										className={`flex items-center justify-between py-3 font-serif text-lg ${
											isActive(item.href) ? "text-rubrica" : "text-ink"
										}`}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
}
