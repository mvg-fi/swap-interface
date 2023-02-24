<script lang="ts">
  import curve from "@zed-wong/mvgswap";
  import { goto } from "$app/navigation";
  import _tokenList from "$lib/constants/tokenlist.json";
  import PoolIcon from "$lib/components/pool/PoolIcon.svelte";
  
  import { currentPool } from "$lib/stores/pool/pools";
  import type { IPoolData } from "@zed-wong/mvgswap/lib/interfaces";
  import { findAssetsFromTokenList, formatCompactUSD, formatPercentage, shortenAddress } from "$lib/helpers/utils";
    
  export let id: string;
  export let pool: IPoolData;

  $: assets = findAssetsFromTokenList(Object.values(_tokenList), pool.underlying_coin_addresses)
  const toPoolDetail = (id: string) => {
    currentPool.set(curve.getPool(id))
    const path = `/pool/${id}`
    goto(path);
  };
  
  // TODO: Deploy subgraph to get all these
  // $: tvl = 
  // $: apy = pool.apy ? formatPercentage(Number(pool.apy)) : '-'
  // $: volume = pool.volume ? formatCompactUSD(Number(pool.volume)) : '-'
</script>

<!-- Icon and Name-->
<tr
  tabindex="0"
  class="hover"
  on:click={() => {
    toPoolDetail(id);
  }}
>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <td class="first:pl-7 last:pr-7">
    <div class="flex items-center space-x-4">
      <button class="min-w-[2rem] inline-grid grid-cols-2">
        <PoolIcon {assets} />
      </button>

      <div class="grow-1">
        <div class="font-bold">{pool.name}</div>
        {#each pool.underlying_coins as coin}
          <span class="text-sm opacity-60">
            {coin} &nbsp;
          </span>
        {/each}
        <div class="text-sm opacity-60">
          {shortenAddress(pool.swap_address,4,4)}
        </div>
      </div>
    </div>
  </td>

  <!-- APY -->
  <td> {""} </td>

  <!-- TVL -->
  <td> {""}</td>

  <!-- Volume -->
  <td> {""} </td>
</tr>

<style>
  
</style>