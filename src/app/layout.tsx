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
	title: "Paróquia de Santana",
	description:
		"Site oficial da Paróquia de Santana. Conheça nossa história, horários de missas, localização e muito mais.",
	keywords: [
		"paróquia",
		"santana",
		"igreja",
		"católica",
		"missa",
		"comunidade",
	],
	authors: [{ name: "Paróquia de Santana" }],
	openGraph: {
		title: "Paróquia de Santana",
		description: "Site oficial da Paróquia de Santana",
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
