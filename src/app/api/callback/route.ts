// Retorno do GitHub depois do login do painel de notícias (/admin).
// Troca o código pelo token e entrega o resultado ao Decap CMS, que está na janela que abriu o popup.

import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_ESTADO } from "@/lib/decapAuth";

type Resultado =
	| { status: "success"; conteudo: { token: string; provider: "github" } }
	| { status: "error"; conteudo: { message: string } };

// Protocolo do Decap: o popup anuncia "authorizing:github", a janela do painel responde,
// e só então o popup envia "authorization:github:<status>:<json>". Tudo restrito à origem do site.
function paginaDeRetorno(origem: string, { status, conteudo }: Resultado) {
	const mensagem = `authorization:github:${status}:${JSON.stringify(conteudo)}`;
	// Escapa "<" para o JSON não conseguir fechar a tag <script>
	const js = (valor: string) => JSON.stringify(valor).replace(/</g, "\\u003c");

	const html = `<!doctype html>
<meta charset="utf-8">
<title>Entrando no painel…</title>
<script>
(function () {
	var origem = ${js(origem)};
	function receber(evento) {
		if (evento.origin !== origem) return;
		window.removeEventListener("message", receber);
		window.opener.postMessage(${js(mensagem)}, origem);
	}
	window.addEventListener("message", receber);
	window.opener.postMessage("authorizing:github", origem);
})();
</script>`;

	const resposta = new NextResponse(html, {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "no-store",
		},
	});
	resposta.cookies.delete({ name: COOKIE_ESTADO, path: "/api/callback" });
	return resposta;
}

export async function GET(request: NextRequest) {
	const origem = new URL(request.url).origin;
	const codigo = request.nextUrl.searchParams.get("code");
	const estado = request.nextUrl.searchParams.get("state");
	const estadoEsperado = request.cookies.get(COOKIE_ESTADO)?.value;

	if (!codigo || !estado || estado !== estadoEsperado) {
		return paginaDeRetorno(origem, {
			status: "error",
			conteudo: { message: "Login expirado ou inválido. Tente de novo." },
		});
	}

	const respostaGithub = await fetch(
		"https://github.com/login/oauth/access_token",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code: codigo,
				redirect_uri: new URL("/api/callback", request.url).toString(),
			}),
		},
	);
	const dados = (await respostaGithub.json()) as {
		access_token?: string;
		error_description?: string;
	};

	if (!dados.access_token) {
		return paginaDeRetorno(origem, {
			status: "error",
			conteudo: {
				message: dados.error_description ?? "O GitHub recusou o login.",
			},
		});
	}

	return paginaDeRetorno(origem, {
		status: "success",
		conteudo: { token: dados.access_token, provider: "github" },
	});
}
