"use client";

import Image from "next/image";
import { useState } from "react";

interface Photo {
	id: number;
	titulo: string;
	categoria: string;
	imagem: string;
}

interface PhotoGalleryProps {
	fotos: Photo[];
}

const PLACEHOLDER = "/images/placeholder.svg";

export default function PhotoGallery({ fotos }: PhotoGalleryProps) {
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
	const [filter, setFilter] = useState<string>("Todas");

	const categorias = ["Todas", ...new Set(fotos.map((f) => f.categoria))];
	const fotosFiltradas =
		filter === "Todas" ? fotos : fotos.filter((f) => f.categoria === filter);

	return (
		<div>
			{/* Filtros */}
			<div
				role="tablist"
				aria-label="Categorias"
				className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-line"
			>
				{categorias.map((cat) => (
					<button
						key={cat}
						type="button"
						role="tab"
						aria-selected={filter === cat}
						onClick={() => setFilter(cat)}
						className={`-mb-px border-b-2 pb-3 text-sm transition-colors ${
							filter === cat
								? "border-rubrica text-ink"
								: "border-transparent text-muted hover:text-ink"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Grid de Fotos */}
			<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
				{fotosFiltradas.map((foto) => (
					<button
						key={foto.id}
						type="button"
						onClick={() => setSelectedPhoto(foto)}
						className="group text-left"
					>
						<div className="relative aspect-[4/3] overflow-hidden bg-tint">
							<Image
								src={foto.imagem}
								alt={foto.titulo}
								fill
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
								className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = PLACEHOLDER;
								}}
							/>
						</div>
						<p className="mt-3 font-serif text-lg text-ink group-hover:text-verde">
							{foto.titulo}
						</p>
						<p className="text-sm text-muted">{foto.categoria}</p>
					</button>
				))}
			</div>

			{/* Lightbox */}
			{selectedPhoto && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
					onClick={() => setSelectedPhoto(null)}
				>
					<button
						type="button"
						className="absolute top-4 right-4 text-white/80 hover:text-white"
						onClick={() => setSelectedPhoto(null)}
						aria-label="Fechar"
					>
						<svg
							className="h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<figure className="relative max-h-[80vh] w-full max-w-4xl">
						<Image
							src={selectedPhoto.imagem}
							alt={selectedPhoto.titulo}
							width={1200}
							height={800}
							className="mx-auto max-h-[75vh] object-contain"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = PLACEHOLDER;
							}}
						/>
						<figcaption className="mt-4 text-center">
							<span className="block font-serif text-xl text-white">
								{selectedPhoto.titulo}
							</span>
							<span className="text-sm text-white/60">
								{selectedPhoto.categoria}
							</span>
						</figcaption>
					</figure>
				</div>
			)}
		</div>
	);
}
