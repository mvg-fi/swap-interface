<script lang="ts">
  import { _ } from "svelte-i18n";
  import SettingIcon from "$lib/images/setting.svg";
  import { slippageDialog } from "$lib/stores/swap/slippage";
</script>

<span class="font-medium flex-1 text-base-content"> 
  {$_('swap.title')} 
</span>
<div class="flex-0">
  <button class="" on:click={()=>slippageDialog.set(true)}>
    <img src={SettingIcon} alt="s" class="setting [[data-theme=dark]_&]:invert" />
  </button>
</div>

<style>
  .setting {
    width: 20px;
    opacity: 0.8;
  }
  .setting:hover {
    opacity: 0.5;
    cursor: pointer;
    transform: rotate(40deg);
    transition: transform 0.5s;
  }
  .setting:not(:hover) {
    transform: rotate(-40deg);
    transition: transform 0.6s;
  }
</style>