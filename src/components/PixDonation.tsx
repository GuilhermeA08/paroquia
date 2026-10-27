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
	const [semQrCode, setSemQrCode] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(chave);
		} catch {
			// Fallback para navegadores mais antigos
			const textArea = document.createElement("textarea");
			textArea.value = chave;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="grid grid-cols-1 border border-line bg-surface md:grid-cols-[auto_1fr]">
			{/* QR Code */}
			<div className="flex flex-col items-center justify-center gap-3 border-b border-line bg-tint p-8 md:border-r md:border-b-0">
				<div className="relative flex aspect-square w-48 items-center justify-center bg-white p-3">
					{semQrCode ? (
						<span className="px-4 text-center text-sm text-neutral-500">
							QR Code será exibido aqui
						</span>
					) : (
						<Image
							src={qrCodeImagem}
							alt="QR Code Pix da paróquia"
							fill
							className="object-contain p-3"
							onError={() => setSemQrCode(true)}
						/>
					)}
				</div>
				<p className="text-sm text-muted">Escaneie com o app do seu banco</p>
			</div>

			{/* Chave e beneficiário */}
			<div className="min-w-0 p-6 sm:p-8">
				<p className="rubrica">Pix · {tipoChave}</p>
				<p className="hora mt-3 font-serif text-3xl break-all text-ink sm:text-4xl">
					{chave}
				</p>
				<button
					type="button"
					onClick={copyToClipboard}
					className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
						copied
							? "bg-tint text-verde"
							: "bg-verde text-paper hover:opacity-90"
					}`}
				>
					{copied ? "Chave copiada" : "Copiar chave Pix"}
				</button>

				<dl className="mt-8 border-t border-line pt-5 text-sm">
					<dt className="text-muted">Beneficiário</dt>
					<dd className="mt-1 text-base text-ink">{nomeBeneficiario}</dd>
				</dl>

				<blockquote className="mt-6 font-serif text-lg text-muted italic">
					“Cada um dê conforme determinou em seu coração, não com pesar ou por
					obrigação, pois Deus ama quem dá com alegria.”
					<footer className="mt-1 text-sm not-italic text-rubrica">
						2Cor 9,7
					</footer>
				</blockquote>
			</div>
		</div>
	);
}
