"use server";

// Ações do painel de notícias. Toda ação que altera algo confere a sessão primeiro:
// as páginas protegidas não bastam, porque uma ação pode ser chamada diretamente.

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";
import {
	apagarArquivo,
	gravarArquivo,
	lerArquivo,
	listarArquivos,
	shaDoArquivo,
} from "@/lib/admin/github";
import { conferirSenha } from "@/lib/admin/senha";
import {
	encerrarSessao,
	exigirSessao,
	iniciarSessao,
} from "@/lib/admin/sessao";
import {
	limparFalhas,
	minutosBloqueado,
	registrarFalha,
} from "@/lib/admin/tentativas";
import {
	interpretarNoticia,
	montarArquivoNoticia,
	PASTA_NOTICIAS,
} from "@/lib/noticias";

export interface EstadoFormulario {
	erro?: string;
}

const PASTA_IMAGENS = "public/images/noticias";
const SLUG_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const TIPOS_DE_IMAGEM = ["image/jpeg", "image/png", "image/webp"];
const TAMANHO_MAXIMO_IMAGEM = 4 * 1024 * 1024;

async function ipDoVisitante() {
	const cabecalhos = await headers();
	return (
		cabecalhos.get("x-forwarded-for")?.split(",")[0].trim() ??
		cabecalhos.get("x-real-ip") ??
		"desconhecido"
	);
}

export async function entrar(
	_estado: EstadoFormulario,
	formulario: FormData,
): Promise<EstadoFormulario> {
	const ip = await ipDoVisitante();
	const bloqueio = minutosBloqueado(ip);
	if (bloqueio > 0) {
		return {
			erro: `Muitas tentativas erradas. Tente de novo em ${bloqueio} min.`,
		};
	}

	const senha = String(formulario.get("senha") ?? "");
	if (!senha || !(await conferirSenha(senha))) {
		registrarFalha(ip);
		return { erro: "Senha incorreta." };
	}

	limparFalhas(ip);
	await iniciarSessao();
	redirect("/admin");
}

export async function sair() {
	await encerrarSessao();
	redirect("/admin/login");
}

function gerarSlug(titulo: string) {
	return titulo
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80)
		.replace(/-+$/, "");
}

async function slugDisponivel(base: string) {
	const existentes = new Set(
		(await listarArquivos(PASTA_NOTICIAS)).map((arquivo) => arquivo.name),
	);
	let slug = base || "aviso";
	for (let n = 2; existentes.has(`${slug}.md`); n++) slug = `${base}-${n}`;
	return slug;
}

function dataValida(data: string) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;
	const convertida = new Date(`${data}T12:00:00Z`);
	return (
		!Number.isNaN(convertida.getTime()) &&
		convertida.toISOString().startsWith(data)
	);
}

// Reduz para até 1600 px e regrava em JPEG, o que também descarta os metadados (GPS incluso)
async function prepararImagem(arquivo: File) {
	return sharp(Buffer.from(await arquivo.arrayBuffer()))
		.rotate()
		.resize({
			width: 1600,
			height: 1600,
			fit: "inside",
			withoutEnlargement: true,
		})
		.jpeg({ quality: 80, mozjpeg: true })
		.toBuffer();
}

// Cada foto pertence a uma só notícia, então sai junto quando é trocada ou a notícia é apagada
async function apagarFoto(imagem: string, slug: string) {
	const caminho = `public${imagem}`;
	const sha = await shaDoArquivo(caminho);
	if (sha) {
		await apagarArquivo(
			caminho,
			sha,
			`content: remove foto da notícia “${slug}”`,
		);
	}
}

export async function salvarNoticia(
	_estado: EstadoFormulario,
	formulario: FormData,
): Promise<EstadoFormulario> {
	await exigirSessao();

	const campo = (nome: string) => String(formulario.get(nome) ?? "").trim();
	const titulo = campo("titulo");
	const data = campo("data");
	const resumo = campo("resumo");
	const conteudo = campo("conteudo");
	const slugOriginal = campo("slugOriginal");
	const removerImagem = formulario.get("removerImagem") === "on";
	const foto = formulario.get("imagem");

	if (!titulo || titulo.length > 150)
		return { erro: "Informe um título de até 150 caracteres." };
	if (!dataValida(data)) return { erro: "Informe uma data válida." };
	if (!resumo || resumo.length > 400)
		return { erro: "Informe um resumo de até 400 caracteres." };
	if (!conteudo || conteudo.length > 20000)
		return { erro: "Escreva o texto da notícia (até 20 mil caracteres)." };
	if (slugOriginal && !SLUG_VALIDO.test(slugOriginal))
		return { erro: "Notícia inválida." };

	const novaFoto = foto instanceof File && foto.size > 0 ? foto : null;
	if (novaFoto) {
		if (!TIPOS_DE_IMAGEM.includes(novaFoto.type))
			return { erro: "A foto precisa ser JPG, PNG ou WebP." };
		if (novaFoto.size > TAMANHO_MAXIMO_IMAGEM)
			return { erro: "A foto é grande demais (máximo de 4 MB)." };
	}

	try {
		let sha: string | undefined;
		let imagem: string | undefined;
		let imagemAnterior: string | undefined;

		if (slugOriginal) {
			const atual = await lerArquivo(`${PASTA_NOTICIAS}/${slugOriginal}.md`);
			if (!atual) return { erro: "Esta notícia não existe mais." };
			sha = atual.sha;
			imagem = interpretarNoticia(slugOriginal, atual.conteudo).imagem;
			imagemAnterior = imagem;
		}
		const slug = slugOriginal || (await slugDisponivel(gerarSlug(titulo)));

		if (removerImagem) imagem = undefined;
		if (novaFoto) {
			const nomeArquivo = `${slug}-${Date.now()}.jpg`;
			await gravarArquivo(
				`${PASTA_IMAGENS}/${nomeArquivo}`,
				await prepararImagem(novaFoto),
				`content: envia foto da notícia “${slug}”`,
			);
			imagem = `/images/noticias/${nomeArquivo}`;
		}

		await gravarArquivo(
			`${PASTA_NOTICIAS}/${slug}.md`,
			montarArquivoNoticia({ titulo, data, resumo, imagem, conteudo }),
			`content: ${slugOriginal ? "atualiza" : "nova"} notícia “${slug}”`,
			sha,
		);

		if (imagemAnterior && imagemAnterior !== imagem) {
			await apagarFoto(imagemAnterior, slug);
		}
	} catch (erro) {
		console.error(erro);
		return {
			erro: "Não foi possível salvar agora. Tente de novo em instantes.",
		};
	}

	redirect("/admin?salvo=1");
}

export async function apagarNoticia(formulario: FormData) {
	await exigirSessao();

	const slug = String(formulario.get("slug") ?? "");
	if (!SLUG_VALIDO.test(slug)) redirect("/admin");

	const caminho = `${PASTA_NOTICIAS}/${slug}.md`;
	const atual = await lerArquivo(caminho);
	if (atual) {
		const { imagem } = interpretarNoticia(slug, atual.conteudo);
		await apagarArquivo(
			caminho,
			atual.sha,
			`content: remove notícia “${slug}”`,
		);

		if (imagem) await apagarFoto(imagem, slug);
	}

	redirect("/admin?apagado=1");
}
