// Início do login do painel de notícias (/admin) pelo GitHub.
// O Decap CMS abre esta rota num popup; daqui seguimos para a autorização do GitHub.

import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_ESTADO } from "@/lib/decapAuth";

export function GET(request: NextRequest) {
	const clientId = process.env.GITHUB_CLIENT_ID;
	if (!clientId) {
		return new NextResponse("GITHUB_CLIENT_ID não configurado na Vercel.", {
			status: 500,
		});
	}

	// Valor aleatório conferido no retorno, para impedir logins forjados (CSRF)
	const estado = randomBytes(16).toString("hex");

	const url = new URL("https://github.com/login/oauth/authorize");
	url.searchParams.set("client_id", clientId);
	url.searchParams.set(
		"redirect_uri",
		new URL("/api/callback", request.url).toString(),
	);
	// O repositório é público: basta permissão de escrita em repositórios públicos
	url.searchParams.set("scope", "public_repo");
	url.searchParams.set("state", estado);

	const resposta = NextResponse.redirect(url);
	resposta.cookies.set(COOKIE_ESTADO, estado, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/api/callback",
		maxAge: 600,
	});
	return resposta;
}
