import { notFound } from "next/navigation";
import FormularioNoticia from "@/components/admin/FormularioNoticia";
import { noticiaDoRepositorio } from "@/lib/admin/noticias";
import { exigirSessao } from "@/lib/admin/sessao";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function EditarNoticiaPage({ params }: PageProps) {
	await exigirSessao();
	const { slug } = await params;
	const noticia = await noticiaDoRepositorio(slug);
	if (!noticia) notFound();

	return (
		<div>
			<p className="eyebrow">Área da secretaria</p>
			<h1 className="mt-3 text-4xl text-ink">Editar notícia</h1>
			<FormularioNoticia noticia={noticia} />
		</div>
	);
}
