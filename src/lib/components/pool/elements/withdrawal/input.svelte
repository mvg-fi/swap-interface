<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import curve from "@zed-wong/mvgswap";
  import { cleave } from "svelte-cleavejs";
  import { address } from "$lib/stores/user";
  import Empty from "$lib/images/empty-token.svg";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import Image from "$lib/components/common/image.svelte";
  import loading from '$lib/images/loading-rounded-dark.svg'
  import { BN, filterInputEvents } from "$lib/helpers/utils";
  import {
    currentPool,
    exceptedWLoading,
    inputLpAmount,
    mode1Options,
    poolsLoaded,
    receiveWAmount,
    receiveWAmounts,
    withdrawApproved,
    withdrawError,
    withdrawErrorMsg,
    withdrawMode,
  } from "$lib/stores/pool/pools";

  const fetchRecvAmount = async () => {
    // if selector wasn't selected
    if ($withdrawMode == -1) {
      withdrawMode.set(1);
      // mode1Options.set(0);
    }
    withdrawError.set(false);
    exceptedWLoading.set(true);
    // if input amount is null
    if (
      $inputLpAmount == null ||
      $inputLpAmount == 0 ||
      $inputLpAmount == undefined
    ) {
      receiveWAmount.set("0");
      receiveWAmounts.set([]);
      exceptedWLoading.set(false);
      return;
    }
    try {
      switch ($withdrawMode) {
        case 0:
          //single
          receiveWAmount.set(await $currentPool.withdrawOneCoinExpected(
            $inputLpAmount,
            $currentPool.underlyingCoinAddresses[$mode1Options]
          ));
          break;
        case 1:
          //balanced
          receiveWAmounts.set(
            await $currentPool.withdrawExpected($inputLpAmount)
          );
          break;
      }
      if ($connected) {
        withdrawApproved.set(await $currentPool.withdrawIsApproved($inputLpAmount))
      }
    } catch (e) {
      withdrawError.set(true);
      withdrawErrorMsg.set(e.message);
    } finally {
      exceptedWLoading.set(false);
    }
  };

  const setMax = (x: number) => { inputLpAmount.set(x);};

  let timeout: any = null;
  const delayInput = (event: KeyboardEvent) => {
    if (!filterInputEvents(event)) return;

    clearTimeout(timeout);
    timeout = setTimeout(async function () {
      await fetchRecvAmount();
    }, 1000);
  };
  const balance = (async () => {
    if ($connected) {
      const x = await $currentPool.wallet.lpTokenBalances();
      return BN(x.lpToken).floor(8);
    }
    return 0;
  })()
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
        disabled={!$poolsLoaded}
        class="input border-0 p-0 w-full max-w-xs outline-none focus:outline-none font-bold text-2xl transition-none"
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

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
    <div class="flex-1 ml-1">
      <!-- LP Token can't have USD Price -->
    </div>
    <div class="tooltip tooltip-left" data-tip={$_("add_liquidity.max")} on:click={() => { console.log(Promise.resolve(balance)) }}>
      {#if $connected}
        {#await balance}
        <div class="flex items-center">
          <span class="cursor-pointer"
            >{$_("add_liquidity.balance")}: </span
          >
          <img src={loading} alt="loading" class="w-5 h-5 loading" color='black'/>
        </div>
        {:then balance}
          <span class="cursor-pointer"
            >{$_("add_liquidity.balance")}: {balance}</span
          >
        {/await}
      {/if}
    </div>
  </div>
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>
