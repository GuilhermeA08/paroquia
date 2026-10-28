"use client";

// Falhas ao falar com o GitHub (token inválido ou expirado, instabilidade) caem aqui
export default function AdminErro({ reset }: { reset: () => void }) {
	return (
		<div>
			<p className="eyebrow">Área da secretaria</p>
			<h1 className="mt-3 text-4xl text-ink">Não foi possível carregar</h1>
			<p className="mt-4 max-w-prose text-muted">
				O painel não conseguiu acessar as notícias agora. Tente de novo em
				instantes. Se continuar, avise quem cuida do site: pode ser preciso
				renovar o token do GitHub na Vercel.
			</p>
			<button
				type="button"
				onClick={reset}
				className="mt-6 bg-primary px-5 py-2.5 text-sm font-semibold text-paper hover:opacity-90"
			>
				Tentar de novo
			</button>
		</div>
	);
}
