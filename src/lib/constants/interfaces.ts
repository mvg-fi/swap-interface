import type { ethers } from "ethers";

export interface IDict<T> {
  [index: string]: T,
}

export interface IPoolData {
  name: string,
  full_name: string,
  symbol: string,
  reference_asset: 'USD'|'CRYPTO',
  swap_address: string,
  token_address: string,
  gauge_address?: string,
  deposit_address?: string,
  sCurveRewards_address?: string,
  reward_contract?: string,
  is_plain?: boolean,
  is_lending?: boolean,
  is_meta?: boolean,
  is_crypto?: boolean,
  is_fake?: boolean,
  is_factory?: boolean,
  base_pool?: string,
  underlying_coins: string[],
  wrapped_coins: string[],
  underlying_coin_addresses: string[],
  wrapped_coin_addresses: string[],
  underlying_decimals: number[],
  wrapped_decimals: number[],
  use_lending?: boolean[],
  swap_abi: any,
  gauge_abi?: any,
  deposit_abi?: any,
  sCurveRewards_abi?: any,
}

export interface IRoute_ {
  steps: IRouteStep[],
  minTvl: number,
  totalTvl: number,
}

export interface IRoute {
  steps: IRouteStep[],
  _output: ethers.BigNumber,
  outputUsd: number,
  txCostUsd: number,
}

export interface IRouteStep {
  poolId: string,
  poolAddress: string,
  inputCoinAddress: string,
  outputCoinAddress: string,
  i: number,
  j: number,
  swapType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
  swapAddress?: string,
}