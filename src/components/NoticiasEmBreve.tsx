import { paroquiaInfo } from "@/lib/data";

// Aparece enquanto nenhuma notícia foi publicada pelo painel
export default function NoticiasEmBreve() {
	return (
		<div className="max-w-2xl border-t border-line py-10">
			<p className="eyebrow">Em breve</p>
			<h3 className="mt-3 text-2xl text-ink sm:text-3xl">
				Os avisos da paróquia chegam aqui em breve
			</h3>
			<p className="mt-3 leading-relaxed text-muted">
				Estamos preparando este espaço para as notícias, eventos e avisos da
				comunidade. Enquanto isso, acompanhe a paróquia nas redes sociais.
			</p>
			{paroquiaInfo.redesSociais.instagram && (
				<a
					href={paroquiaInfo.redesSociais.instagram}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-5 inline-flex text-sm font-semibold text-primary underline decoration-gold underline-offset-4"
				>
					Seguir no Instagram
				</a>
			)}
		</div>
	);
}
