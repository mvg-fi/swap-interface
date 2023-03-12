<script lang="ts">
  import { _ } from "svelte-i18n"
  import { poolName, poolTokenAddresses, poolType } from "$lib/stores/pool/factory";
    import PrevNext from "./prevNext.svelte";
  
</script>

<div class="flex flex-col space-y-6 px-40">
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

  <div class="pt-4">
    <PrevNext />
  </div>
</div>