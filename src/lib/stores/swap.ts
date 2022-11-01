import { writable } from "svelte/store";
import assets from "$lib/assets/assets.json";

export let selectedFromAsset = writable(assets[0])
export let selectedToAsset = writable(assets[1])
export let payAmount = writable(0)
export let receiveAmount = writable(0)
export let slippage = writable(0.1)

export const setFromAsset = (asset:object) => {
  selectedFromAsset.set(asset)
}
export const setToAsset = (asset:object) => {
  selectedToAsset.set(asset)
}
export const setSlippage = (number:number) => {
  slippage.set(number)
}