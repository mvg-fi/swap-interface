<script lang="ts">
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { connected } from "$lib/stores/connect";
  import { assets as assss } from "$lib/stores/asset";
  import { maskOption } from "$lib/helpers/constants";
  import _tokenList from "$lib/constants/tokenlist.json";
  import Image from "$lib/components/common/image.svelte";
  import { coins, currentPool, exceptedError, exceptedErrorMsg, exceptedLoading, inputValues, receiveAmount, transactionFee } from "$lib/stores/pool/pools";
  import { filterInputEvents, findAssetsFromTokenList, formatUSMoney } from "$lib/helpers/utils";

  const fetchBalance = (contract: string) => { return $assss.find((obj)=>obj.contract==contract)?.balance || 0};
  const fetchUSD = (contract: string) => { return $assss.find((obj)=>obj.contract==contract)?.priceUsd || 0};
  const setMax = (x: number, i: number) => { $inputValues[i] = x; };
  const getExcepted = async () => { return $currentPool.depositExpected($inputValues) }
  const getTxFee = async () => { return await $currentPool.estimateGas.deposit($inputValues) }
  // const getPriceImpact =async () => { return await $currentPool. }

  $: assets = findAssetsFromTokenList(Object.values(_tokenList), $currentPool.underlyingCoinAddresses)
  $: icons = assets.map((e)=>{
    return e?.logoURI || ''
  });
  $: balance = assets.map((e)=>{
    return fetchBalance(e?.contract || '0')
  })
  $: price = assets.map((e)=>{
    return fetchUSD(e?.contract || '0')
  })

  inputValues.set(new Array($coins.length).fill(null));

  const fetchReceive = async () => {
    exceptedError.set(false)
    exceptedLoading.set(true)
    inputValues.set($inputValues.map((element) => element == null ? 0 : element));
    if ($inputValues.every((e)=>e==null||e==0||e==undefined)) {
      receiveAmount.set('0')
      exceptedLoading.set(false)
      return
    }
    try {
      receiveAmount.set(await getExcepted())
      if ($connected) transactionFee.set(await getTxFee())
    } catch (e) {
      exceptedError.set(true)
      exceptedErrorMsg.set(e.message)
    } finally {
      exceptedLoading.set(false)
    }
  }
  let timeout: any = null;
  const delayInput = (event: KeyboardEvent) => {
    if (!filterInputEvents(event)) return
    console.log(event.code)
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
          bind:value={$inputValues[i]}
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
          <span>{formatUSMoney((price[i] * $inputValues[i]))}</span>
        {/if}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => {
          setMax(Number(balance[i]), i);
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
