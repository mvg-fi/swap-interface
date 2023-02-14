import { writable } from "svelte/store";

export let connected = writable(false)
export let switchNeeded = writable(false)

export const setConnected = (conn: boolean) => {
  connected.set(conn)
}

export const setSwitchNeeded = (s: boolean) => {
  switchNeeded.set(s)
}