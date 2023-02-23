<script lang="ts">
  import curve from "@zed-wong/mvgswap";
  import { goto } from "$app/navigation";
  import _tokenList from "$lib/constants/tokenlist.json";
  import PoolIcon from "$lib/components/pool/PoolIcon.svelte";
  import { findAssetsFromTokenList, formatCompactUSD, formatPercentage, shortenAddress } from "$lib/helpers/utils";
  import { currentPool } from "$lib/stores/pool/pools";
  import type { PoolTemplate } from "@zed-wong/mvgswap/lib/pools";
  import type { IPoolData } from "@zed-wong/mvgswap/lib/interfaces";
    
  
  export let pool: IPoolData;

  const underlying_coin_addresses = ['0x034A771797a1C8694Bc33E1AA89f51d1f828e5A4', '0x07DeF5AD4e59Ff1f64694fBA1BA4E513A71E4a83', '0x0e42Ae5649B3a67842AF0F3fC21d09d9b850A694', '0x181251D3A501961d4Af2AF46E33C71A5D808c25B']
  $: assets = findAssetsFromTokenList(Object.values(_tokenList), underlying_coin_addresses)
  const toPoolDetail = (pool: IPoolData) => {
    currentPool.set(curve.getPool(pool.name))
    const path = `/pool/${pool.name}`
    goto(path);
  };

  // $: apy = pool.apy ? formatPercentage(Number(pool.apy)) : '-'
  // $: tvl = pool.tvl ? formatCompactUSD(Number(pool.tvl)) : '-'
  // $: volume = pool.volume ? formatCompactUSD(Number(pool.volume)) : '-'
</script>

<!-- Icon and Name-->
<tr
  tabindex="0"
  class="hover"
  on:click={() => {
    toPoolDetail(pool);
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