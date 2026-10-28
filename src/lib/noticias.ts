// Notícias lidas de content/noticias/*.md, editadas pelo painel em /admin.
// O nome do arquivo é o slug; o cabeçalho (frontmatter) traz título, data e resumo.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const PASTA = path.join(process.cwd(), "content/noticias");

export interface Noticia {
	slug: string;
	titulo: string;
	data: string;
	resumo: string;
	imagem?: string;
	conteudo: string;
}

// O YAML transforma datas sem aspas em Date; o site usa sempre "AAAA-MM-DD"
function normalizarData(valor: unknown) {
	if (valor instanceof Date) return valor.toISOString().slice(0, 10);
	return String(valor ?? "").slice(0, 10);
}

function lerNoticia(arquivo: string): Noticia {
	const { data, content } = matter(
		fs.readFileSync(path.join(PASTA, arquivo), "utf8"),
	);
	return {
		slug: arquivo.replace(/\.md$/, ""),
		titulo: String(data.titulo ?? ""),
		data: normalizarData(data.data),
		resumo: String(data.resumo ?? ""),
		imagem: data.imagem ? String(data.imagem) : undefined,
		conteudo: content.trim(),
	};
}

// Mais recentes primeiro
export function listarNoticias(): Noticia[] {
	if (!fs.existsSync(PASTA)) return [];
	return fs
		.readdirSync(PASTA)
		.filter((arquivo) => arquivo.endsWith(".md"))
		.map(lerNoticia)
		.sort((a, b) => b.data.localeCompare(a.data));
}

export function buscarNoticia(slug: string) {
	return listarNoticias().find((noticia) => noticia.slug === slug);
}

// O texto vem do painel da própria paróquia (usuários com acesso ao repositório)
export function conteudoEmHtml(conteudo: string) {
	return marked.parse(conteudo, { async: false });
}
