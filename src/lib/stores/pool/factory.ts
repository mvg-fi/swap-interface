import { writable, type Writable } from "svelte/store";
import type { Process, PoolType, StablePool, CryptoPool  } from "$lib/types/pool";

export let process: Writable<Process> = writable(1)
export let poolType: Writable<PoolType> = writable()
export let poolName: Writable<string> = writable()
export let poolTokenAddresses: Writable<string[]> = writable(['',''])
export let stablePool: Writable<StablePool> = writable({
  name: "",
  symbol: "",
  coins: ["", ""],
  A: 200,
  fee: 0.04, 
  assetType: 0,
  implementationIdx: 0
})
export let cryptoPool: Writable<CryptoPool> = writable({
  name: "",
  symbol: "",
  coins: ["",""],
  A: 400000,
  gamma: 0.000145,
  midFee: 0.26,
  outFee: 0.45,
  allowedExtraProfit: 0.000002,
  feeGamma: 0.00023,
  adjustmentStep: 0.000146,
  maHalfTime: 600,
  initialPrice: 0
})

export const volatile = {
  A: 400000,
  gamma: 0.000145,
  midFee: 0.26,
  outFee: 0.45,
  allowedExtraProfit: 0.000002,
  feeGamma: 0.00023,
  adjustmentStep: 0.000146,
  maHalfTime: 600,
}
export const less_volatile = {
  A: 200000000,
  gamma: 0.0001,
  midFee: 0.05,
  outFee: 0.45,
  allowedExtraProfit: 0.00000001,
  feeGamma: 0.005,
  adjustmentStep: 0.0000055,
  maHalfTime: 600,
}
export const blank = {
  A: 0,
  gamma: 0,
  midFee: 0,
  outFee: 0,
  allowedExtraProfit: 0,
  feeGamma: 0,
  adjustmentStep: 0,
  maHalfTime: 0,
}