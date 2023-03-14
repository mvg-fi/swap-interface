import { writable } from "svelte/store";

export const ranges = [0.1, 0.5, 1];
export let slippageDialog = writable(false)

export const setSlippageDialog = (open:boolean) => {
  slippageDialog.set(open)
}