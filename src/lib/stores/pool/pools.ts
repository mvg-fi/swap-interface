import type { PoolTemplate } from "@zed-wong/mvgswap/lib/pools";
import { writable, type Writable } from "svelte/store";

export let mainPools: Writable<string[]> = writable([])
export let factoryPools: Writable<string[]> = writable([])
export let cryptoFactoryPools: Writable<string[]> = writable([])

export let currentPool: Writable<PoolTemplate> = writable()