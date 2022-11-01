import { writable } from "svelte/store";

export let selectWalletDialog = writable(false)

export const openDialog = (open:boolean) => {
  selectWalletDialog.set(open)
}