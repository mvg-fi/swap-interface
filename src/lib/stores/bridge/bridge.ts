import { user } from '$lib/stores/user';
import { get, writable } from 'svelte/store'
import { derived } from '@square/svelte-store';
import assets from "$lib/constants/tokenlist.json";
import { dedupe } from '$lib/helpers/store/dedupe';
import { DEFAULT_SLIPPAGE } from "$lib/helpers/constants";
import { setAssetDialog } from '$lib/stores/bridge/selectAsset';

export let selectedFromAsset = writable(Object.values(assets).find((obj) => { return obj.symbol === 'ETH' }))
export let selectedToAsset = writable(Object.values(assets).find((obj) => { return obj.symbol === 'BTC' }))
export let payAmount = writable(null)
export let receiveAmount = writable(null)
export let receiverAddr = writable(null)
export let receiverMemo = writable(null)
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