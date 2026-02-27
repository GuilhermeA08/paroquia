import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	display: "swap",
});

const openSans = Open_Sans({
	variable: "--font-open-sans",
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
				className={`${playfair.variable} ${openSans.variable} antialiased min-h-screen flex flex-col`}
			>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
