import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatarData } from "@/components/NewsCard";
import { paroquiaInfo } from "@/lib/data";
import { buscarNoticia, conteudoEmHtml, listarNoticias } from "@/lib/noticias";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return listarNoticias().map((noticia) => ({
		slug: noticia.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const noticia = buscarNoticia(slug);

	if (!noticia) {
		return {
			title: "Notícia não encontrada | Paróquia de Sant’Ana",
		};
	}

	// Prévia do link no WhatsApp e no Facebook; sem foto, vale a imagem padrão do site
	return {
		title: `${noticia.titulo} | Paróquia de Sant’Ana`,
		description: noticia.resumo,
		openGraph: {
			title: noticia.titulo,
			description: noticia.resumo,
			url: `/noticias/${slug}`,
			siteName: paroquiaInfo.nome,
			type: "article",
			locale: "pt_BR",
			images: noticia.imagem ?? "/opengraph-image.jpg",
		},
	};
}

export default async function NoticiaPage({ params }: PageProps) {
	const { slug } = await params;
	const noticia = buscarNoticia(slug);

	if (!noticia) {
		notFound();
	}

	const link = `${paroquiaInfo.site}/noticias/${slug}`;
	const compartilhar = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
		whatsapp: `https://wa.me/?text=${encodeURIComponent(`${noticia.titulo}\n${link}`)}`,
	};

	return (
		<div className="px-4 py-14 sm:px-6 md:py-20">
			<article className="mx-auto max-w-2xl">
				{/* Breadcrumb */}
				<nav aria-label="Trilha de navegação" className="mb-10">
					<ol className="flex min-w-0 items-center gap-2 text-sm text-muted">
						<li>
							<Link href="/" className="hover:text-ink">
								Início
							</Link>
						</li>
						<li aria-hidden="true">/</li>
						<li>
							<Link href="/noticias" className="hover:text-ink">
								Notícias
							</Link>
						</li>
						<li aria-hidden="true">/</li>
						<li className="min-w-0 truncate text-ink">{noticia.titulo}</li>
					</ol>
				</nav>

				{/* Header */}
				<header className="border-b border-line pb-8">
					<time dateTime={noticia.data} className="eyebrow">
						{formatarData(noticia.data)}
					</time>
					<h1 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">
						{noticia.titulo}
					</h1>
					<p className="mt-4 text-xl text-muted">{noticia.resumo}</p>
				</header>

				{noticia.imagem && (
					<Image
						src={noticia.imagem}
						alt=""
						width={1600}
						height={1200}
						sizes="(min-width: 672px) 672px, 100vw"
						className="mt-8 h-auto w-full bg-tint"
					/>
				)}

				{/* Conteúdo */}
				<div
					className="texto-noticia mt-8 font-serif text-xl leading-relaxed text-ink"
					dangerouslySetInnerHTML={{ __html: conteudoEmHtml(noticia.conteudo) }}
				/>

				{/* Compartilhar */}
				<div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-6">
					<p className="mr-2 text-sm text-muted">Compartilhe:</p>
					<a
						href={compartilhar.facebook}
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
						aria-label="Compartilhar no Facebook"
					>
						<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<title>Facebook</title>
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
					</a>
					<a
						href={compartilhar.whatsapp}
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
						aria-label="Compartilhar no WhatsApp"
					>
						<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<title>WhatsApp</title>
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
						</svg>
					</a>
				</div>

				{/* Voltar */}
				<Link
					href="/noticias"
					className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-gold underline-offset-4"
				>
					<span aria-hidden="true">←</span>
					Voltar para os avisos
				</Link>
			</article>
		</div>
	);
}
