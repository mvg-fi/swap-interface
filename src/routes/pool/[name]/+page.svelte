<script lang="ts">
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { depositMode as deposit } from "$lib/stores/pool/mode";
  import Deposit from "../elements/Deposit.svelte";
  import PoolInfo from "../elements/PoolInfo.svelte";
  import Withdrawal from "../elements/Withdrawal.svelte";

  console.log($page.params.name);
</script>

<div class="mx-0 flex flex-row mt-3" in:fade out:fade>
  <div class="mr-12">
    <PoolInfo name={$page.params.name} />
  </div>
  <div class="sticky">
    {#if $deposit}
      <Deposit />
    {:else}
      <Withdrawal />
    {/if}
  </div>
</div>

<!-- <style>
  .rotate-y {
    transform: rotateY(360deg);
  }
  .e {
    transition: transform 1s;
  }
</style> -->