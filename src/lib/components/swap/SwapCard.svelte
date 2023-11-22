<script lang="ts">
  import Top from "./Top.svelte";
  import ArrowDown from "./ArrowDown.svelte";
  import SwapButton from "./SwapButton.svelte";
  import SwapInput from "./SwapInput.svelte";
  import ConnectWalletBtn from "./ConnectWalletBtn.svelte";
  import ApproveButton from "./ApproveButton.svelte";
  import SwapOutput from "./SwapOutput.svelte";
  import SwapInfo from "./SwapInfo.svelte";
  import PriceImpactWarning from "./PriceImpactWarning.svelte";
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
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import InsufficientBalance from "./InsufficientBalance.svelte";

  let timeout: any = null;
  const delayInput = () => {
    clearTimeout(timeout);
    timeout = setTimeout(async function () {
      await checkApproval();
    }, 1000);
  };

  const checkApproval = async () => {
    if ($connected && !$_payAmount.isNaN() && !$_payAmount.isZero()) {
      const approvedd = await curve.router.isApproved(
        $selectedFromAsset.contract,
        $_payAmount.toString()
      );
      console.log("approvedd:", approvedd);
      approved.set(approvedd);
    }
  };

  $: $_payAmount, delayInput();
  $: balance = getCachedAssetBalance($selectedFromAsset.mixinAssetId);
  $: balanceEnough = Number($balance) > $_payAmount.toNumber();
</script>

<div class="card bg-base-100 shadow-xl p-2 max-w-[480px]">
  <div class="py-2 px-3 flex select-none">
    <Top />
  </div>

  <div class="w-full my-2 mb-[1px]">
    <SwapInput />
  </div>

  <div class="w-full">
    <ArrowDown />
  </div>

  <div class="w-full my-2 mt-[1px]">
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

  <PriceImpactWarning />

  <div class="w-full pt-2 z-0">
    {#if !$connected}
      <ConnectWalletBtn />
    {:else if !balanceEnough}
      <InsufficientBalance />
    {:else if $approved}
      <SwapButton />
    {:else}
      <ApproveButton />
    {/if}
  </div>
</div>
