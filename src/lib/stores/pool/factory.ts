import { writable, type Writable } from "svelte/store";
import type { Process, PoolType, StablePool, CryptoPool  } from "$lib/types/pool";

export let process: Writable<Process> = writable(1)
export let poolType: Writable<PoolType> = writable()
export let poolName: Writable<string> = writable()
export let poolTokenAddresses: Writable<string[]> = writable(['',''])
export let stablePool: Writable<StablePool> = writable()
export let cryptoPool: Writable<CryptoPool> = writable()