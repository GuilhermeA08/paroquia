// Sessão do painel: cookie com a data de expiração assinada por HMAC.
// A chave da assinatura inclui o hash da senha, então trocar a senha encerra todas as sessões.

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "admin_sessao";
const DURACAO_SEGUNDOS = 8 * 60 * 60;

function chave() {
	const segredo = process.env.ADMIN_SESSAO_SEGREDO;
	if (!segredo || segredo.length < 32) {
		throw new Error("ADMIN_SESSAO_SEGREDO ausente ou curto demais.");
	}
	return `${segredo}:${process.env.ADMIN_SENHA_HASH ?? ""}`;
}

function assinar(valor: string) {
	return createHmac("sha256", chave()).update(valor).digest("base64url");
}

export async function iniciarSessao() {
	const expira = String(Math.floor(Date.now() / 1000) + DURACAO_SEGUNDOS);
	(await cookies()).set(COOKIE, `${expira}.${assinar(expira)}`, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/admin",
		maxAge: DURACAO_SEGUNDOS,
	});
}

export async function encerrarSessao() {
	(await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function sessaoValida() {
	const cookie = (await cookies()).get(COOKIE)?.value;
	if (!cookie) return false;

	const [expira, assinatura] = cookie.split(".");
	if (!expira || !assinatura) return false;

	const esperada = Buffer.from(assinar(expira));
	const recebida = Buffer.from(assinatura);
	if (
		esperada.length !== recebida.length ||
		!timingSafeEqual(esperada, recebida)
	) {
		return false;
	}
	return Number(expira) > Date.now() / 1000;
}

// Chamar no início de toda página e ação do painel
export async function exigirSessao() {
	if (!(await sessaoValida())) redirect("/admin/login");
}
