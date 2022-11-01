import { writable } from "svelte/store";

export let selectWalletDialog = writable(false)

export const setWalletDialog = (open:boolean) => {
  selectWalletDialog.set(open)
}