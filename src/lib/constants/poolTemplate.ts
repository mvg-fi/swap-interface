import type { IDict } from "./interfaces";

export interface PoolTemplate {
  id: string;
  name: string;
  fullName: string;
  symbol: string;
  referenceAsset: string;
  address: string;
  lpToken: string;
  gauge: string;
  zap: string | null;
  sRewardContract: string | null;
  rewardContract: string | null;
  isPlain: boolean;
  isLending: boolean;
  isMeta: boolean;
  isCrypto: boolean;
  isFake: boolean;
  isFactory: boolean;
  isMetaFactory: boolean;
  basePool: string;
  underlyingCoins: string[];
  wrappedCoins: string[];
  underlyingCoinAddresses: string[];
  wrappedCoinAddresses: string[];
  underlyingDecimals: number[];
  wrappedDecimals: number[];
  useLending: boolean[];
  estimateGas: {
      depositApprove: (amounts: (number | string)[]) => Promise<number>,
      deposit: (amounts: (number | string)[]) => Promise<number>,
      depositWrappedApprove: (amounts: (number | string)[]) => Promise<number>,
      depositWrapped: (amounts: (number | string)[]) => Promise<number>,
      stakeApprove: (lpTokenAmount: number | string) => Promise<number>,
      stake: (lpTokenAmount: number | string) => Promise<number>,
      unstake: (lpTokenAmount: number | string) => Promise<number>,
      claimCrv: () => Promise<number>,
      claimRewards: () => Promise<number>,
      depositAndStakeApprove: (amounts: (number | string)[]) => Promise<number>,
      depositAndStake: (amounts: (number | string)[]) => Promise<number>,
      depositAndStakeWrappedApprove: (amounts: (number | string)[]) => Promise<number>,
      depositAndStakeWrapped: (amounts: (number | string)[]) => Promise<number>,
      withdrawApprove: (lpTokenAmount: number | string) => Promise<number>,
      withdraw: (lpTokenAmount: number | string) => Promise<number>,
      withdrawWrapped: (lpTokenAmount: number | string) => Promise<number>,
      withdrawImbalanceApprove: (amounts: (number | string)[]) => Promise<number>,
      withdrawImbalance: (amounts: (number | string)[]) => Promise<number>,
      withdrawImbalanceWrapped: (amounts: (number | string)[]) => Promise<number>,
      withdrawOneCoinApprove: (lpTokenAmount: number | string) => Promise<number>,
      withdrawOneCoin: (lpTokenAmount: number | string, coin: string | number) => Promise<number>,
      withdrawOneCoinWrapped: (lpTokenAmount: number | string, coin: string | number) => Promise<number>,
      swapApprove: (inputCoin: string | number, amount: number | string) => Promise<number>,
      swap: (inputCoin: string | number, outputCoin: string | number, amount: number | string, slippage: number) => Promise<number>,
      swapWrappedApprove: (inputCoin: string | number, amount: number | string) => Promise<number>,
      swapWrapped: (inputCoin: string | number, outputCoin: string | number, amount: number | string, slippage: number) => Promise<number>,
  };
  stats: {
      parameters: () => Promise<{
          virtualPrice: string,
          fee: string,
          adminFee: string,
          A: string,
          future_A?: string,
          initial_A?: string,
          future_A_time?: number,
          initial_A_time?: number,
          gamma?: string,
      }>,
      underlyingBalances: () => Promise<string[]>,
      wrappedBalances: () => Promise<string[]>,
      totalLiquidity: (useApi?: boolean) => Promise<string>,
      volume: () => Promise<string>,
      baseApy: () => Promise<{ day: string, week: string }>,
      tokenApy: () => Promise<[baseApy: string, boostedApy: string]>,
  };
  wallet: {
      balances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>,
      lpTokenBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>,
      underlyingCoinBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>,
      wrappedCoinBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>,
      allCoinBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>,
  };
