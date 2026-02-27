"use client";

import Link from "next/link";
import { useState } from "react";
import { menuItems, paroquiaInfo } from "@/lib/data";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="bg-primary text-white shadow-lg sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-20">
					{/* Logo e Nome */}
					<Link href="/" className="flex items-center space-x-3 group">
						<div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
							PS
						</div>
						<div>
							<h1 className="text-xl font-serif font-bold group-hover:text-secondary transition-colors">
								{paroquiaInfo.nome}
							</h1>
							<p className="text-xs text-white/70">Diocese de Sua Cidade</p>
						</div>
					</Link>

					{/* Menu Desktop */}
					<nav className="hidden lg:flex items-center space-x-1">
						{menuItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="px-4 py-2 text-sm font-medium hover:bg-primary-dark hover:text-secondary rounded-md transition-colors"
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Botão Menu Mobile */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="lg:hidden p-2 rounded-md hover:bg-primary-dark transition-colors"
						aria-label="Abrir menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Menu Mobile */}
				{isMenuOpen && (
					<nav className="lg:hidden pb-4 border-t border-white/20 mt-2 pt-4">
						<div className="flex flex-col space-y-1">
							{menuItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsMenuOpen(false)}
									className="px-4 py-3 text-sm font-medium hover:bg-primary-dark hover:text-secondary rounded-md transition-colors"
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
