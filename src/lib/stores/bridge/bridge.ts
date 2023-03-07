import BigNumber from 'bignumber.js';
import { isEVMAsset } from '$lib/helpers/utils';
import assets from "$lib/constants/tokenlist.json";
import { DEFAULT_SLIPPAGE } from "$lib/helpers/constants";
import { setAssetDialog } from '$lib/stores/bridge/selectAsset';
import { derived, get, writable, type Writable } from 'svelte/store'
import type { IRouteStep } from '@zed-wong/mvgswap/lib/interfaces';

export let selectedFromAsset = writable(Object.values(assets).find((obj) => { return obj.symbol === 'ETH' }))
export let selectedToAsset = writable(Object.values(assets).find((obj) => { return obj.symbol === 'BTC' }))
export let evmCompatible = derived(selectedFromAsset, ($selectedFromAsset)=> isEVMAsset($selectedFromAsset.mixinChainId))
export let toEvmCompatible = derived(selectedToAsset, ($selectedToAsset)=> isEVMAsset($selectedToAsset.mixinChainId))

export let payAmount: Writable<string | null> = writable(null)
export let _payAmount = derived(payAmount, ($payAmount) => {return BigNumber(String($payAmount))})
export let receiveAmount: Writable<string | null> = writable(null)
export let _receiveAmount = derived(receiveAmount, ($receiveAmount) => {return BigNumber(String($receiveAmount))})
export let receiverAddr: Writable<string> = writable()
export let receiverMemo: Writable<string> = writable()
export let inputFrom = writable(false)
export let slippage = writable(DEFAULT_SLIPPAGE)
export let approved = writable(false)

export let swapInfo: Writable<{route: IRouteStep[], output: string}> = writable()  // curve.router.getBestRouteAndOutput
export let swapInfoLoading = writable(false)
export let swapNotAvail = writable(true)
export let priceImpact = writable(0)
export let forceRecipient = writable(false)

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

export const switchAsset = () => {
  const s = get(selectedFromAsset)
  selectedFromAsset.set(get(selectedToAsset))
  selectedToAsset.set(s)
  payAmount.set(get(receiveAmount) || null)
}