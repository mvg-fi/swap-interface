<script lang="ts">
  import { _ } from "svelte-i18n";
  import _tokenList from "$lib/constants/tokenlist.json";
  import { currentPool } from "$lib/stores/pool/pools";
  import Image from "$lib/components/common/image.svelte";
  import { findAssetsFromTokenList, formatUSMoney } from "$lib/helpers/utils";
  import Loading from "$lib/components/pool/elements/poolInfo/loading.svelte";


  $: assets = findAssetsFromTokenList(Object.values(_tokenList), $currentPool.underlyingCoinAddresses)
  $: icons = assets.map((e)=>{
    return e?.logoURI || ''
  });

  const coins = $currentPool.underlyingCoins;
  let poolBalance = $currentPool.stats.underlyingBalances();
  
  // TODO: calc percentage, get asset icons
  // const sum = poolBalance.reduce((a, b) => a + b, 0);
  const usdTotal = 154324.12;
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
          <span class="font-semibold text-base"> {poolBalance[i]} </span>
          <span class="font-semibold opacity-80 ml-1 text-xs">
            <!-- ({"25%"}) -->
          </span>
        {/await}
      </div>
    </div>
  {/each}
</div>
<div class="px-6 my-1 flex text-sm">
  <span class="font-semibold flex-1"> {$_('add_liquidity.total')} </span>
  <span class="font-semibold"> {formatUSMoney(usdTotal)} </span>
</div>