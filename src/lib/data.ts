// Dados da Paróquia de Santana

export const paroquiaInfo = {
	nome: "Paróquia de Santana",
	endereco: {
		rua: "Rua da Paróquia, 123",
		bairro: "Centro",
		cidade: "Sua Cidade",
		estado: "SP",
		cep: "00000-000",
	},
	telefone: "(00) 0000-0000",
	email: "contato@paroquiasantana.com.br",
	redesSociais: {
		facebook: "https://facebook.com/paroquiasantana",
		instagram: "https://instagram.com/paroquiasantana",
		youtube: "https://youtube.com/@paroquiasantana",
	},
};

export const horariosMissas = [
	{
		dia: "Domingo",
		horarios: ["08:00", "10:00", "19:00"],
		descricao: "Missa Dominical",
		destaque: true,
	},
	{
		dia: "Segunda-feira",
		horarios: ["19:00"],
		descricao: "Missa Vespertina",
		destaque: false,
	},
	{
		dia: "Terça-feira",
		horarios: ["19:00"],
		descricao: "Missa Vespertina",
		destaque: false,
	},
	{
		dia: "Quarta-feira",
		horarios: ["19:00"],
		descricao: "Missa Vespertina",
		destaque: false,
	},
	{
		dia: "Quinta-feira",
		horarios: ["19:00"],
		descricao: "Missa Vespertina",
		destaque: false,
	},
	{
		dia: "Sexta-feira",
		horarios: ["19:00"],
		descricao: "Missa Vespertina",
		destaque: false,
	},
	{
		dia: "Sábado",
		horarios: ["19:00"],
		descricao: "Missa de Vigília",
		destaque: true,
	},
];

export const outrosHorarios = {
	confissao: "Sábados das 16:00 às 18:00",
	adoracao: "Quintas-feiras após a missa das 19:00",
	secretaria: "Segunda a Sexta, das 09:00 às 17:00",
};

export const historia = {
	titulo: "Nossa História",
	subtitulo: "Mais de um século de fé e tradição",
	conteudo: [
		{
			ano: "1900",
			titulo: "Fundação",
			texto:
				"A Paróquia de Santana foi fundada no início do século XX, quando os primeiros fiéis se reuniram para construir um pequeno templo dedicado à Santa Ana, mãe de Nossa Senhora.",
		},
		{
			ano: "1950",
			titulo: "Construção da Igreja Atual",
			texto:
				"Com o crescimento da comunidade, foi iniciada a construção do atual templo, seguindo o estilo arquitetônico tradicional que caracteriza nossa igreja até hoje.",
		},
		{
			ano: "1980",
			titulo: "Expansão Comunitária",
			texto:
				"Foram criados diversos grupos pastorais e movimentos, ampliando a atuação da paróquia na comunidade e no serviço aos mais necessitados.",
		},
		{
			ano: "Presente",
			titulo: "Continuidade da Missão",
			texto:
				"Hoje, a Paróquia de Santana continua sua missão evangelizadora, acolhendo fiéis de todas as idades e promovendo a fé católica através de diversas atividades e celebrações.",
		},
	],
};

export const noticias = [
	{
		id: 1,
		slug: "festa-padroeira-2026",
		titulo: "Festa da Padroeira 2026",
		resumo:
			"Prepare-se para a nossa tradicional Festa de Santana! Confira a programação completa.",
		conteudo:
			"A Paróquia de Santana convida toda a comunidade para participar da tradicional Festa da Padroeira, que acontecerá do dia 20 a 26 de julho. A programação inclui novenas, missas festivas, quermesse e muito mais.",
		data: "2026-02-20",
		imagem: "/images/noticias/festa-padroeira.jpg",
	},
	{
		id: 2,
		slug: "horarios-quaresma",
		titulo: "Horários Especiais na Quaresma",
		resumo:
			"Confira os horários especiais de missas e celebrações durante o período quaresmal.",
		conteudo:
			"Durante a Quaresma, teremos horários especiais para as celebrações. Via Sacra às sextas-feiras após a missa das 19h. Confissões com horário estendido aos sábados.",
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
			"A Pastoral Social está realizando uma campanha de arrecadação de alimentos não perecíveis. Os itens podem ser entregues na secretaria paroquial de segunda a sexta.",
		data: "2026-02-10",
		imagem: "/images/noticias/solidariedade.jpg",
	},
];

export const logosDownload = [
	{
		id: 1,
		nome: "Logo Principal - Colorido",
		arquivo: "/logos/logo-paroquia-colorido.png",
		formato: "PNG",
		tamanho: "1024x1024",
		preview: "/logos/preview-colorido.png",
	},
	{
		id: 2,
		nome: "Logo Principal - Branco",
		arquivo: "/logos/logo-paroquia-branco.png",
		formato: "PNG",
		tamanho: "1024x1024",
		preview: "/logos/preview-branco.png",
	},
	{
		id: 3,
		nome: "Logo Principal - Preto",
		arquivo: "/logos/logo-paroquia-preto.png",
		formato: "PNG",
		tamanho: "1024x1024",
		preview: "/logos/preview-preto.png",
	},
	{
		id: 4,
		nome: "Logo Vetorial",
		arquivo: "/logos/logo-paroquia.svg",
		formato: "SVG",
		tamanho: "Vetorial",
		preview: "/logos/preview-colorido.png",
	},
];

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
	chave: "00.000.000/0001-00",
	tipoChave: "CNPJ",
	nomeBeneficiario: "Paróquia de Santana",
	cidade: "Sua Cidade",
	qrCodeImagem: "/images/qrcode-pix.png",
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
