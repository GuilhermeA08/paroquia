// Calendário litúrgico simplificado: tempo do ano e cor, e próxima missa

import { horariosMissas } from "@/lib/data";

export interface TempoLiturgico {
	nome: string;
	cor: string;
	corNome: string;
}

const DIA_MS = 24 * 60 * 60 * 1000;

function somarDias(data: Date, dias: number) {
	return new Date(data.getTime() + dias * DIA_MS);
}

// Domingo de Páscoa (algoritmo de Meeus/Jones/Butcher)
function pascoa(ano: number) {
	const a = ano % 19;
	const b = Math.floor(ano / 100);
	const c = ano % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const mes = Math.floor((h + l - 7 * m + 114) / 31);
	const dia = ((h + l - 7 * m + 114) % 31) + 1;
	return new Date(ano, mes - 1, dia);
}

function inicioAdvento(ano: number) {
	const natal = new Date(ano, 11, 25);
	const quartoDomingo = somarDias(natal, -(natal.getDay() || 7));
	return somarDias(quartoDomingo, -21);
}

// Batismo do Senhor: domingo depois de 6 de janeiro
function batismoDoSenhor(ano: number) {
	const reis = new Date(ano, 0, 6);
	return somarDias(reis, 7 - reis.getDay());
}

const TEMPOS = {
	advento: { nome: "Advento", cor: "#6b3f8f", corNome: "roxo" },
	natal: { nome: "Tempo do Natal", cor: "#e8e2cf", corNome: "branco" },
	quaresma: { nome: "Quaresma", cor: "#6b3f8f", corNome: "roxo" },
	pascoa: { nome: "Tempo Pascal", cor: "#e8e2cf", corNome: "branco" },
	comum: { nome: "Tempo Comum", cor: "#2f7a4f", corNome: "verde" },
} satisfies Record<string, TempoLiturgico>;

export function tempoLiturgico(agora: Date): TempoLiturgico {
	const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
	const ano = hoje.getFullYear();
	const domingoPascoa = pascoa(ano);
	const cinzas = somarDias(domingoPascoa, -46);
	const pentecostes = somarDias(domingoPascoa, 49);

	if (hoje >= inicioAdvento(ano) && hoje < new Date(ano, 11, 25))
		return TEMPOS.advento;
	if (hoje >= new Date(ano, 11, 25) || hoje <= batismoDoSenhor(ano))
		return TEMPOS.natal;
	if (hoje >= cinzas && hoje < domingoPascoa) return TEMPOS.quaresma;
	if (hoje >= domingoPascoa && hoje <= pentecostes) return TEMPOS.pascoa;
	return TEMPOS.comum;
}

const DIAS = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
];

export interface ProximaMissa {
	quando: string;
	horario: string;
	descricao: string;
}

export function proximaMissa(agora: Date): ProximaMissa | null {
	const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

	for (let offset = 0; offset < 8; offset++) {
		const indice = (agora.getDay() + offset) % 7;
		const missa = horariosMissas.find((m) => m.dia === DIAS[indice]);
		if (!missa) continue;

		const horario = missa.horarios.find((h) => {
			const [hora, minuto] = h.split(":").map(Number);
			return offset > 0 || hora * 60 + minuto > minutosAgora;
		});
		if (!horario) continue;

		const quando =
			offset === 0 ? "Hoje" : offset === 1 ? "Amanhã" : missa.dia;
		return { quando, horario, descricao: missa.descricao };
	}
	return null;
}
