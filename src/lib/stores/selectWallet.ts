import { writable } from "svelte/store";

export let selectWalletDialog: any = writable(undefined)

export const setWalletDialog = (open:any) => {
  selectWalletDialog.set(open)
}