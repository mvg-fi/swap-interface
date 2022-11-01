import { writable } from "svelte/store";

export let connected = writable(false)

export const setConnected = (conn: boolean) => {
  connected.set(conn)
}