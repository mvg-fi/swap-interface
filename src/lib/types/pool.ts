export type ColHeaders = "name" | "apy" | "tvl" | "volume"

export type Process = 1 | 2 | 3 | 4 // poolType | poolInfo | parameters | confirmation
export type PoolType = 0 | 1 | 2 // none | stable | crypto

export interface StablePool {
  name: string,
  symbol: string,                   // same as name
  coins: string[],
  A: number,
  fee: number, // %
  assetType: 0 | 1 | 2 | 3,         // 0 by default
  implementationIdx: 0 | 1 | 2 | 3  // 0 by default
}

export interface CryptoPool {
  name: string,
  symbol: string,                   // same as name
  coins: string[],
  A: number,
  gamma: number,
  midFee: number, // %
  outFee: number, // %
  allowedExtraProfit: number,
  feeGamma: number,
  adjustmentStep: number,
  maHalfTime: number, // Seconds
  initialPrice: number | null
}
