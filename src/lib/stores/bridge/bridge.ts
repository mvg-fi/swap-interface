import { derived, get, writable, type Writable } from 'svelte/store'
import assets from "$lib/constants/tokenlist.json";
import { DEFAULT_SLIPPAGE } from "$lib/helpers/constants";
import { setAssetDialog } from '$lib/stores/bridge/selectAsset';
import BigNumber from 'bignumber.js';

export let selectedFromAsset = writable(Object.values(assets).find((obj) => { return obj.symbol === 'ETH' }))
export let selectedToAsset = writable(Object.values(assets).find((obj) => { return obj.symbol === 'BTC' }))
export let payAmount: Writable<string | null> = writable(null)
export let _payAmount = derived(payAmount, ($payAmount) => {return BigNumber(String($payAmount))})
export let receiveAmount: Writable<string | null> = writable(null)
export let receiverAddr: Writable<string> = writable()
export let receiverMemo: Writable<string> = writable()
export let slippage = writable(DEFAULT_SLIPPAGE)
export let activeSlippage = writable(null)
export let approved = writable(false)
export let swapFetched = writable(true)
export let swapNotAvail = writable(true)
export let inputFrom = writable(false)

export const setFromAsset = (asset: any) => {
  selectedFromAsset.set(asset)
  setAssetDialog(false)
}
export const setToAsset = (asset: any) => {
  selectedToAsset.set(asset)
  setAssetDialog(false)
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