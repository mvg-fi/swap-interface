<script lang="ts">
  import { _ } from "svelte-i18n";
  import curve from "@zed-wong/mvgswap";
  import { cleave } from "svelte-cleavejs";
  import { address } from "$lib/stores/user";
  import Empty from "$lib/images/empty-token.svg";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import { filterInputEvents } from "$lib/helpers/utils";
  import Image from "$lib/components/common/image.svelte";
  import Loading from "$lib/components/swap/SwapInfo/Loading.svelte";
  import { currentPool, exceptedWLoading, inputLpAmount, receiveWAmount, withdrawError, withdrawErrorMsg, withdrawMode } from "$lib/stores/pool/pools";

  const price = 1224;
  $: value = null;

  const fetchRecvAmount = async () => {
    if($withdrawMode == -1) return
    withdrawError.set(false)
    exceptedWLoading.set(true)
    if ($inputLpAmount==null||$inputLpAmount==0||$inputLpAmount==undefined){
      receiveWAmount.set('0')
      exceptedWLoading.set(false)
    }
    try {
      // receiveWAmount.set(await $currentPool.withdrawExpected($inputLpAmount))
    } catch (e) {
      withdrawError.set(true)
      withdrawErrorMsg.set(e.message)
    } finally {
      exceptedWLoading.set(false)
    }
  }

  const balance = (async () =>
    $connected
      ? await $currentPool.wallet.lpTokenBalances()
      : 0)();

  const setMax = (x: number) => {
    value = x;
  };

  let timeout: any = null;
  const delayInput = (event: KeyboardEvent) => {
    if (!filterInputEvents(event)) return
    
    clearTimeout(timeout);
    timeout = setTimeout(async function () {
      await fetchRecvAmount()
    }, 1000); 
  };
</script>

<div class="p-1 m-1 border-solid rounded-2xl bd">
  <div class="items-center justfiy-center flex">
    <div class="flex-1 flex flex-col mx-3">
      <input
        type="tel"
        placeholder="0"
        on:keyup={delayInput}
        use:cleave={maskOption}
        bind:value={$inputLpAmount}
        class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-2xl transition-none"
      />
    </div>
    <div class="avatar mx-1 mr-0">
      <div class="w-6 rounded-full">
        <Image src={Empty} alt="" />
      </div>
    </div>
    <div class="mt-0.5 mx-2">
      <span class="uppercase font-bold"> {$currentPool.name} </span>
    </div>
  </div>

  <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
    <div class="flex-1 ml-1">
      {#if true}
        <!-- if usd price loaded -->
        <span>${(price * value).toFixed(2)}</span>
      {/if}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => {
        setMax(balance);
      }}
      class="tooltip tooltip-left"
      data-tip={$_("add_liquidity.max")}
    >
      {#await balance}
        <Loading />
      {:then balance}
        <span class="cursor-pointer"
          >{$_("add_liquidity.balance")}: {balance}</span
        >
      {/await}
    </div>
  </div>
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>
