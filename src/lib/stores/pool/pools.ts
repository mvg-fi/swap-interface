import { BN } from "$lib/helpers/utils";
import type { PoolTemplate } from "@zed-wong/mvgswap/lib/pools";
import { derived, writable, type Writable } from "svelte/store";
import type { IDict, IPoolData } from "@zed-wong/mvgswap/lib/interfaces";

export let mainPools: Writable<IDict<IPoolData>> = writable()
export let factoryPools: Writable<IDict<IPoolData>> = writable()
export let cryptoFactoryPools: Writable<IDict<IPoolData>> = writable()
export let poolsLoaded: Writable<boolean> = writable(false)

export let currentPool: Writable<PoolTemplate> = writable()
export let currentPoolBalances: Writable<string[]> = writable()

export let receiveAmount = writable('')
export let _receiveAmount = derived(receiveAmount, ($receiveAmount) => {return BN($receiveAmount)})
