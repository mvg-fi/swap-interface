import { writable } from "svelte/store";

export let settingDialog = writable(false)

export const setSettingDialog = (open:boolean) => {
  settingDialog.set(open)
}