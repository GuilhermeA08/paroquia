import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Painel de notícias | Paróquia de Sant’Ana",
	robots: { index: false, follow: false },
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
			{children}
		</div>
	);
}
