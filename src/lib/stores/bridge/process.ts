import { writable, type Writable } from 'svelte/store'

export let mode = writable(0)
export let processDialog: Writable<boolean> = writable(false)
export let supposedNetwork: Writable<number> = writable()
export let mvmAssetBalance: Writable<string> = writable()