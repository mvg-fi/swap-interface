<script lang="ts">
  import Top from "./Top.svelte";
  import ArrowDown from "./ArrowDown.svelte";
  import SwapButton from "./SwapButton.svelte";
  import SwapInput from "./SwapInput.svelte";
  import ConnectWalletBtn from "./ConnectWalletBtn.svelte";
  import ApproveButton from "./ApproveButton.svelte";
  import SwapOutput from "./SwapOutput.svelte";
  import SwapInfo from "./SwapInfo.svelte";
  import SlippageWarning from "./SlippageWarning.svelte";
  import SwapInfoLoading from "./SwapInfo/SwapInfoLoading.svelte";
  import SwapNotAvailable from "./SwapInfo/SwapNotAvailable.svelte";

  import { connected } from "$lib/stores/connect";
  import {
    approved,
    selectedFromAsset,
    swapInfoLoading,
    swapNotAvail,
    _payAmount,
    _receiveAmount,
  } from "$lib/stores/swap/swap";
  import curve from "@zed-wong/mvgswap";

  let timeout: any = null;
  const delayInput = () => {
    clearTimeout(timeout);
    timeout = setTimeout(async function () {
      await checkApproval()
    }, 1000);
  };

  const checkApproval = async () => {
    if ($connected && !$_payAmount.isNaN() && !$_payAmount.isZero()) {
      const approvedd = await curve.router.isApproved($selectedFromAsset.contract, $_payAmount.toString())
      console.log('approvedd:',approvedd)
      approved.set(approvedd)
    }
  }

  $: $_payAmount, delayInput()
</script>

<div class="card bg-base-100 shadow-xl p-2 max-w-[480px]">
  <div class="py-2 px-3 flex select-none">
    <Top />
  </div>

  <div class="w-full my-3 mb-2">
    <SwapInput />
  </div>

  <div class="w-full flex justify-center items-center">
    <ArrowDown />
  </div>

  <div class="w-full my-3 mt-2">
    <SwapOutput />
  </div>

  {#if $swapInfoLoading}
    <div class="px-2">
      <SwapInfoLoading />
    </div>
  {:else if $swapNotAvail}
    <div class="my-3">
      <SwapNotAvailable />
    </div>
  {:else}
    <div class="w-full">
      <SwapInfo />
    </div>
  {/if}

  <SlippageWarning />

  <div class="w-full pt-2">
    {#if $connected}
      {#if $approved}
        <SwapButton />
      {:else}
        <ApproveButton />
      {/if}
    {:else}
      <ConnectWalletBtn />
    {/if}
  </div>
</div>
