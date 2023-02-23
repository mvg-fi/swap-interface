<script lang="ts">
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { maskOption } from "$lib/helpers/constants";
  import _tokenList from "$lib/constants/tokenlist.json";
  import Image from "$lib/components/common/image.svelte";
  import { assets as assss, getCachedAssetBalance } from "$lib/stores/asset";
  import { derived } from "@square/svelte-store";
    import { findAssetsFromTokenList } from "$lib/helpers/utils";
    import { currentPool } from "$lib/stores/pool/pools";

  $: assets = findAssetsFromTokenList(Object.values(_tokenList), $currentPool.underlyingCoinAddresses)
  $: icons = assets.map((e)=>{
    return e?.logoURI || ''
  });
  const coins = $currentPool.underlyingCoins;
  const price = [1.24, 5.3, 64, 324];
  const balance = [0.01, 0.01, 0.01, 0.01];
  $: value = new Array(coins.length).fill(null);

  const setMax = (x: number, i: number) => {
    value[i] = x;
  };

  // const fetchUSD = () => { return $assets.find((obj)=>obj.mixinAssetId==coin.mixinAssetId)?.priceUsd || 0};
  // $: usd_store = derived(balance, fetchUSD);
  // $: balance = getCachedAssetBalance(coin.mixinAssetId);
</script>

{#each coins as coin, i}
  <div class="p-1 m-1 border-solid rounded-2xl bd">
    <div class="items-center justfiy-center flex">
      <div class="flex-1 flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          bind:value={value[i]}
          use:cleave={maskOption}
          class="input border-0 p-0 w-full max-w-xs input-md outline-none on-focus font-bold text-2xl transition-none"
        />
      </div>
      <div class="avatar mx-1 mr-0">
        <div class="w-7 rounded-full">
          <Image src={icons[i]} alt="" />
        </div>
      </div>
      <div class="mt-0.5 mx-2">
        <span class="uppercase font-bold"> {coin} </span>
      </div>
    </div>

    <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
      <div class="flex-1 ml-1">
        {#if true}
          <!-- if usd price loaded -->
          <span>${(price[i] * value[i]).toFixed(2)}</span>
        {/if}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => {
          setMax(balance[i], i);
        }}
        class="tooltip tooltip-left"
        data-tip={$_("add_liquidity.max")}
      >
        <span class="cursor-pointer"
          >{$_("add_liquidity.balance")}: {balance[i]}</span
        >
      </div>
    </div>
  </div>
{/each}

<style>
  .on-focus:focus {
    outline: none;
  }
  .bd {
    border-width: 1.25px;
  }
</style>
