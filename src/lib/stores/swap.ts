import { writable } from "svelte/store";

export const fromCoin = writable()
export const toCoin = writable()
export const payAmount = writable(0)