import type { IDict, IPoolData } from "@zed-wong/mvgswap/lib/interfaces";
import type { PoolTemplate } from "@zed-wong/mvgswap/lib/pools";
import { writable, type Writable } from "svelte/store";

export let mainPools: Writable<IDict<IPoolData>> = writable()
export let factoryPools: Writable<IDict<IPoolData>> = writable()
export let cryptoFactoryPools: Writable<IDict<IPoolData>> = writable()

export let currentPool: Writable<PoolTemplate> = writable()
