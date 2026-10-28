import FormularioNoticia from "@/components/admin/FormularioNoticia";
import { exigirSessao } from "@/lib/admin/sessao";

export default async function NovaNoticiaPage() {
	await exigirSessao();

	return (
		<div>
			<p className="eyebrow">Área da secretaria</p>
			<h1 className="mt-3 text-4xl text-ink">Nova notícia</h1>
			<FormularioNoticia />
		</div>
	);
}
