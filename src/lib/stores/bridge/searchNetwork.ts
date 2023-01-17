import type { Asset } from "$lib/types/asset";
import { writable, type Writable } from "svelte/store";

export let search = writable('')
export let selectedNetwork: Writable<Asset> = writable()