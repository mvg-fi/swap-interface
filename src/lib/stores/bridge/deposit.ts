import type { AssetResponse } from '@mixin.dev/mixin-node-sdk'
import { writable, type Writable } from 'svelte/store'

export let depositAsset: Writable<AssetResponse> = writable();
export let errorMessage: Writable<string> = writable();
export let errorLastMode: Writable<number> = writable();