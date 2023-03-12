<script lang="ts">
  import { _ } from "svelte-i18n"
  import { poolName, poolTokenAddresses, poolType } from "$lib/stores/pool/factory";
  import PrevNext from "./prevNext.svelte";
  
</script>

<div class="flex flex-col space-y-6 px-40">
  {#if $poolType === 1}
    <div class="flex flex-col space-y-4">
      <div>
        <span class="font-semibold"> A:(amplification parameter) </span>
      </div>
      <input class="input" bind:value={$poolTokenAddresses[0]} placeholder={$_("pool.enter_coin_address")} />
    </div>

    <div class="flex flex-col space-y-4">
      <div>
        <span class="font-semibold"> {$_('pool.fee')}: </span>
      </div>
      <input class="input" bind:value={$poolTokenAddresses[1]} placeholder={$_("pool.enter_coin_address")} />
    </div>

  {:else if $poolType === 2}
    <div class="flex flex-col space-y-4">
      <div>
        <span class="font-semibold"> {$_("pool.token_x_address", {values:{x:1}})} </span>
      </div>
      <input class="input" bind:value={$poolTokenAddresses[0]} placeholder={$_("pool.enter_coin_address")} />
    </div>

    <div class="flex flex-col space-y-4">
      <div>
        <span class="font-semibold"> {$_("pool.token_x_address", {values:{x:2}})} </span>
      </div>
      <input class="input" bind:value={$poolTokenAddresses[1]} placeholder={$_("pool.enter_coin_address")} />
    </div>
  {/if}
  <div class="pt-4">
    <PrevNext />
  </div>
</div>