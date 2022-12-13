<script lang="ts">
  import { activeSlippage } from "$lib/stores/swap/swap";

</script>

<div>
  {#if $activeSlippage > 10 && $activeSlippage < 30}
    <div/>
  {:else if $activeSlippage >= 30 && $activeSlippage <= 50}
    <div/>
  {:else if $activeSlippage >= 50 && $activeSlippage <= 100}
    <div/>
  {/if}
</div>

<!-- TODO (Slippage alert) -->