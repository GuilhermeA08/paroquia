// Conferência da senha do painel contra o hash scrypt guardado em ADMIN_SENHA_HASH.
// A senha em si nunca é armazenada; o hash é gerado por `npm run admin:senha`.

import { scrypt, timingSafeEqual } from "node:crypto";

function derivarChave(
	senha: string,
	sal: Buffer,
	tamanho: number,
	opcoes: { N: number; r: number; p: number },
) {
	return new Promise<Buffer>((resolve, reject) =>
		scrypt(
			senha,
			sal,
			tamanho,
			{ ...opcoes, maxmem: 256 * 1024 * 1024 },
			(erro, chave) => (erro ? reject(erro) : resolve(chave)),
		),
	);
}

export function senhaConfigurada() {
	return Boolean(process.env.ADMIN_SENHA_HASH);
}

export async function conferirSenha(senha: string) {
	const guardado = process.env.ADMIN_SENHA_HASH;
	if (!guardado) return false;

	const [algoritmo, n, r, p, sal, hash] = guardado.split(":");
	if (algoritmo !== "scrypt" || !sal || !hash) return false;

	const esperado = Buffer.from(hash, "base64url");
	const obtido = await derivarChave(
		senha,
		Buffer.from(sal, "base64url"),
		esperado.length,
		{ N: Number(n), r: Number(r), p: Number(p) },
	);
	// Comparação em tempo constante, para não vazar quantos bytes conferem
	return timingSafeEqual(obtido, esperado);
}
