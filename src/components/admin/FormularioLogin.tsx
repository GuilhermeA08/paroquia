"use client";

import { useActionState } from "react";
import { entrar } from "@/app/admin/acoes";

export default function FormularioLogin() {
	const [estado, acao, enviando] = useActionState(entrar, {});

	return (
		<form action={acao} className="mt-8 flex flex-col gap-4">
			<label className="flex flex-col gap-1.5">
				<span className="text-sm font-semibold text-ink">Senha</span>
				<input
					type="password"
					name="senha"
					required
					autoComplete="current-password"
					className="border border-line bg-paper px-3 py-2.5 text-ink"
				/>
			</label>
			{estado.erro && (
				<p role="alert" className="text-sm text-red-700">
					{estado.erro}
				</p>
			)}
			<button
				type="submit"
				disabled={enviando}
				className="bg-primary px-5 py-2.5 text-sm font-semibold text-paper hover:opacity-90 disabled:opacity-60"
			>
				{enviando ? "Entrando…" : "Entrar"}
			</button>
		</form>
	);
}
