<script lang="ts">
  import { _ } from "svelte-i18n";
  import { mode } from "$lib/stores/bridge/process";
  import warning from "$lib/images/warning-circle.svg";
    import { selectedFromAsset } from "$lib/stores/bridge/bridge";
</script>

<div class="warning-icon flex items-center justify-center p-3">
  <!-- <img src={warning} alt="" class="w-16"/> -->
  {@html warning}
</div>

<div class="switch-network text-center p-2">
  <span class="text-xl font-bold">
    {$_("bridge.switch_network")}
  </span>
</div>

<div class="switch-network-info text-center p-2 pb-4">
  <span class="text-sm font-medium">
    {$_("bridge.switch_network_info0")} {$selectedFromAsset.name}{$_('bridge.network')} {$_("bridge.switch_network_info1")}
  </span>
</div>

<div class="switch-network justify-center flex p-2">
  <button
    on:click={() => mode.set(0)}
    class="btn bg-base-200 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl"
  >
    <span class="text-base-content"> {$_("bridge.switch_network")} </span>
  </button>
</div>

<div class="cancel justify-center flex p-2">
  <button
    on:click={() => mode.set(0)}
    class="btn bg-base-200 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl"
  >
    <span class="text-base-content"> {$_("bridge.back")} </span>
  </button>
</div>