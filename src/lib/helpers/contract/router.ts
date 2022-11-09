import { ethers } from "ethers";
import { POOLS_DATA } from "$lib/constants/pools";
import type { IDict, IRoute_, IRouteStep } from "$lib/constants/interfaces"
import { COINS_MVM } from "$lib/constants/coins";
import { getPoolTotalLiquidity } from "./pools";

export const _findAllRoutesTvl = async (inputCoinAddress: string, outputCoinAddress: string): Promise<IRouteStep[][]> => {
  inputCoinAddress = inputCoinAddress.toLowerCase();
  outputCoinAddress = outputCoinAddress.toLowerCase();

  const ALL_POOLS = Object.entries({
      ...POOLS_DATA
  });
  const amplificationCoefficientDict = await _getAmplificationCoefficients();

  const basePoolsSet: Set<string> = new Set();
  for (const pool of ALL_POOLS) {
      if (pool[1].wrapped_coin_addresses.length < 4) basePoolsSet.add(pool[0]);
  }
  const basePoolIds = Array.from(basePoolsSet);
    // Coins we are searching routes for on the current step
    let curCoins: string[] = [inputCoinAddress];
    // Coins we will search routes for on the next step
    let nextCoins: Set<string> = new Set();
    // Routes for all coins found
    const routesByTvl: IDict<IRoute_[]> = {
        [inputCoinAddress]: [{ steps: [], minTvl: Infinity, totalTvl: 0 }],
    };
    const routesByLength: IDict<IRoute_[]> = {
        [inputCoinAddress]: [{ steps: [], minTvl: Infinity, totalTvl: 0 }],
    };

    // No more than 4 steps (swaps)
    for (let step = 0; step < 4; step++) {
        for (const inCoin of curCoins) {
            for (const [poolId, poolData] of ALL_POOLS) {
                const wrapped_coin_addresses = poolData.wrapped_coin_addresses.map((a: string) => a.toLowerCase());
                const underlying_coin_addresses = poolData.underlying_coin_addresses.map((a: string) => a.toLowerCase());
                const base_pool = poolData.is_meta ? POOLS_DATA[poolData.base_pool as string] : null;
                const meta_coin_addresses = base_pool ? base_pool.underlying_coin_addresses.map((a: string) => a.toLowerCase()) : [];
                const token_address = poolData.token_address.toLowerCase();
                const is_lending = poolData.is_lending ?? false;
                const tvlMultiplier = poolData.is_crypto ? 1 : (amplificationCoefficientDict[poolData.swap_address] ?? 1);

                const inCoinIndexes = {
                    wrapped_coin: wrapped_coin_addresses.indexOf(inCoin),
                    underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                    meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                }

                // Skip pools which don't contain inCoin
                if (inCoinIndexes.wrapped_coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1 && inCoin !== token_address) continue;

                const tvl = Number(await (getPoolTotalLiquidity(poolId)) * tvlMultiplier);
                // Skip empty pools
                if (tvl === 0) continue;

                // LP -> wrapped coin "swaps" (actually remove_liquidity_one_coin)
                if (basePoolIds.includes(poolId) && inCoin === token_address) {
                    for (let j = 0; j < wrapped_coin_addresses.length; j++) {
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress) continue;

                        // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                        const outputCoinIdx = wrapped_coin_addresses.indexOf(outputCoinAddress);
                        if (outputCoinIdx >= 0 && j !== outputCoinIdx) continue;

                        const swapType = poolId === 'aave' ? 11 : 10;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                wrapped_coin_addresses[j],
                                0,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                wrapped_coin_addresses[j],
                                0,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[wrapped_coin_addresses[j]] = [...(routesByTvl[wrapped_coin_addresses[j]] ?? []), ...newRoutesByTvl]
                        routesByTvl[wrapped_coin_addresses[j]] = filterRoutes(routesByTvl[wrapped_coin_addresses[j]], inputCoinAddress, sortByTvl);

                        routesByLength[wrapped_coin_addresses[j]] = [...(routesByLength[wrapped_coin_addresses[j]] ?? []), ...newRoutesByLength]
                        routesByLength[wrapped_coin_addresses[j]] = filterRoutes(routesByLength[wrapped_coin_addresses[j]], inputCoinAddress, sortByLength);

                        nextCoins.add(wrapped_coin_addresses[j]);
                    }
                }

                // Wrapped coin -> LP "swaps" (actually add_liquidity)
                if (basePoolIds.includes(poolId) && inCoinIndexes.wrapped_coin >= 0) {
                    // Looking for outputCoinAddress only on the final step
                    if (!(step === 3 && token_address !== outputCoinAddress)) {
                        const swapType = is_lending ? 9 : wrapped_coin_addresses.length === 2 ? 7 : 8;  // TODO change for atricrypto3 base pool

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                token_address,
                                wrapped_coin_addresses.indexOf(inCoin),
                                0,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                token_address,
                                wrapped_coin_addresses.indexOf(inCoin),
                                0,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[token_address] = [...(routesByTvl[token_address] ?? []), ...newRoutesByTvl]
                        routesByTvl[token_address] = filterRoutes(routesByTvl[token_address], inputCoinAddress, sortByTvl);

                        routesByLength[token_address] = [...(routesByLength[token_address] ?? []), ...newRoutesByLength];
                        routesByLength[token_address] = filterRoutes(routesByLength[token_address], inputCoinAddress, sortByLength);

                        nextCoins.add(token_address);
                    }
                }

                // Wrapped swaps
                if (inCoinIndexes.wrapped_coin >= 0 && !poolData.is_fake) {
                    for (let j = 0; j < wrapped_coin_addresses.length; j++) {
                        if (j === inCoinIndexes.wrapped_coin) continue;
                        // Native swaps spend less gas
                        if (wrapped_coin_addresses[j] !== outputCoinAddress && wrapped_coin_addresses[j] === COINS_MVM['eth']) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress) continue;
                        // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                        const outputCoinIdx = wrapped_coin_addresses.indexOf(outputCoinAddress);
                        if (outputCoinIdx >= 0 && j !== outputCoinIdx) continue;

                        const swapType = poolData.is_crypto ? 3 : 1;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                wrapped_coin_addresses[j],
                                inCoinIndexes.wrapped_coin,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolData.swap_address,
                                inCoin,
                                wrapped_coin_addresses[j],
                                inCoinIndexes.wrapped_coin,
                                j,
                                swapType,
                                ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[wrapped_coin_addresses[j]] = [...(routesByTvl[wrapped_coin_addresses[j]] ?? []), ...newRoutesByTvl];
                        routesByTvl[wrapped_coin_addresses[j]] = filterRoutes(routesByTvl[wrapped_coin_addresses[j]], inputCoinAddress, sortByTvl);

                        routesByLength[wrapped_coin_addresses[j]] = [...(routesByLength[wrapped_coin_addresses[j]] ?? []), ...newRoutesByLength];
                        routesByLength[wrapped_coin_addresses[j]] = filterRoutes(routesByLength[wrapped_coin_addresses[j]], inputCoinAddress, sortByLength);

                        nextCoins.add(wrapped_coin_addresses[j]);
                    }
                }

                // Only for underlying swaps
                const poolAddress = (poolData.is_crypto && poolData.is_meta) || (base_pool?.is_lending && poolData.is_factory) ?
                    poolData.deposit_address as string : poolData.swap_address;

                // Underlying swaps
                if (!poolData.is_plain && inCoinIndexes.underlying_coin >= 0) {
                    for (let j = 0; j < underlying_coin_addresses.length; j++) {
                        if (j === inCoinIndexes.underlying_coin) continue;
                        // Don't swap metacoins since they can be swapped directly in base pool
                        if (inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j])) continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress) continue;
                        // Exclude such cases as cvxeth -> tricrypto2 -> tusd -> susd or cvxeth -> tricrypto2 -> susd -> susd
                        const outputCoinIdx = underlying_coin_addresses.indexOf(outputCoinAddress);
                        if (outputCoinIdx >= 0 && j !== outputCoinIdx) continue;

                        // Skip empty pools
                        const tvl = Number(await (getPoolTotalLiquidity(poolId)));
                        if (tvl === 0) continue;

                        const hasEth = (inCoin === COINS_MVM['eth'] || underlying_coin_addresses[j] === COINS_MVM['eth']);
                        const swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) ? 6
                            : (base_pool?.is_lending && poolData.is_factory) ? 5
                            : hasEth ? 3
                            : poolData.is_crypto ? 4
                            : 2;

                        const newRoutesByTvl: IRoute_[] = routesByTvl[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                underlying_coin_addresses[j],
                                inCoinIndexes.underlying_coin,
                                j,
                                swapType,
                                (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        const newRoutesByLength: IRoute_[] = routesByLength[inCoin].map(
                            (route) => getNewRoute(
                                route,
                                poolId,
                                poolAddress,
                                inCoin,
                                underlying_coin_addresses[j],
                                inCoinIndexes.underlying_coin,
                                j,
                                swapType,
                                (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers.constants.AddressZero,
                                tvl
                            )
                        );

                        routesByTvl[underlying_coin_addresses[j]] = [...(routesByTvl[underlying_coin_addresses[j]] ?? []), ...newRoutesByTvl];
                        routesByTvl[underlying_coin_addresses[j]] = filterRoutes(routesByTvl[underlying_coin_addresses[j]], inputCoinAddress, sortByTvl);

                        routesByLength[underlying_coin_addresses[j]] = [...(routesByLength[underlying_coin_addresses[j]] ?? []), ...newRoutesByLength];
                        routesByLength[underlying_coin_addresses[j]] = filterRoutes(routesByLength[underlying_coin_addresses[j]], inputCoinAddress, sortByLength);

                        nextCoins.add(underlying_coin_addresses[j]);
                    }
                }
            }
        }

        curCoins = Array.from(nextCoins);
        nextCoins = new Set();
    }

    const routes = [...(routesByTvl[outputCoinAddress] ?? []), ...(routesByLength[outputCoinAddress] ?? [])];
    return routes.map((r) => r.steps);
}

const _getAmplificationCoefficients = async (): Promise<IDict<number>> => {
  // TODO: fetch from API or provider
  // Address:AmplificationCoefficient
  return {
    "0xF3F2ba723Da3BB6536CA9F2C5221Baf91247E5bE":100,
  }
}

const getNewRoute = (
  route: IRoute_,
  poolId: string,
  poolAddress: string,
  inputCoinAddress: string,
  outputCoinAddress: string,
  i: number,
  j: number,
  swapType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
  swapAddress: string,
  tvl: number
): IRoute_ => {
  const routePoolIds = route.steps.map((s) => s.poolId);
  // Steps <= 4
  if (routePoolIds.length >= 4) return { steps: [], minTvl: Infinity, totalTvl: 0 };
  // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
  if (routePoolIds.includes(poolId)) return { steps: [], minTvl: Infinity, totalTvl: 0 };
  return {
      steps: [...route.steps, { poolId, poolAddress, inputCoinAddress, outputCoinAddress, i, j, swapType, swapAddress }],
      minTvl: Math.min(tvl, route.minTvl),
      totalTvl: route.totalTvl + tvl,
  }
}

const MAX_ROUTES_FOR_ONE_COIN = 3;
const filterRoutes = (routes: IRoute_[], inputCoinAddress: string, sortFn: (a: IRoute_, b: IRoute_) => number) => {
    const routesByPoolIds = routes.map((r) => r.steps.map((s) => s.poolId).toString());
    return routes
        .filter((r) => r.steps.length > 0)
        .filter((r) => r.steps[0].inputCoinAddress === inputCoinAddress) // Truncated routes
        .filter((r, i) => routesByPoolIds.indexOf(r.steps.map((s) => s.poolId).toString()) === i) // Route duplications
        .sort(sortFn).slice(0, MAX_ROUTES_FOR_ONE_COIN);
}

const sortByTvl = (a: IRoute_, b: IRoute_) => b.minTvl - a.minTvl || b.totalTvl - a.totalTvl || a.steps.length - b.steps.length;
const sortByLength = (a: IRoute_, b: IRoute_) => a.steps.length - b.steps.length || b.minTvl - a.minTvl || b.totalTvl - a.totalTvl;