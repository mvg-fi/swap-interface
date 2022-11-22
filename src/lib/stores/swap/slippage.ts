import { writable } from "svelte/store";

export let slippageDialog = writable(false)

export const setSlippageDialog = (open:boolean) => {
  slippageDialog.set(open)
}