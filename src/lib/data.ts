// Dados da Paróquia de Sant’Ana — Campo Grande/RN
// Campos vazios ("") ainda não foram confirmados pela secretaria e ficam ocultos no site.

export const paroquiaInfo = {
	nome: "Paróquia de Sant’Ana",
	diocese: "Diocese de Mossoró",
	fundacao: "1837",
	paroco: "Pe. Possidio Lopes dos Santos Neto",
	igreja: "Igreja Matriz de Sant’Ana",
	endereco: {
		rua: "Rua Padre Pinto, 130",
		bairro: "Centro",
		cidade: "Campo Grande",
		estado: "RN",
		cep: "59680-000",
	},
	// Plus Code da matriz no Google Maps
	plusCode: "69644MPR+73",
	telefone: "(84) 99909-0032",
	email: "",
	redesSociais: {
		facebook: "",
		instagram: "",
		youtube: "",
	},
};

// Regra de recorrência: toda semana, ou só na primeira ocorrência do dia no mês
export type Recorrencia = "semanal" | "primeira-do-mes";

export interface Missa {
	dia: string;
	diaSemana: number;
	recorrencia: Recorrencia;
	horarios: string[];
	descricao: string;
	destaque: boolean;
}

export const horariosMissas: Missa[] = [
	{
		dia: "Domingo",
		diaSemana: 0,
		recorrencia: "semanal",
		horarios: ["08:00", "19:00"],
		descricao: "Missa dominical",
		destaque: true,
	},
	{
		dia: "Primeira sexta-feira do mês",
		diaSemana: 5,
		recorrencia: "primeira-do-mes",
		horarios: ["08:00"],
		descricao: "Missa do Sagrado Coração de Jesus",
		destaque: false,
	},
];

export const outrosHorarios: {
	confissao?: string;
	adoracao?: string;
	secretaria?: string;
} = {};

export const historia = {
	titulo: "Nossa história",
	subtitulo: "A fé em Sant’Ana em Campo Grande desde o século XVIII",
	conteudo: [
		{
			ano: "1756",
			titulo: "Doação das terras",
			texto:
				"As terras para a construção de uma capela em honra de Nossa Senhora Sant’Ana são doadas, no lugar que daria origem à cidade de Campo Grande.",
		},
		{
			ano: "1766",
			titulo: "Primeira missa",
			texto:
				"Em agosto de 1766 é celebrada a primeira missa na capela de Sant’Ana, que passa a reunir os moradores da região do rio Upanema.",
		},
		{
			ano: "1837",
			titulo: "Criação da paróquia",
			texto:
				"Em 31 de outubro de 1837 é criada a Paróquia de Sant’Ana, data que está registrada no brasão da paróquia.",
		},
		{
			ano: "Hoje",
			titulo: "Diocese de Mossoró",
			texto:
				"A paróquia pertence à Diocese de Mossoró e celebra todo mês de julho a festa da padroeira, com novenário e procissão pelas ruas da cidade.",
		},
	],
};

// Notícias de exemplo: substituir pelos avisos reais da paróquia
export const noticias = [
	{
		id: 1,
		slug: "festa-padroeira-2026",
		titulo: "Festa da Padroeira 2026",
		resumo:
			"Prepare-se para a nossa tradicional Festa de Sant’Ana! Confira a programação completa.",
		conteudo:
			"A Paróquia de Sant’Ana convida toda a comunidade para participar da tradicional Festa da Padroeira, em julho. A programação inclui novenário, missas festivas e procissão.",
		data: "2026-02-20",
		imagem: "/images/noticias/festa-padroeira.jpg",
	},
	{
		id: 2,
		slug: "horarios-quaresma",
		titulo: "Celebrações na Quaresma",
		resumo: "Confira as celebrações especiais durante o período quaresmal.",
		conteudo:
			"Durante a Quaresma, a paróquia terá celebrações especiais, como a Via Sacra. Acompanhe os avisos para saber os dias e horários.",
		data: "2026-02-15",
		imagem: "/images/noticias/quaresma.jpg",
	},
	{
		id: 3,
		slug: "campanha-solidariedade",
		titulo: "Campanha de Solidariedade",
		resumo:
			"Participe da nossa campanha de arrecadação de alimentos para famílias necessitadas.",
		conteudo:
			"A paróquia está realizando uma campanha de arrecadação de alimentos não perecíveis. Os itens podem ser entregues na igreja matriz.",
		data: "2026-02-10",
		imagem: "/images/noticias/solidariedade.jpg",
	},
];

export const logosDownload = [
	{
		id: 1,
		nome: "Brasão da paróquia",
		arquivo: "/logos/brasao-paroquia-5310.png",
		formato: "PNG",
		tamanho: "5310 × 5310 px · alta resolução",
		preview: "/logos/brasao-paroquia-web.png",
	},
	{
		id: 2,
		nome: "Brasão da paróquia",
		arquivo: "/logos/brasao-paroquia-1024.png",
		formato: "PNG",
		tamanho: "1024 × 1024 px · para redes sociais",
		preview: "/logos/brasao-paroquia-web.png",
	},
];

// Fotos de exemplo: substituir pelas fotos reais em materiais/fotos
export const galeriaFotos = [
	{
		id: 1,
		titulo: "Fachada da Igreja",
		categoria: "Igreja",
		imagem: "/images/gallery/fachada.jpg",
	},
	{
		id: 2,
		titulo: "Interior do Templo",
		categoria: "Igreja",
		imagem: "/images/gallery/interior.jpg",
	},
	{
		id: 3,
		titulo: "Altar-mor",
		categoria: "Igreja",
		imagem: "/images/gallery/altar.jpg",
	},
	{
		id: 4,
		titulo: "Missa Dominical",
		categoria: "Celebrações",
		imagem: "/images/gallery/missa.jpg",
	},
	{
		id: 5,
		titulo: "Festa da Padroeira 2025",
		categoria: "Eventos",
		imagem: "/images/gallery/festa.jpg",
	},
	{
		id: 6,
		titulo: "Coral Paroquial",
		categoria: "Grupos",
		imagem: "/images/gallery/coral.jpg",
	},
];

export const dadosPix = {
	// Chave copiada sem pontuação; a versão formatada é só para exibição
	chave: "08264111001784",
	chaveFormatada: "08.264.111/0017-84",
	tipoChave: "CNPJ",
	nomeBeneficiario: "Paróquia de Sant’Ana",
	cidade: "Campo Grande",
	qrCodeImagem: "",
};

export const menuItems = [
	{ label: "Início", href: "/" },
	{ label: "História", href: "/historia" },
	{ label: "Localização", href: "/localizacao" },
	{ label: "Missas", href: "/missas" },
	{ label: "Downloads", href: "/downloads" },
	{ label: "Galeria", href: "/galeria" },
	{ label: "Doações", href: "/doacoes" },
	{ label: "Notícias", href: "/noticias" },
];
