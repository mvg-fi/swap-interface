import { writable } from "svelte/store";

export let selectAssetDialog = writable(false)
export let selectToAssetDialog = writable(false)

export const setAssetDialog = (open:boolean) => {
  selectAssetDialog.set(open)
}
export const setToAssetDialog = (open:boolean) => {
  selectToAssetDialog.set(open)
}