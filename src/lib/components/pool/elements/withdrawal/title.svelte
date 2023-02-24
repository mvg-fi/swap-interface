<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setDepositMode } from "$lib/stores/pool/mode";
</script>

<div class="flex text-center justify-center mx-3">
  <button on:click={()=>setDepositMode(true)}>
    <span class="cursor-pointer text-sm"> {$_("add_liquidity.deposit")} </span>
  </button>
  <span class="px-2"> / </span>
  <span class="font-bold text-base -translate-y-[0.5px]"> {$_("add_liquidity.withdraw")} </span>
</div>

<!-- <style>
  img:hover {
    animation: shake 1s;
    animation-iteration-count: 1;
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-360deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
</style> -->
