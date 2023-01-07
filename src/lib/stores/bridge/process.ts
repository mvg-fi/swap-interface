import { writable } from 'svelte/store'

export let mode = writable(0)
export let supposedNetwork = writable(null)
export let processDialog = writable(false)