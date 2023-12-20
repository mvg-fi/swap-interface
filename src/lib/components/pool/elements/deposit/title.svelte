<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setDepositMode } from "$lib/stores/pool/mode";
</script>

<div class="flex text-center justify-center mx-3">
  <span class="font-bold text-base -translate-y-[0.5px]"> {$_("add_liquidity.deposit")} </span>
  <span class="px-2"> / </span>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button on:click={()=>setDepositMode(1)}>
    <span class="cursor-pointer text-sm"> {$_("add_liquidity.withdraw")} </span>
  </button>
  <span class="px-2"> / </span>
  <button on:click={()=>setDepositMode(2)}>
    <span class="cursor-pointer text-sm"> {$_("add_liquidity.stake")} </span>
  </button>
</div>