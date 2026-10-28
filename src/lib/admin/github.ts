// Leitura e gravação de arquivos no repositório pela API do GitHub.
// Cada gravação vira um commit na main, e a Vercel publica o site de novo sozinha.
// GITHUB_TOKEN deve ser um token "fine-grained" só deste repositório, com permissão Contents: read and write.

const API = "https://api.github.com";

function configuracao() {
	const token = process.env.GITHUB_TOKEN;
	if (!token) throw new Error("GITHUB_TOKEN não configurado.");
	return {
		token,
		repositorio: process.env.GITHUB_REPO ?? "GuilhermeA08/paroquia",
		branch: process.env.GITHUB_BRANCH ?? "main",
	};
}

async function chamar(caminho: string, init: RequestInit = {}) {
	const { token, repositorio, branch } = configuracao();
	const url = new URL(
		`${API}/repos/${repositorio}/contents/${caminho.split("/").map(encodeURIComponent).join("/")}`,
	);
	if (!init.method || init.method === "GET") {
		url.searchParams.set("ref", branch);
	}
	return fetch(url, {
		...init,
		cache: "no-store",
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${token}`,
			"X-GitHub-Api-Version": "2022-11-28",
			...init.headers,
		},
	});
}

async function falhar(resposta: Response, acao: string): Promise<never> {
	throw new Error(
		`GitHub recusou ${acao} (${resposta.status}): ${await resposta.text()}`,
	);
}

export async function listarArquivos(pasta: string) {
	const resposta = await chamar(pasta);
	if (resposta.status === 404) return [];
	if (!resposta.ok) await falhar(resposta, "a listagem");
	const itens = (await resposta.json()) as {
		name: string;
		path: string;
		type: string;
	}[];
	return itens.filter((item) => item.type === "file");
}

export async function lerArquivo(caminho: string) {
	const resposta = await chamar(caminho);
	if (resposta.status === 404) return null;
	if (!resposta.ok) await falhar(resposta, "a leitura");
	const { content, sha } = (await resposta.json()) as {
		content: string;
		sha: string;
	};
	return { conteudo: Buffer.from(content, "base64").toString("utf8"), sha };
}

// Sem `sha` cria o arquivo; com `sha` substitui exatamente aquela versão
export async function gravarArquivo(
	caminho: string,
	conteudo: string | Buffer,
	mensagem: string,
	sha?: string,
) {
	const { branch } = configuracao();
	const resposta = await chamar(caminho, {
		method: "PUT",
		body: JSON.stringify({
			message: mensagem,
			content: Buffer.from(conteudo).toString("base64"),
			branch,
			sha,
		}),
	});
	if (!resposta.ok) await falhar(resposta, "a gravação");
}

export async function apagarArquivo(
	caminho: string,
	sha: string,
	mensagem: string,
) {
	const { branch } = configuracao();
	const resposta = await chamar(caminho, {
		method: "DELETE",
		body: JSON.stringify({ message: mensagem, sha, branch }),
	});
	if (!resposta.ok) await falhar(resposta, "a remoção");
}

export async function shaDoArquivo(caminho: string) {
	const resposta = await chamar(caminho);
	if (resposta.status === 404) return null;
	if (!resposta.ok) await falhar(resposta, "a leitura");
	return ((await resposta.json()) as { sha: string }).sha;
}
