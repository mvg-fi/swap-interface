import { writable, type Writable } from "svelte/store";

export let settingOpen: Writable<boolean> = writable(false)
export let alwaysCustom: Writable<boolean> = writable(false)
export let enhancePrivacy: Writable<boolean> = writable(false)