// Bloqueio temporário após senhas erradas seguidas, por endereço IP.
// Fica na memória da instância do servidor: na Vercel cada instância tem a sua contagem,
// então isto freia tentativas em sequência; a principal defesa é a senha longa + scrypt lento.

const MAX_FALHAS = 5;
const BLOQUEIO_MS = 15 * 60 * 1000;

const registros = new Map<string, { falhas: number; bloqueadoAte: number }>();

export function minutosBloqueado(ip: string) {
	const registro = registros.get(ip);
	if (!registro || registro.bloqueadoAte <= Date.now()) return 0;
	return Math.ceil((registro.bloqueadoAte - Date.now()) / 60000);
}

export function registrarFalha(ip: string) {
	const registro = registros.get(ip) ?? { falhas: 0, bloqueadoAte: 0 };
	registro.falhas += 1;
	if (registro.falhas >= MAX_FALHAS) {
		registro.bloqueadoAte = Date.now() + BLOQUEIO_MS;
		registro.falhas = 0;
	}
	registros.set(ip, registro);
}

export function limparFalhas(ip: string) {
	registros.delete(ip);
}
