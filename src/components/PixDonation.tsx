"use client";

import Image from "next/image";
import { useState } from "react";

interface PixDonationProps {
	chave: string;
	tipoChave: string;
	nomeBeneficiario: string;
	qrCodeImagem: string;
}

export default function PixDonation({
	chave,
	tipoChave,
	nomeBeneficiario,
	qrCodeImagem,
}: PixDonationProps) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(chave);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback para navegadores mais antigos
			const textArea = document.createElement("textarea");
			textArea.value = chave;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
			{/* Header */}
			<div className="bg-primary px-6 py-8 text-center">
				<div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
					<svg
						className="w-8 h-8 text-primary-dark"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 className="text-2xl font-serif font-bold text-white mb-2">
					Faça sua Doação
				</h3>
				<p className="text-white/80 text-sm">
					Sua contribuição ajuda a manter nossa paróquia
				</p>
			</div>

			{/* QR Code */}
			<div className="p-6">
				<div className="bg-cream rounded-xl p-6 mb-6">
					<div className="aspect-square relative max-w-[200px] mx-auto bg-white rounded-lg p-4">
						<Image
							src={qrCodeImagem}
							alt="QR Code Pix"
							fill
							className="object-contain p-2"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.style.display = "none";
							}}
						/>
						{/* Placeholder quando não há imagem */}
						<div className="absolute inset-0 flex items-center justify-center text-gray text-sm p-4 text-center">
							<span>QR Code será exibido aqui</span>
						</div>
					</div>
					<p className="text-center text-sm text-gray mt-4">
						Escaneie o QR Code com seu app de banco
					</p>
				</div>

				{/* Chave Pix */}
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray mb-2">
						Ou copie a chave Pix ({tipoChave}):
					</label>
					<div className="flex items-center gap-2">
						<div className="flex-1 bg-cream rounded-lg px-4 py-3 font-mono text-sm text-foreground break-all">
							{chave}
						</div>
						<button
							onClick={copyToClipboard}
							className={`px-4 py-3 rounded-lg font-medium transition-all ${
								copied
									? "bg-green-500 text-white"
									: "bg-primary text-white hover:bg-primary-dark"
							}`}
						>
							{copied ? (
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							) : (
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Beneficiário */}
				<div className="bg-secondary/10 rounded-lg px-4 py-3 border border-secondary/30">
					<p className="text-sm text-gray">Beneficiário:</p>
					<p className="font-medium text-primary">{nomeBeneficiario}</p>
				</div>

				{/* Mensagem */}
				<div className="mt-6 text-center text-sm text-gray">
					<p>
						&quot;Cada um dê conforme determinou em seu coração, não com pesar
						ou por obrigação, pois Deus ama quem dá com alegria.&quot;
					</p>
					<p className="font-medium mt-1">2 Coríntios 9:7</p>
				</div>
			</div>
		</div>
	);
}
