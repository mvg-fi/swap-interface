import { writable } from "svelte/store";

export let ConnectWalletDialog: any = writable(undefined)

export const setWalletDialog = (open:any) => {
  ConnectWalletDialog.set(open)
}