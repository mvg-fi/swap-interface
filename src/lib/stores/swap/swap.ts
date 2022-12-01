import { get } from 'svelte/store'
import { writable } from "svelte/store";
import assets from "$lib/assets/assets.json";
import { DEFAULT_SLIPPAGE } from "$lib/helpers/constants";
import { setAssetDialog, setToAssetDialog } from './selectAsset';

export let selectedFromAsset = writable(assets[0])
export let selectedToAsset = writable(assets[1])
export let payAmount = writable(0)
export let receiveAmount = writable(0)
export let slippage = writable(DEFAULT_SLIPPAGE)
export let approved = writable(false)
export let calculated = writable(false)

export const setFromAsset = (asset: any) => {
  console.log('setFromAsset:', asset.symbol)
  selectedFromAsset.set(asset)
  setAssetDialog(false)
}
export const setToAsset = (asset: any) => {
  console.log('setToAsset:', asset.symbol)
  selectedToAsset.set(asset)
  setToAssetDialog(false)
}
export const setSlippage = (number: number) => {
  slippage.set(number)
}
export const setApproved = (yes: boolean) => {
  approved.set(yes)
}
export const setCalculated = (yes: boolean) => {
  calculated.set(yes)
}

export const switchAsset = () => {
  const s = get(selectedFromAsset)
  const a = get(payAmount)
  selectedFromAsset.set(get(selectedToAsset))
  selectedToAsset.set(s)
  payAmount.set(get(receiveAmount))
  receiveAmount.set(a) //TODO
}