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

export default function PhotoGallery({ fotos }: PhotoGalleryProps) {
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
	const [filter, setFilter] = useState<string>("Todas");

	const categorias = ["Todas", ...new Set(fotos.map((f) => f.categoria))];
	const fotosFiltradas =
		filter === "Todas" ? fotos : fotos.filter((f) => f.categoria === filter);

	return (
		<div>
			{/* Filtros */}
			<div className="flex flex-wrap justify-center gap-2 mb-8">
				{categorias.map((cat) => (
					<button
						key={cat}
						onClick={() => setFilter(cat)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
							filter === cat
								? "bg-primary text-white"
								: "bg-cream text-primary hover:bg-gray-light"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Grid de Fotos */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{fotosFiltradas.map((foto) => (
					<div
						key={foto.id}
						onClick={() => setSelectedPhoto(foto)}
						className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
					>
						<div className="relative aspect-[4/3] bg-gray-light">
							<Image
								src={foto.imagem}
								alt={foto.titulo}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = "/images/placeholder.jpg";
								}}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
								<div className="absolute bottom-0 left-0 right-0 p-4">
									<h4 className="text-white font-medium">{foto.titulo}</h4>
									<p className="text-white/80 text-sm">{foto.categoria}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Lightbox */}
			{selectedPhoto && (
				<div
					className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
					onClick={() => setSelectedPhoto(null)}
				>
					<button
						className="absolute top-4 right-4 text-white hover:text-secondary transition-colors"
						onClick={() => setSelectedPhoto(null)}
						aria-label="Fechar"
					>
						<svg
							className="w-8 h-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<div className="relative max-w-4xl max-h-[80vh] w-full">
						<Image
							src={selectedPhoto.imagem}
							alt={selectedPhoto.titulo}
							width={1200}
							height={800}
							className="object-contain max-h-[80vh] mx-auto"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = "/images/placeholder.jpg";
							}}
						/>
						<div className="text-center mt-4">
							<h3 className="text-white text-xl font-serif">
								{selectedPhoto.titulo}
							</h3>
							<p className="text-white/70">{selectedPhoto.categoria}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
