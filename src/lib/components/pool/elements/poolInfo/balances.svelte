<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { assets } from "$lib/stores/asset";
  import _tokenList from "$lib/constants/tokenlist.json";
  import { currentPool } from "$lib/stores/pool/pools";
  import Image from "$lib/components/common/image.svelte";
  import Loading from "$lib/components/pool/elements/poolInfo/loading.svelte";
  import { findAssetsFromTokenList, formatUSMoney, getPercentage, getSum, getUsdTotal, multiply } from "$lib/helpers/utils";

  $: staticAssets = findAssetsFromTokenList(Object.values(_tokenList), $currentPool.underlyingCoinAddresses)
  $: icons = staticAssets.map((e)=>{
    return e?.logoURI || ''
  });

  const coins = $currentPool.underlyingCoins;
  let poolBalance = $currentPool.stats.underlyingBalances();
    
  const fetchUSD = (contract: string) => { return String($assets.find((obj)=>obj.contract==contract)?.priceUsd) || ''}
  $: usds = staticAssets.map((e)=>{
    if (e?.contract == undefined) return ''
    return fetchUSD(e?.contract)
  })
</script>

<div class="flex flex-col">
  <span class="font-bold text-xl mb-1 px-6">
    {$_("add_liquidity.pool_balance")}
  </span>
  {#each coins as coin, i}
    <div class="flex flex-row my-1 text-sm px-5">
      <div class="avatar w-6 m-1">
        <div class="rounded-full">
          <Image src={icons[i]} alt={coin} />
        </div>
      </div>
      <div class="flex items-center ml-1 mt-0.5 flex-1">
        <span class="font-semibold uppercase"> {coins[i]} </span>
      </div>
      <div class="flex items-center mt-0.5">
        {#await poolBalance}
          <Loading/>
        {:then poolBalance}
        <div class="tooltip" data-tip={`${$_('technical.usd')}:${formatUSMoney(multiply(usds[i], poolBalance[i]))}`}>
          <span class="font-semibold text-base"> {poolBalance[i]} </span>
        </div>
          <span class="font-semibold opacity-80 ml-1 text-xs">
            ({getPercentage(poolBalance, poolBalance[i])}%)
          </span>
        {/await}
      </div>
    </div>
  {/each}
</div>
<div class="px-6 my-1 mt-1.5 flex text-sm">
  <span class="font-semibold flex-1"> {$_('add_liquidity.total')} </span>
  {#await poolBalance}
    <Loading/>
  {:then poolBalance}
    <span class="font-semibold"> { formatUSMoney(getUsdTotal(usds, poolBalance)) } </span>
  {/await}
</div>