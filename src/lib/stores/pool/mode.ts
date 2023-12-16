import { writable } from "svelte/store";

// 0 == deposit, 1 == withdraw, 2 == staking
export let depositMode = writable(0)

export const setDepositMode = (number: number) => {
  depositMode.set(number)
}