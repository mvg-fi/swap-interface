import { BTC_ASSET_ID } from '$lib/helpers/constants';
import type { AssetResponse } from '@mixin.dev/mixin-node-sdk'
import { derived, writable, type Writable } from 'svelte/store'

// Three mode for each steps of bridging
// bridgingMode: Determines which mode to fetch
// m1: 0 = pending, 1 = fetching confirmations, 2 = completed
// m2: 0 = pending, 1.1 = switch, 1.2=approve, 1.3=call, 2 = completed
// m3: 0 = pending, 1 = tx sent, fetching result, 2 = completed, -1 = reverted

// All combinations:
// mode = 1, m1 = 0, m2 = 0, m3 = 0, Waiting deposit to be found
// mode = 1, m1 = 1, m2 = 0, m3 = 0, deposit found, waiting to be completed
// mode = 2, m1 = 2, m2 = 1, m3 = 0, deposit completed, ask user to switch/approve/confirm
// mode = 2, m1 = 2, m2 = 2, m3 = 0, user confirmed, tx sent
// mode = 3, m1 = 2, m2 = 2, m3 = 1, waiting tx to be confirmed
// mode = 3, m1 = 2, m2 = 2, m3 = 2, tx confirmed
// mode = 3, m1 = 2, m2 = 2, m3 = -1, tx reverted, ask user to retry
// mode = 2, m1 = 2, m2 = 1, m3 = 0, retry jumps back to step 3

export let bridgingMode: Writable<number> = writable(1);
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