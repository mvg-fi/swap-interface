import { BTC_ASSET_ID } from '$lib/helpers/constants';
import type { AssetResponse } from '@mixin.dev/mixin-node-sdk'
import { derived, writable, type Writable } from 'svelte/store'

// Three mode for each steps of bridging
// bridgingMode: Determines which mode to fetch
// m1: 0 = pending, 1 = fetching confirmations, 2 = completed
// m2: 0 = pending, 1 = waiting switch/approve/call, 2 = completed
// m3: 0 = pending, 1 = tx sent, fetching result, 2 = completed, -1 = reverted

export let bridgingMode: Writable<number> = writable(0);
export let m1: Writable<number> = writable(0);
export let m2: Writable<number> = writable(0);
export let m3: Writable<number> = writable(0);

export let depositAsset: Writable<AssetResponse> = writable();
export let destination = derived(depositAsset, asset =>
  asset.asset_id === BTC_ASSET_ID ?
    asset.deposit_entries.find((element) => element.properties.includes('P2WPKH_V0')).destination : 
    asset.deposit_entries[0].destination)
export let errorMessage: Writable<string> = writable();
export let errorLastMode: Writable<number> = writable();