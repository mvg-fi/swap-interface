import { BN } from "$lib/helpers/utils";
import type { PoolTemplate } from "@zed-wong/mvgswap/lib/pools";
import { derived, writable, type Readable, type Writable } from "svelte/store";
import type { IDict, IPoolData } from "@zed-wong/mvgswap/lib/interfaces";

export let mainPools: Writable<IDict<IPoolData>> = writable()
export let factoryPools: Writable<IDict<IPoolData>> = writable()
export let cryptoFactoryPools: Writable<IDict<IPoolData>> = writable()
export let poolsLoaded: Writable<boolean> = writable(false)

export let currentPool: Writable<PoolTemplate> = writable()
export let currentPoolBalances: Writable<string[]> = writable()
export let coins: Readable<string[]> = derived(currentPool, (e)=>{return e.underlyingCoins})
export let coinsLength: Readable<number> = derived(coins, (e)=>{return e.length})

export let inputValues: Writable<number[]> = writable()
export let receiveAmount: Writable<string> = writable('0')
export let _receiveAmount = derived(receiveAmount, ($receiveAmount) => {return BN($receiveAmount)})
export let transactionFee: Writable<number> = writable(0)
export let priceImpact: Writable<number> = writable()
export let exceptedLoading: Writable<boolean> = writable(false)
export let depositError: Writable<boolean> = writable(false)
export let depositErrorMsg: Writable<string> = writable('')
export let depositApproved: Writable<boolean> = writable()

export let inputWValues: Writable<number[]> = writable()
export let receiveWAmount: Writable<string> = writable('0')
export let _receiveWAmount = derived(receiveAmount, ($receiveAmount) => {return BN($receiveAmount)})
export let transactionWFee: Writable<number> = writable(0)
export let priceWImpact: Writable<number> = writable()