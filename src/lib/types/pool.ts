export interface IPoolData {
  name: string;
  full_name: string;
  symbol: string;
  reference_asset: string;
  swap_address: string;
  token_address: string;
  gauge_address?: string;
  deposit_address?: string;
  sCurveRewards_address?: string;
  reward_contract?: string;
  is_plain?: boolean;
  is_lending?: boolean;
  is_meta?: boolean;
  is_crypto?: boolean;
  is_fake?: boolean;
  is_factory?: boolean;
  base_pool?: string;
  underlying_coins: string[];
  wrapped_coins: string[];
  underlying_coin_addresses: string[];
  wrapped_coin_addresses: string[];
  underlying_decimals: number[];
  wrapped_decimals: number[];
  use_lending?: boolean[];
  swap_abi?: any;
  gauge_abi?: any;
  deposit_abi?: any;
  sCurveRewards_abi?: any;
}
interface PoolParameters {
  lpTokenSupply?: string | undefined;
  virtualPrice?: string | undefined;
  fee?: string | undefined;
  adminFee?: string | undefined;
  A?: string | undefined;
  future_A?: string | undefined;
  initial_A?: string | undefined;
  future_A_time?: string | undefined;
  initial_A_time?: string | undefined;
  gamma?: string | undefined;
  priceOracle?: string | undefined;
  priceScale?: string | undefined;
}
export interface PoolData extends IPoolData {
  // Graph
  Apy?: string;
  Tvl?: string;

  // Curve js
  Volume?: string;
  Parameters?: PoolParameters;
}