<script lang="ts">
  import { _ } from "svelte-i18n";
  import { mode } from "$lib/stores/bridge/process";
  import { formatDecimals } from "$lib/helpers/utils";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";
</script>

<div class="view-address text-center p-2 pb-4">
  <span class="text-xl font-bold">
    {$_("bridge.deposit")}
    {formatDecimals(Number($payAmount), 8)}
    {$selectedFromAsset.symbol}
  </span>
</div>

<div>
  <span></span>
</div>

<div class="cancel justify-center flex px-4 py-2">
  <button
    on:click={() => mode.set(0)}
    class="btn bg-base-200 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl"
  >
    <span class="text-base-content"> {$_("bridge.back")} </span>
  </button>
</div>
