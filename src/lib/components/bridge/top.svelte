<script lang="ts">
  import { _ } from "svelte-i18n";
  import SettingIcon from "$lib/images/setting.svg";
  import { settingOpen } from "$lib/stores/bridge/settings";
</script>

<span class="font-semibold text-xl flex-1 text-base-content"> 
  {$_('bridge.title')}
</span>
<div class="flex-0 flex space-x-6">
  <button class="" on:click={()=>settingOpen.set(true)}>
    <img src={SettingIcon} alt="" class="setting [[data-theme=dark]_&]:invert" />
  </button>
</div>

<style>
  .setting {
    width: 20px;
    opacity: 0.8;
  }
  .setting:hover {
    opacity: 0.6;
    transform: rotate(20deg);
    transition: transform 0.5s;
  }
  .setting:not(:hover) {
    transform: rotate(-20deg);
    transition: transform 0.6s;
  }
</style>