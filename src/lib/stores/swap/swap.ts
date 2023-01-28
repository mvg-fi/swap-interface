import BigNumber from 'bignumber.js';
import { derived, get, writable } from 'svelte/store'
import assets from "$lib/constants/tokenlist.json";
import { DEFAULT_SLIPPAGE } from "$lib/helpers/constants";
import { setAssetDialog, setToAssetDialog } from './selectAsset';

BigNumber.config({DECIMAL_PLACES:8})
export let selectedFromAsset = writable(Object.values(assets).find((obj)=>{return obj.symbol==='ETH'}))
export let selectedToAsset = writable(Object.values(assets).find((obj)=>{return obj.symbol==='BTC'}))
export let payAmount = writable(null)
export let _payAmount = derived(payAmount, ($payAmount) => {return BigNumber(String($payAmount), 8)})
export let receiveAmount = writable(null)
export let _receiveAmount = derived(receiveAmount, ($receiveAmount) => {return BigNumber(String($receiveAmount))})
export let slippage = writable(DEFAULT_SLIPPAGE)
export let activeSlippage = writable(null)
export let approved = writable(false)
export let swapFetched = writable(true)
export let swapNotAvail = writable(true)

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
export const setSwapFetched = (yes: boolean) => {
  swapFetched.set(yes)
}

export const switchAsset = () => {
  const s = get(selectedFromAsset)
  selectedFromAsset.set(get(selectedToAsset))
  selectedToAsset.set(s)
  payAmount.set(get(receiveAmount) || null)
}