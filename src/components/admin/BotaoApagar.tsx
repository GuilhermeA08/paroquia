"use client";

import { useFormStatus } from "react-dom";

export default function BotaoApagar({ titulo }: { titulo: string }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			onClick={(evento) => {
				if (!window.confirm(`Apagar a notícia “${titulo}”?`)) {
					evento.preventDefault();
				}
			}}
			className="text-red-700 underline underline-offset-4 disabled:opacity-60"
		>
			{pending ? "Apagando…" : "Apagar"}
		</button>
	);
}
