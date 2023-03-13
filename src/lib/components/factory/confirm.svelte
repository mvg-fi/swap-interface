<script lang="ts">
  import { _ } from "svelte-i18n"
  import PrevNext from "$lib/components/factory/prevNext.svelte";
  import { cryptoPool, poolName, poolTokenAddresses, poolType, stablePool } from "$lib/stores/pool/factory";

  $poolType == 1 ? 
    (()=>{$stablePool.coins=$poolTokenAddresses; $stablePool.name=$poolName; $stablePool.symbol=$poolName})() :
    (()=>{$cryptoPool.coins=$poolTokenAddresses; $cryptoPool.name=$poolName; $cryptoPool.symbol=$poolName})()
</script>

<div class="flex flex-col space-y-6 px-40 text-base-content">
  <div class="card w-full p-6 bg-base-100 rounded-2xl">
    {#if $poolType == 1}
      <ul>
        <li class="py-1"> Type: Pegged </li>
        {#each Object.keys($stablePool).slice(0, -2) as key}
          {#if Array.isArray($stablePool[key])}
            <li class="py-1 flex flex-col space-y-2">
              <div>
                <span class="capitalize">coin 0:</span>
                <span> {$stablePool[key][0]} </span>
              </div>
              <div>
                <span class="capitalize">coin 1:</span>
                <span>{$stablePool[key][1]}</span>
              </div>
            </li>
          {:else}
            <li class="py-1">
              <span class="capitalize">{key}:</span>
              <span>{$stablePool[key]}</span>
            </li>
          {/if}
        {/each}
      </ul>
    {:else if $poolType == 2}
      <ul>
        <li class="py-1"> Type: Non-Pegged </li>
        {#each Object.keys($cryptoPool) as key}
          {#if Array.isArray($cryptoPool[key])}
            <li class="py-1 flex flex-col space-y-2">
              <div>
                <span class="capitalize">coin 0:</span>
                <span> {$cryptoPool[key][0]} </span>
              </div>
              <div>
                <span class="capitalize">coin 1:</span>
                <span>{$cryptoPool[key][1]}</span>
              </div>
            </li>
          {:else}
            <li class="py-1">
              <span class="capitalize">{key}:</span>
              <span>{$cryptoPool[key]}</span>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>

  <div class="flex flex-col card bg-red-200 text-base-content rounded-2xl mt-2 p-6">
    <span>For this pool to be valid, it must:</span>

    <span>- Have a name (max 10 characters) </span>
    <span>- Have enough tokens and not have any duplicate tokens</span>
    <span>- Use valid parameters (i.e. within the bounds of valid ranges) </span>
  </div>
  <div class="pt-8">
    <PrevNext />
  </div>
</div>