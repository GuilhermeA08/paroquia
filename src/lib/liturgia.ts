// Calendário litúrgico simplificado: tempo do ano e cor, e próxima missa

import { comunidades, type Missa, type Recorrencia } from "@/lib/data";

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

export interface ProximaMissa {
	quando: string;
	horario: string;
	descricao: string;
	local: string;
	slugLocal: string;
}

const SEMANA_DO_MES: Partial<Record<Recorrencia, number>> = {
	"primeira-do-mes": 1,
	"segunda-do-mes": 2,
	"terceira-do-mes": 3,
	"quarta-do-mes": 4,
};

export function rotuloRecorrencia(recorrencia: Recorrencia) {
	return recorrencia === "semanal" ? "Toda semana" : "Todo mês";
}

function celebraNoDia(missa: Missa, data: Date) {
	if (data.getDay() !== missa.diaSemana) return false;
	if (missa.recorrencia === "semanal") return true;
	if (missa.recorrencia === "ultima-do-mes") {
		return data.getMonth() !== somarDias(data, 7).getMonth();
	}
	// O dia 1–7 é a primeira ocorrência daquele dia da semana, 8–14 a segunda, e assim por diante
	return Math.ceil(data.getDate() / 7) === SEMANA_DO_MES[missa.recorrencia];
}

function minutos(horario: string) {
	const [hora, minuto] = horario.split(":").map(Number);
	return hora * 60 + minuto;
}

export function proximaMissa(agora: Date): ProximaMissa | null {
	const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

	const missas = comunidades.flatMap((comunidade) =>
		comunidade.missas.map((missa) => ({ missa, comunidade })),
	);

	// Procura nas próximas seis semanas, para alcançar as missas mensais
	for (let offset = 0; offset < 42; offset++) {
		const data = somarDias(agora, offset);
		const candidatas = missas
			.filter(({ missa }) => celebraNoDia(missa, data))
			.flatMap(({ missa, comunidade }) =>
				missa.horarios.map((horario) => ({ horario, missa, comunidade })),
			)
			.filter(({ horario }) => offset > 0 || minutos(horario) > minutosAgora)
			.sort((a, b) => minutos(a.horario) - minutos(b.horario));

		const proxima = candidatas[0];
		if (!proxima) continue;

		const quando =
			offset === 0
				? "Hoje"
				: offset === 1
					? "Amanhã"
					: data.toLocaleDateString("pt-BR", {
							weekday: "long",
							day: "numeric",
							month: "long",
						});
		return {
			quando: quando.charAt(0).toUpperCase() + quando.slice(1),
			horario: proxima.horario,
			descricao: proxima.missa.descricao,
			local: proxima.comunidade.nome,
			slugLocal: proxima.comunidade.slug,
		};
	}
	return null;
}
