"use client";

import { useSyncExternalStore } from "react";

const semAssinatura = () => () => {};
const minutoAtual = () => Math.floor(Date.now() / 60000);

// Data atual só no navegador; no servidor retorna null para evitar divergência
export function useAgora() {
	const minuto = useSyncExternalStore(semAssinatura, minutoAtual, () => null);
	return minuto === null ? null : new Date(minuto * 60000);
}
