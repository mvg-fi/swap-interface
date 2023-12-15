<script lang="ts">
  import { _ } from "svelte-i18n"
  import PrevNext from "$lib/components/factory/prevNext.svelte";
  import { poolName, poolTokenAddresses, poolType } from "$lib/stores/pool/factory";
  
</script>

<div class="flex flex-col space-y-6 mt-4 md:mt-8 px-4 md:px-40 mb-12">
  <div class="flex flex-col space-y-4">
    <div>
      <span class="font-semibold"> {$_("pool.pool_name")} </span>
      <span class="ml-1 text-xs"> ({
        $_("pool.e.g._coin", {values:{coin1: $poolType === 1 ? "USDT":"BTC", coin2: $poolType === 1 ? "USDC":"ETH"}} )
      }) </span>
    </div>
    <input class="input" bind:value={$poolName} placeholder={$_("pool.enter_pool_name")} />
  </div>

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

  <div class="pt-4 md:pt-8">
    <PrevNext />
  </div>
</div>