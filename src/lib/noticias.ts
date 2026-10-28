// Notícias lidas de content/noticias/*.md, editadas pelo painel em /admin.
// O nome do arquivo é o slug; o cabeçalho (frontmatter) traz título, data, resumo e foto.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

export const PASTA_NOTICIAS = "content/noticias";
const PASTA = path.join(process.cwd(), PASTA_NOTICIAS);

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

// Só aceita fotos enviadas pelo painel, guardadas no próprio site
function imagemLocal(valor: unknown) {
	const caminho = String(valor ?? "");
	return /^\/images\/noticias\/[\w.-]+$/.test(caminho) ? caminho : undefined;
}

export function interpretarNoticia(slug: string, texto: string): Noticia {
	const { data, content } = matter(texto);
	return {
		slug,
		titulo: String(data.titulo ?? ""),
		data: normalizarData(data.data),
		resumo: String(data.resumo ?? ""),
		imagem: imagemLocal(data.imagem),
		conteudo: content.trim(),
	};
}

export function montarArquivoNoticia(noticia: Omit<Noticia, "slug">) {
	const { conteudo, imagem, ...campos } = noticia;
	return matter.stringify(`${conteudo}\n`, {
		...campos,
		...(imagem ? { imagem } : {}),
	});
}

// Mais recentes primeiro
export function listarNoticias(): Noticia[] {
	if (!fs.existsSync(PASTA)) return [];
	return fs
		.readdirSync(PASTA)
		.filter((arquivo) => arquivo.endsWith(".md"))
		.map((arquivo) =>
			interpretarNoticia(
				arquivo.replace(/\.md$/, ""),
				fs.readFileSync(path.join(PASTA, arquivo), "utf8"),
			),
		)
		.sort((a, b) => b.data.localeCompare(a.data));
}

export function buscarNoticia(slug: string) {
	return listarNoticias().find((noticia) => noticia.slug === slug);
}

const escaparHtml = (texto: string) =>
	texto
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

// Links só para páginas web, e-mail, telefone ou endereços do próprio site
const urlSegura = (url: string) =>
	/^(https?:|mailto:|tel:|\/(?!\/)|#)/i.test(url.trim()) ? url : "#";

// Quem edita entra com a senha do painel; mesmo assim o texto nunca vira HTML livre,
// para que uma sessão roubada não consiga injetar scripts no site
const markdown = new Marked({
	renderer: {
		html: ({ text }) => escaparHtml(text),
		link({ href, title, tokens }) {
			const texto = this.parser.parseInline(tokens);
			const titulo = title ? ` title="${escaparHtml(title)}"` : "";
			return `<a href="${escaparHtml(urlSegura(href))}"${titulo}>${texto}</a>`;
		},
		image: ({ href, text }) =>
			`<img src="${escaparHtml(urlSegura(href))}" alt="${escaparHtml(text)}" loading="lazy">`,
	},
});

export function conteudoEmHtml(conteudo: string) {
	return markdown.parse(conteudo, { async: false });
}
