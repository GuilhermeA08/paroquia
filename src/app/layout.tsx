import type { Metadata } from "next";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const garamond = EB_Garamond({
	variable: "--font-garamond",
	subsets: ["latin"],
	display: "swap",
});

const sourceSans = Source_Sans_3({
	variable: "--font-source",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.paroquiadesantanacgrn.com.br"),
	title: "Paróquia de Sant’Ana",
	description:
		"Site oficial da Paróquia de Sant’Ana de Campo Grande/RN, Diocese de Mossoró. Conheça nossa história, horários de missas, localização e muito mais.",
	keywords: [
		"paróquia",
		"sant’ana",
		"campo grande",
		"rio grande do norte",
		"diocese de mossoró",
		"igreja",
		"católica",
		"missa",
		"comunidade",
	],
	authors: [{ name: "Paróquia de Sant’Ana" }],
	openGraph: {
		title: "Paróquia de Sant’Ana · Campo Grande/RN",
		description:
			"Missas aos domingos às 8h e 19h. Horários, história, comunidades e notícias da paróquia. Diocese de Mossoró.",
		url: "/",
		siteName: "Paróquia de Sant’Ana",
		type: "website",
		locale: "pt_BR",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${garamond.variable} ${sourceSans.variable} antialiased min-h-screen flex flex-col`}
			>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
