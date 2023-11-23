<script lang="ts">
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import Empty from "$lib/images/empty-token.svg";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import { assets as assss } from "$lib/stores/asset";
  import _tokenList from "$lib/constants/tokenlist.json";
  import Image from "$lib/components/common/image.svelte";
  import { filterInputEvents, findAssetsFromTokenList, formatDecimals, formatUSMoney } from "$lib/helpers/utils";
  import { coins, currentPool, depositApproved, depositError, depositErrorMsg, exceptedLoading, inputValues, poolsLoaded, receiveAmount, transactionFee, depositBalanced } from "$lib/stores/pool/pools";

  const fetchUSD = (contract: string) => { return $assss.find((obj)=>obj.contract==contract)?.priceUsd || 0};
  const setMax = (x: number, i: number) => { $inputValues[i] = x; };
  const getExcepted = async () => { return $currentPool.depositExpected($inputValues) }
  // const getPriceImpact =async () => { return await $currentPool. }

  $: assets = findAssetsFromTokenList(Object.values(_tokenList), $currentPool.underlyingCoinAddresses)
  $: icons = assets.map((e)=>{ return e?.logoURI || Empty });
  $: balances = assets.map(e=>{ return formatDecimals(String(e?.balance), 8) || 0 });
  $: price = assets.map((e)=>{ return fetchUSD(e?.contract || '0') })
  $: $assss, $connected, assets, balances, price
  inputValues.set(new Array($coins.length).fill(null));

  const fetchReceive = async () => {
    depositError.set(false)
    exceptedLoading.set(true)
    inputValues.set($inputValues.map((e) => (e == null||e==0||e==undefined) ? 0 : e));
    if ($inputValues.every((e)=>e==null||e==0||e==undefined)) {
      receiveAmount.set('0')
      exceptedLoading.set(false)
      return
    }
    try {
      receiveAmount.set(await getExcepted())
      if ($connected) {
        depositApproved.set(await $currentPool.depositIsApproved($inputValues))
      }
    } catch (e) {
      depositError.set(true)
      depositErrorMsg.set(e.message)
    } finally {
      exceptedLoading.set(false)
    }
  }
  let timeout: any = null;
  const delayInput = (event: KeyboardEvent) => {
    if (!filterInputEvents(event)) return
    
    clearTimeout(timeout);
    timeout = setTimeout(async function () {
      await fetchReceive()
    }, 1000);
  };
</script>

{#each $coins as coin, i}
  <div class="p-1 m-1 border-solid rounded-2xl bd">
    <div class="items-center justfiy-center flex">
      <div class="flex-1 flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          on:keyup={delayInput}
          use:cleave={maskOption}
          disabled={!$poolsLoaded}
          bind:value={$inputValues[i]}
          class="input border-0 p-0 w-full max-w-xs outline-none on-focus font-bold text-2xl transition-none"
        />
      </div>
      <div class="avatar mx-1 mr-0">
        <div class="w-7 rounded-full">
          <Image src={icons[i]} alt="" class="w-7 h-7" />
        </div>
      </div>
      <div class="mt-0.5 mx-2">
        <span class="uppercase font-bold"> {coin} </span>
      </div>
    </div>

    <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
      <div class="flex-1 ml-1">
        {#if true}
          <span>{formatUSMoney((price[i] * $inputValues[i]))}</span>
        {/if}
      </div>
      {#if $connected}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => {
            setMax(Number(balances[i]), i);
          }}
          class="tooltip tooltip-left"
          data-tip={$_("add_liquidity.max")}
        >
          <span class="cursor-pointer"
            >{$_("add_liquidity.balance")}: {balances[i]}</span
          >
        </div>
      {/if}
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
