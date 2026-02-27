import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { noticias } from "@/lib/data";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return noticias.map((noticia) => ({
		slug: noticia.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const noticia = noticias.find((n) => n.slug === slug);

	if (!noticia) {
		return {
			title: "Notícia não encontrada | Paróquia de Santana",
		};
	}

	return {
		title: `${noticia.titulo} | Paróquia de Santana`,
		description: noticia.resumo,
	};
}

export default async function NoticiaPage({ params }: PageProps) {
	const { slug } = await params;
	const noticia = noticias.find((n) => n.slug === slug);

	if (!noticia) {
		notFound();
	}

	const dataFormatada = new Date(noticia.data).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="py-16">
			<article className="max-w-3xl mx-auto px-4">
				{/* Breadcrumb */}
				<nav className="mb-8">
					<ol className="flex items-center gap-2 text-sm text-gray">
						<li>
							<Link href="/" className="hover:text-primary transition-colors">
								Início
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link
								href="/noticias"
								className="hover:text-primary transition-colors"
							>
								Notícias
							</Link>
						</li>
						<li>/</li>
						<li className="text-primary font-medium truncate max-w-[200px]">
							{noticia.titulo}
						</li>
					</ol>
				</nav>

				{/* Header */}
				<header className="mb-8">
					<time className="text-secondary font-medium">{dataFormatada}</time>
					<h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-2 mb-4">
						{noticia.titulo}
					</h1>
					<p className="text-lg text-gray">{noticia.resumo}</p>
				</header>

				{/* Imagem */}
				<div className="h-64 md:h-80 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-8">
					<span className="text-8xl">⛪</span>
				</div>

				{/* Conteúdo */}
				<div className="prose prose-lg max-w-none">
					<p className="text-foreground leading-relaxed">{noticia.conteudo}</p>
				</div>

				{/* Compartilhar */}
				<div className="mt-12 pt-8 border-t border-gray-light">
					<p className="text-sm text-gray mb-4">Compartilhe esta notícia:</p>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => {}}
							className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
							aria-label="Compartilhar no Facebook"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<title>Facebook</title>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</button>
						<button
							type="button"
							onClick={() => {}}
							className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
							aria-label="Compartilhar no WhatsApp"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<title>WhatsApp</title>
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
							</svg>
						</button>
					</div>
				</div>

				{/* Voltar */}
				<div className="mt-8">
					<Link
						href="/noticias"
						className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Voltar</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Voltar para Notícias
					</Link>
				</div>
			</article>
		</div>
	);
}
