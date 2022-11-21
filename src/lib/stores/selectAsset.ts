import { writable } from "svelte/store";

export let selectAssetDialog = writable(false)

export const setAssetDialog = (open:boolean) => {
  selectAssetDialog.set(open)
}