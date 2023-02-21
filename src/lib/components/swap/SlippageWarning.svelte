<script lang="ts">
  import { slippage } from "$lib/stores/swap/swap";

</script>

<div>
  {#if $slippage > 10 && $slippage < 30}
    <div/>
  {:else if $slippage >= 30 && $slippage <= 50}
    <div/>
  {:else if $slippage >= 50 && $slippage <= 100}
    <div/>
  {/if}
</div>

<!-- TODO (Slippage alert) -->