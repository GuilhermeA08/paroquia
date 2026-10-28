// Gera as variáveis de ambiente do painel /admin: o hash da senha e o segredo da sessão.
// Uso: npm run admin:senha  (a senha é digitada sem aparecer na tela e não é salva em lugar nenhum)

import { randomBytes, scrypt } from "node:crypto";
import readline from "node:readline";

// Mesmos parâmetros lidos por src/lib/admin/senha.ts (recomendação OWASP para scrypt)
const N = 2 ** 17;
const R = 8;
const P = 1;
const TAMANHO_MINIMO = 12;

function perguntarSemEco(pergunta) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: true,
		});
		rl.question(pergunta, (resposta) => {
			rl.close();
			process.stdout.write("\n");
			resolve(resposta);
		});
		// Esconde o que é digitado, mas mantém o texto da pergunta
		rl._writeToOutput = (texto) => {
			if (texto.includes(pergunta)) rl.output.write(pergunta);
		};
	});
}

const senha = await perguntarSemEco("Nova senha do painel: ");
const confirmacao = await perguntarSemEco("Repita a senha: ");

if (senha !== confirmacao) {
	console.error("As senhas não conferem.");
	process.exit(1);
}
if (senha.length < TAMANHO_MINIMO) {
	console.error(`Use pelo menos ${TAMANHO_MINIMO} caracteres.`);
	process.exit(1);
}

const sal = randomBytes(16);
const hash = await new Promise((resolve, reject) =>
	scrypt(
		senha,
		sal,
		32,
		{ N, r: R, p: P, maxmem: 256 * 1024 * 1024 },
		(erro, chave) => (erro ? reject(erro) : resolve(chave)),
	),
);

// Separador ":" porque "$" seria interpretado como variável em arquivos .env
const valorHash = [
	"scrypt",
	N,
	R,
	P,
	sal.toString("base64url"),
	hash.toString("base64url"),
].join(":");

console.log("\nCadastre na Vercel (Settings → Environment Variables):\n");
console.log(`ADMIN_SENHA_HASH=${valorHash}`);
console.log(`ADMIN_SESSAO_SEGREDO=${randomBytes(32).toString("base64url")}`);
console.log(
	"\nO segredo da sessão só precisa ser gerado uma vez; trocar a senha já encerra as sessões abertas.",
);
