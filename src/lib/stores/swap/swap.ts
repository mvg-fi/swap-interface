import { get } from 'svelte/store'
import { writable } from "svelte/store";
import assets from "$lib/constants/tokenlist.json";
import { DEFAULT_SLIPPAGE } from "$lib/helpers/constants";
import { setAssetDialog, setToAssetDialog } from './selectAsset';

export let selectedFromAsset = writable(Object.values(assets).find((obj)=>{return obj.symbol==='ETH'}))
export let selectedToAsset = writable(Object.values(assets).find((obj)=>{return obj.symbol==='BTC'}))
export let payAmount = writable(null)
export let receiveAmount = writable(undefined)
export let slippage = writable(DEFAULT_SLIPPAGE)
export let approved = writable(false)
export let calculated = writable(false)

export const setFromAsset = (asset: any) => {
  selectedFromAsset.set(asset)
  setAssetDialog(false)
}
export const setToAsset = (asset: any) => {
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
  selectedFromAsset.set(get(selectedToAsset))
  selectedToAsset.set(s)
  payAmount.set(get(receiveAmount) || null)
}