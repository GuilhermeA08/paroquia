// Dados da Paróquia de Sant’Ana — Campo Grande/RN
// Campos vazios ("") ainda não foram confirmados pela secretaria e ficam ocultos no site.

export const paroquiaInfo = {
	nome: "Paróquia de Sant’Ana",
	site: "https://www.paroquiadesantanacgrn.com.br",
	diocese: "Diocese de Mossoró",
	siteDiocese: "https://diocesedemossoro.com.br/",
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
		facebook: "https://www.facebook.com/paroquiadesantaana.com.br/",
		instagram: "https://www.instagram.com/paroquiade_santana/",
		youtube: "https://www.youtube.com/@paroquiadesantana-campogra9582",
	},
};

// Regra de recorrência: toda semana, ou só numa ocorrência do dia no mês
// (ex.: "terceira-do-mes" com diaSemana 0 é o terceiro domingo do mês)
export type Recorrencia =
	| "semanal"
	| "primeira-do-mes"
	| "segunda-do-mes"
	| "terceira-do-mes"
	| "quarta-do-mes"
	| "ultima-do-mes";

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

// Igrejas e capelas da paróquia. Campos vazios ("") ficam ocultos no site.
export interface Comunidade {
	slug: string;
	nome: string;
	// Bairro, na cidade, ou sítio/povoado, na zona rural
	localidade: string;
	zona: "urbana" | "rural";
	padroeiro: string;
	// Ex.: "13 de maio"
	festa: string;
	foto: string;
	// Plus Code, coordenadas ou endereço, como se digita na busca do Google Maps
	mapa: string;
	historico: string;
	missas: Missa[];
}

export const matriz: Comunidade = {
	slug: "matriz",
	nome: paroquiaInfo.igreja,
	localidade: `${paroquiaInfo.endereco.rua}, ${paroquiaInfo.endereco.bairro}`,
	zona: "urbana",
	padroeiro: "Sant’Ana",
	festa: "26 de julho",
	foto: "/images/igreja/matriz-fachada.jpg",
	mapa: paroquiaInfo.plusCode,
	historico: "Sede da paróquia, criada em 1837.",
	missas: horariosMissas,
};

// Fotos das capelas vão em public/images/comunidades
export const capelas: Comunidade[] = [
	{
		slug: "nossa-senhora-de-fatima",
		nome: "Capela de Nossa Senhora de Fátima",
		localidade: "",
		zona: "urbana",
		padroeiro: "Nossa Senhora de Fátima",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	{
		slug: "nossa-senhora-aparecida",
		nome: "Capela de Nossa Senhora Aparecida",
		localidade: "Sítio Morcego",
		zona: "rural",
		padroeiro: "Nossa Senhora Aparecida",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	{
		slug: "nossa-senhora-do-bom-parto",
		nome: "Capela de Nossa Senhora do Bom Parto",
		localidade: "Bom Jesus",
		zona: "rural",
		padroeiro: "Nossa Senhora do Bom Parto",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	{
		slug: "sao-francisco",
		nome: "Capela de São Francisco",
		localidade: "Sítio Caiana",
		zona: "rural",
		padroeiro: "São Francisco de Assis",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	{
		slug: "santa-barbara",
		nome: "Capela de Santa Bárbara",
		localidade: "Sítio Cabeça do Boi",
		zona: "rural",
		padroeiro: "Santa Bárbara",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	{
		slug: "sao-jose",
		nome: "Capela de São José",
		localidade: "Sítio Salgado",
		zona: "rural",
		padroeiro: "São José",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	{
		slug: "santo-antonio",
		nome: "Capela de Santo Antônio",
		localidade: "Sítio Lagoinha",
		zona: "rural",
		padroeiro: "Santo Antônio",
		festa: "",
		foto: "",
		mapa: "",
		historico: "",
		missas: [],
	},
	// Para pôr missas numa capela, preencha "missas" como em horariosMissas, ex.:
	// missas: [{ dia: "Terceiro domingo do mês", diaSemana: 0, recorrencia: "terceira-do-mes",
	//   horarios: ["09:00"], descricao: "Missa na comunidade", destaque: false }]
];

export const comunidades = [matriz, ...capelas];

export const outrosHorarios: {
	confissao?: string;
	adoracao?: string;
	secretaria?: string;
} = {};

export const historia = {
	titulo: "Nossa história",
	subtitulo: "A fé em Sant’Ana em Campo Grande desde o século XVIII",
	// Texto de abertura enviado pela secretaria paroquial
	introducao:
		"A Paróquia de Sant’Ana, com sede em Campo Grande, foi criada em 1837, quando a sede da diocese era Olinda, em Pernambuco. De lá vinham missionários capuchinhos, jesuítas e carmelitas para evangelizar o alto oeste do Rio Grande do Norte, marcando há mais de dois séculos a presença da Igreja no meio das comunidades que hoje formam a Diocese de Santa Luzia de Mossoró.",
	conteudo: [
		{
			ano: "c. 1720",
			titulo: "Fazenda Campo Grande",
			texto:
				"O Capitão-mor Manoel Ignácio d’Oliveira Gondim ergue a Fazenda Campo Grande, nas extensas campinas da margem esquerda do rio Upanema, que dão nome ao lugar. Antes dele, a Serra Cepilhada era habitada pelos índios Pêgas, da nação dos tapuias.",
		},
		{
			ano: "1756",
			titulo: "Doação do terreno da capela",
			texto:
				"É doado o terreno para a construção de uma capela em honra de Sant’Ana, marco do surgimento da povoação.",
		},
		{
			ano: "1761",
			titulo: "A povoação de Campo Grande",
			texto:
				"O sargento-mor João do Vale Bezerra adquire as terras da serra Cepilhada, que passa a se chamar Serra de João do Vale. Em torno das casas da família e da capela de Sant’Ana nasce a povoação de Campo Grande.",
		},
		{
			ano: "1766",
			titulo: "Primeira missa",
			texto:
				"Em agosto de 1766 é celebrada a primeira missa na capela de Sant’Ana.",
		},
		{
			ano: "1837",
			titulo: "Criação da paróquia",
			texto:
				"A Lei Provincial nº 17, de 31 de outubro de 1837, cria a freguesia de Sant’Ana de Campo Grande de Upanema, desmembrada da de São João Batista do Assú. O primeiro vigário, Pe. Victor Antônio de Freitas, serve à paróquia até falecer, em 1839.",
		},
		{
			ano: "c. 1870",
			titulo: "A música dos padres portugueses",
			texto:
				"Padres portugueses chegam para o trabalho pastoral na então Vila do Triunfo e deixam um gosto pela música que perdura até hoje na cidade.",
		},
		{
			ano: "1940",
			titulo: "Pe. Militão",
			texto:
				"Começa o paroquiato do Pe. Militão Benedito de Mendonça, o mais longo da história da paróquia: de 1940 a 1961 e, de novo, de 1972 a 1973.",
		},
		{
			ano: "1979",
			titulo: "Pe. Pedro Neefs",
			texto:
				"Em 5 de agosto de 1979 chega o Pe. Pedro Neefs, que conduz a paróquia por mais de 25 anos, até 2006.",
		},
		{
			ano: "Hoje",
			titulo: "Diocese de Santa Luzia de Mossoró",
			texto:
				"A paróquia pertence à Diocese de Santa Luzia de Mossoró e tem como pároco, desde 2022, o Pe. Possidio Lopes dos Santos Neto. Todo mês de julho celebra a festa da padroeira, com novenário e procissão pelas ruas da cidade.",
		},
	],
};

// Relação dos padres da paróquia, conforme a lista enviada pela secretaria
export const padres = [
	{
		periodo: "1837",
		nomes: "Pe. Victor Antônio de Freitas",
	},
	{
		periodo: "1838",
		nomes: "Pe. Florêncio G. de Oliveira",
	},
	{
		periodo: "1841",
		nomes: "Pe. Manoel Bezerra Cavalcante",
	},
	{
		periodo: "1870",
		nomes: "Pe. Luiz Marinho de Freitas",
	},
	{
		periodo: "1871",
		nomes: "Pe. Manoel Bezerra Cavalcante",
	},
	{
		periodo: "1872",
		nomes: "Pe. Amaro Theot Castor Brasil",
	},
	{
		periodo: "1875",
		nomes: "Pe. Manoel Bezerra Cavalcante",
	},
	{
		periodo: "1885",
		nomes: "Pe. Manoel Bezerra Cavalcante",
	},
	{
		periodo: "1892",
		nomes: "Pe. Amaro Theot Castor Brasil",
	},
	{
		periodo: "1900",
		nomes: "Pe. Abel Villar Alves Pequeno",
	},
	{
		periodo: "1900",
		nomes: "Pe. José Antônio da Silva Pinto",
	},
	{
		periodo: "1920",
		nomes: "Pe. Benedito Basílio Alves",
	},
	{
		periodo: "1920",
		nomes: "Pe. Jorge Annekenz",
	},
	{
		periodo: "1923",
		nomes: "Pe. Abel Villar Alves Bezerra",
	},
	{
		periodo: "1926",
		nomes: "Pe. Júlio Alves Bezerra",
	},
	{
		periodo: "1927",
		nomes: "Pe. Alesbão Gurgel",
	},
	{
		periodo: "1931",
		nomes: "Pe. Francisco Scholz",
	},
	{
		periodo: "1932",
		nomes: "Pe. Geraldo M. V. de Geld",
	},
	{
		periodo: "1932",
		nomes: "Pe. Nathanael Ergias de Medeiros",
	},
	{
		periodo: "1933",
		nomes: "Pe. Raymundo Leão",
	},
	{
		periodo: "1933",
		nomes: "Pe. Nathanael Ergias de Medeiros",
	},
	{
		periodo: "1934",
		nomes: "Pe. Francisco Mário",
	},
	{
		periodo: "1936",
		nomes: "Pe. Francisco Pastors",
	},
	{
		periodo: "1936",
		nomes: "Pe. Alexandrino Suassuna de Alencar",
	},
	{
		periodo: "1938",
		nomes: "Pe. Júlio Bezerra",
	},
	{
		periodo: "1938",
		nomes: "Pe. Alexandrino Suassuna de Alencar",
	},
	{
		periodo: "1938",
		nomes: "Pe. Ismar Fernandes",
	},
	{
		periodo: "1939",
		nomes: "Pe. João Wagner",
	},
	{
		periodo: "1940",
		nomes: "Pe. Militão Benedito de Mendonça",
	},
	{
		periodo: "1973",
		nomes: "Frei Basílio de Lima, OFM",
	},
	{
		periodo: "1978",
		nomes: "Pe. José do Vale",
	},
	{
		periodo: "1979",
		nomes: "Pe. Pedro Neefs (desde 5 de agosto)",
	},
	{
		periodo: "1987",
		nomes: "Pe. Pedro Neefs e Pe. Geraldo Van Geel",
	},
	{
		periodo: "1993",
		nomes: "Pe. Pedro Neefs e Pe. Marcos Antônio",
	},
	{
		periodo: "1995",
		nomes: "Pe. Pedro Neefs",
	},
	{
		periodo: "1997",
		nomes: "Pe. Pedro Neefs e Pe. Tarcísio Pereira de Paiva",
	},
	{
		periodo: "1998",
		nomes:
			"Pe. Pedro Neefs, Pe. Tarcísio Pereira de Paiva e Pe. Josenildo Cândido do Nascimento",
	},
	{
		periodo: "2000",
		nomes: "Pe. Pedro Neefs e Pe. Josenildo Cândido do Nascimento",
	},
	{
		periodo: "2002",
		nomes:
			"Pe. Pedro Neefs, Pe. Josenildo Cândido do Nascimento e Pe. João Barbosa",
	},
	{
		periodo: "2004",
		nomes:
			"Pe. Pedro Neefs, Pe. Josenildo Cândido do Nascimento e Pe. Alexsandro Fernandes Marinho",
	},
	{
		periodo: "2005",
		nomes: "Pe. Pedro Neefs e Pe. Josenildo Cândido do Nascimento",
	},
	{
		periodo: "2005",
		nomes:
			"Pe. Pedro Neefs, Pe. Josenildo Cândido do Nascimento e Pe. Francisco Belarmino Gomes",
	},
	{
		periodo: "2006",
		nomes:
			"Pe. Pedro Neefs, Pe. Francisco Belarmino Gomes, Pe. Josemar Joaquim de Lima (19/08/2006) e Diácono José do Egito Freire (dezembro de 2006)",
	},
	{
		periodo: "2006",
		nomes:
			"Pe. Francisco Belarmino Gomes, Pe. Josemar Joaquim de Lima e Diácono José do Egito Freire",
	},
	{
		periodo: "2009",
		nomes: "Pe. Tarcísio Pereira de Paiva e Pe. José do Egito Freire",
	},
	{
		periodo: "2010",
		nomes: "Pe. Tarcísio Pereira de Paiva",
	},
	{
		periodo: "2011",
		nomes: "Pe. Tarcísio Pereira de Paiva e Pe. Iraildo Ramos",
	},
	{
		periodo: "2012",
		nomes: "Pe. Tarcísio Pereira de Paiva",
	},
	{
		periodo: "2013",
		nomes: "Pe. Tarcísio Pereira de Paiva e Pe. Ramilson Raimundo de Moura",
	},
	{
		periodo: "2014",
		nomes: "Pe. Ramilson Raimundo de Moura",
	},
	{
		periodo: "2016",
		nomes: "Pe. Eliseu Wilton de Maria",
	},
	{
		periodo: "2017",
		nomes: "Pe. Eliseu Wilton de Maria",
	},
	{
		periodo: "2018–2020",
		nomes: "Pe. Eliseu Wilton de Maria e Pe. Rafael Andrade da Silva",
	},
	{
		periodo: "2020–2021",
		nomes: "Pe. Antônio Carlos Dantas (Pe. Carlinhos)",
	},
	{
		periodo: "2022–hoje",
		nomes: "Pe. Possidio Lopes dos Santos Neto",
	},
];

// Fotos em ordem cronológica, com a legenda original recortada:
// nome e período aparecem como texto no site
export const fotosPadres = [
	{
		nome: "Pe. Militão Benedito de Mendonça",
		periodo: "1940–1961 e 1972–1973",
		foto: "/images/padres/militao-benedito-de-mendonca.jpg",
	},
	{
		nome: "Frei Basílio de Lima",
		periodo: "1973–1987",
		foto: "/images/padres/frei-basilio-de-lima.jpg",
	},
	{
		nome: "Pe. José do Vale",
		periodo: "1978",
		foto: "/images/padres/jose-do-vale.jpg",
	},
	{
		nome: "Pe. Pedro Neefs",
		periodo: "1979–2006",
		foto: "/images/padres/pedro-neefs.jpg",
	},
	{
		nome: "Pe. Geraldo Van Geel",
		periodo: "1987–1989",
		foto: "/images/padres/geraldo-van-geel.jpg",
	},
	{
		nome: "Pe. Marcos Antônio",
		periodo: "1993",
		foto: "/images/padres/marcos-antonio.jpg",
	},
	{
		nome: "Pe. Tarcísio Pereira de Paiva",
		periodo: "1997–2002 e 2009–2014",
		foto: "/images/padres/tarcisio-pereira-de-paiva.jpg",
	},
	{
		nome: "Pe. Josenildo Cândido do Nascimento",
		periodo: "1997 e 2005–2006",
		foto: "/images/padres/josenildo-candido-do-nascimento.jpg",
	},
	{
		nome: "Pe. João Barbosa Batista",
		periodo: "2002–2003",
		foto: "/images/padres/joao-barbosa-batista.jpg",
	},
	{
		nome: "Pe. Alexsandro Fernandes Marinho",
		periodo: "2003–2004",
		foto: "/images/padres/alexsandro-fernandes-marinho.jpg",
	},
	{
		nome: "Pe. Francisco Belarmino Gomes",
		periodo: "2005–2008",
		foto: "/images/padres/francisco-belarmino-gomes.jpg",
	},
	{
		nome: "Pe. José do Egito Freire",
		periodo: "2006–2009",
		foto: "/images/padres/jose-do-egito-freire.jpg",
	},
	{
		nome: "Pe. Josemar Joaquim de Lima",
		periodo: "2006–2008",
		foto: "/images/padres/josemar-joaquim-de-lima.jpg",
	},
	{
		nome: "Pe. Iraildo Ramos",
		periodo: "2011",
		foto: "/images/padres/iraildo-ramos.jpg",
	},
	{
		nome: "Pe. Ramilson Raimundo de Moura",
		periodo: "2013–2015",
		foto: "/images/padres/ramilson-raimundo-de-moura.jpg",
	},
	{
		nome: "Pe. Eliseu Wilton de Maria",
		periodo: "2016–2020",
		foto: "/images/padres/eliseu-wilton-de-maria.jpg",
	},
	{
		nome: "Pe. Rafael Andrade da Silva",
		periodo: "2019",
		foto: "/images/padres/rafael-andrade-da-silva.jpg",
	},
	{
		nome: "Pe. Antônio Carlos Dantas (Pe. Carlinhos)",
		periodo: "2020–2021",
		foto: "/images/padres/antonio-carlos-dantas.jpg",
	},
	{
		nome: "Pe. Possidio Lopes dos Santos Neto",
		periodo: "Pároco desde 2022",
		foto: "/images/padres/possidio-lopes-dos-santos-neto.jpg",
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
	{
		id: 3,
		nome: "Foto da Igreja Matriz",
		arquivo: "/downloads/igreja-matriz-sant-ana.jpg",
		formato: "JPG",
		tamanho: "4000 × 3000 px · alta resolução",
		preview: "/images/gallery/igreja-e-cruzeiro.jpg",
		foto: true,
	},
];

// Fotos da galeria em public/images/gallery (JPEG, até 1600 px)
export const galeriaFotos = [
	{
		id: 11,
		titulo: "A Matriz e o cruzeiro",
		categoria: "Igreja",
		imagem: "/images/gallery/igreja-e-cruzeiro.jpg",
	},
	{
		id: 12,
		titulo: "A Matriz vista da praça",
		categoria: "Igreja",
		imagem: "/images/gallery/igreja-e-praca.jpg",
	},
	{
		id: 13,
		titulo: "Vista aérea da Matriz e da cidade",
		categoria: "Igreja",
		imagem: "/images/gallery/igreja-vista-aerea.jpg",
	},
	{
		id: 1,
		titulo: "Fachada da Igreja Matriz",
		categoria: "Igreja",
		imagem: "/images/gallery/fachada-da-igreja.jpg",
	},
	{
		id: 2,
		titulo: "Imagem de Sant’Ana",
		categoria: "Igreja",
		imagem: "/images/gallery/imagem-de-santana.jpg",
	},
	{
		id: 3,
		titulo: "Coroinha em oração",
		categoria: "Celebrações",
		imagem: "/images/gallery/comunhao.jpg",
	},
	{
		id: 4,
		titulo: "Distribuição da comunhão",
		categoria: "Celebrações",
		imagem: "/images/gallery/comunhao2.jpg",
	},
	{
		id: 5,
		titulo: "Adoração ao Santíssimo",
		categoria: "Celebrações",
		imagem: "/images/gallery/adoracao-ao-santissimo.jpg",
	},
	{
		id: 6,
		titulo: "O terço na novena",
		categoria: "Novena",
		imagem: "/images/gallery/novena.jpg",
	},
	{
		id: 7,
		titulo: "Oração na novena",
		categoria: "Novena",
		imagem: "/images/gallery/novena2.jpg",
	},
	{
		id: 8,
		titulo: "Procissão pelas ruas",
		categoria: "Procissão",
		imagem: "/images/gallery/procissao.jpg",
	},
	{
		id: 9,
		titulo: "Devoção a Sant’Ana nas famílias",
		categoria: "Procissão",
		imagem: "/images/gallery/procissao2.jpg",
	},
	{
		id: 10,
		titulo: "Promessa de pés descalços",
		categoria: "Procissão",
		imagem: "/images/gallery/promessa.jpg",
	},
];

export const dadosPix = {
	// Chave copiada sem pontuação; a versão formatada é só para exibição
	chave: "08264111001784",
	chaveFormatada: "08.264.111/0017-84",
	tipoChave: "CNPJ",
	nomeBeneficiario: "Paróquia de Sant’Ana",
	cidade: "Campo Grande",
	qrCodeImagem: "/images/pix/qrcode-pix.png",
};

export const menuItems = [
	{ label: "Início", href: "/" },
	{ label: "História", href: "/historia" },
	{ label: "Localização", href: "/localizacao" },
	{ label: "Comunidades", href: "/comunidades" },
	{ label: "Missas", href: "/missas" },
	{ label: "Downloads", href: "/downloads" },
	{ label: "Galeria", href: "/galeria" },
	{ label: "Doações", href: "/doacoes" },
	{ label: "Notícias", href: "/noticias" },
];
