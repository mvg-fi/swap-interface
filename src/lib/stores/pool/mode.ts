import { writable } from "svelte/store";

export let depositMode = writable(true)

export const setDepositMode = (toggle: boolean) => {
  depositMode.set(toggle)
}