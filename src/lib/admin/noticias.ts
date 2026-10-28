// Notícias como estão agora no repositório. O painel lê daqui, e não dos arquivos
// da última publicação, para mostrar na hora o que acabou de ser salvo.

import { lerArquivo, listarArquivos } from "@/lib/admin/github";
import { interpretarNoticia, PASTA_NOTICIAS } from "@/lib/noticias";

export async function noticiasDoRepositorio() {
	const arquivos = (await listarArquivos(PASTA_NOTICIAS)).filter((arquivo) =>
		arquivo.name.endsWith(".md"),
	);
	const noticias = await Promise.all(
		arquivos.map(async (arquivo) => {
			const lido = await lerArquivo(arquivo.path);
			return lido
				? interpretarNoticia(arquivo.name.replace(/\.md$/, ""), lido.conteudo)
				: null;
		}),
	);
	return noticias
		.filter((noticia) => noticia !== null)
		.sort((a, b) => b.data.localeCompare(a.data));
}

export async function noticiaDoRepositorio(slug: string) {
	if (!/^[a-z0-9-]+$/.test(slug)) return null;
	const lido = await lerArquivo(`${PASTA_NOTICIAS}/${slug}.md`);
	return lido ? interpretarNoticia(slug, lido.conteudo) : null;
}
