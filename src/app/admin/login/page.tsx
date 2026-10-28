import { redirect } from "next/navigation";
import FormularioLogin from "@/components/admin/FormularioLogin";
import { senhaConfigurada } from "@/lib/admin/senha";
import { sessaoValida } from "@/lib/admin/sessao";

// Lê variáveis de ambiente e cookies a cada acesso, nunca na hora do build
export const dynamic = "force-dynamic";

export default async function LoginPage() {
	if (senhaConfigurada() && (await sessaoValida())) redirect("/admin");

	return (
		<div className="max-w-sm">
			<p className="eyebrow">Área da secretaria</p>
			<h1 className="mt-3 text-4xl text-ink">Painel de notícias</h1>

			{senhaConfigurada() ? (
				<FormularioLogin />
			) : (
				<p className="mt-6 border border-line bg-tint p-4 text-sm text-ink">
					O painel ainda não foi configurado. Gere a senha com{" "}
					<code>npm run admin:senha</code> e cadastre as variáveis na Vercel.
				</p>
			)}
		</div>
	);
}
