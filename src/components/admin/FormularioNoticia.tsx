"use client";

import Link from "next/link";
import { type ChangeEvent, useActionState, useState } from "react";
import { salvarNoticia } from "@/app/admin/acoes";
import type { Noticia } from "@/lib/noticias";

const LADO_MAXIMO = 1600;

// Reduz a foto no navegador antes do envio: fotos de celular passam fácil do limite de upload
async function reduzirFoto(arquivo: File) {
	const bitmap = await createImageBitmap(arquivo);
	const escala = Math.min(
		1,
		LADO_MAXIMO / Math.max(bitmap.width, bitmap.height),
	);
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bitmap.width * escala);
	canvas.height = Math.round(bitmap.height * escala);
	canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();

	const blob = await new Promise<Blob | null>((resolve) =>
		canvas.toBlob(resolve, "image/jpeg", 0.85),
	);
	if (!blob) return arquivo;
	return new File([blob], arquivo.name.replace(/\.\w+$/, ".jpg"), {
		type: "image/jpeg",
	});
}

const estiloCampo = "border border-line bg-paper px-3 py-2.5 text-ink";

function hoje() {
	const agora = new Date();
	agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
	return agora.toISOString().slice(0, 10);
}

export default function FormularioNoticia({ noticia }: { noticia?: Noticia }) {
	const [estado, acao, enviando] = useActionState(salvarNoticia, {});
	const [previa, setPrevia] = useState(noticia?.imagem);
	const [preparandoFoto, setPreparandoFoto] = useState(false);

	async function escolherFoto(evento: ChangeEvent<HTMLInputElement>) {
		const campo = evento.currentTarget;
		const arquivo = campo.files?.[0];
		if (!arquivo) return;

		setPreparandoFoto(true);
		try {
			const reduzida = await reduzirFoto(arquivo);
			const transferencia = new DataTransfer();
			transferencia.items.add(reduzida);
			campo.files = transferencia.files;
			setPrevia(URL.createObjectURL(reduzida));
		} catch {
			// Formato que o navegador não abre: segue o original e o servidor valida
			setPrevia(undefined);
		} finally {
			setPreparandoFoto(false);
		}
	}

	return (
		<form action={acao} className="mt-8 flex flex-col gap-6">
			<input type="hidden" name="slugOriginal" value={noticia?.slug ?? ""} />

			<label className="flex flex-col gap-1.5">
				<span className="text-sm font-semibold text-ink">Título</span>
				<input
					name="titulo"
					required
					maxLength={150}
					defaultValue={noticia?.titulo}
					className={estiloCampo}
				/>
			</label>

			<label className="flex flex-col gap-1.5 sm:max-w-xs">
				<span className="text-sm font-semibold text-ink">Data</span>
				<input
					type="date"
					name="data"
					required
					defaultValue={noticia?.data ?? hoje()}
					className={estiloCampo}
				/>
			</label>

			<label className="flex flex-col gap-1.5">
				<span className="text-sm font-semibold text-ink">Resumo</span>
				<span className="text-sm text-muted">
					Uma ou duas frases. Aparece na lista de avisos e na página inicial.
				</span>
				<textarea
					name="resumo"
					required
					maxLength={400}
					rows={2}
					defaultValue={noticia?.resumo}
					className={estiloCampo}
				/>
			</label>

			<fieldset className="flex flex-col gap-3">
				<legend className="text-sm font-semibold text-ink">
					Foto de capa (opcional)
				</legend>
				{previa && (
					// Prévia local (blob:) da foto escolhida, que o next/image não otimiza
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={previa}
						alt=""
						className="max-h-64 w-auto self-start border border-line"
					/>
				)}
				<input
					type="file"
					name="imagem"
					accept="image/jpeg,image/png,image/webp"
					onChange={escolherFoto}
					className="text-sm text-muted"
				/>
				{noticia?.imagem && (
					<label className="flex items-center gap-2 text-sm text-ink">
						<input type="checkbox" name="removerImagem" />
						Remover a foto atual
					</label>
				)}
			</fieldset>

			<label className="flex flex-col gap-1.5">
				<span className="text-sm font-semibold text-ink">Texto</span>
				<span className="text-sm text-muted">
					Deixe uma linha em branco entre os parágrafos. Use **negrito**,
					*itálico*, &quot;- &quot; no início da linha para listas e
					[texto](https://endereço) para links.
				</span>
				<textarea
					name="conteudo"
					required
					maxLength={20000}
					rows={14}
					defaultValue={noticia?.conteudo}
					className={`${estiloCampo} font-serif text-lg leading-relaxed`}
				/>
			</label>

			{estado.erro && (
				<p role="alert" className="text-sm text-red-700">
					{estado.erro}
				</p>
			)}

			<div className="flex flex-wrap items-center gap-6">
				<button
					type="submit"
					disabled={enviando || preparandoFoto}
					className="bg-primary px-5 py-2.5 text-sm font-semibold text-paper hover:opacity-90 disabled:opacity-60"
				>
					{enviando
						? "Salvando…"
						: preparandoFoto
							? "Preparando foto…"
							: "Salvar e publicar"}
				</button>
				<Link
					href="/admin"
					className="text-sm text-muted underline underline-offset-4 hover:text-ink"
				>
					Cancelar
				</Link>
			</div>
		</form>
	);
}
