<script lang="ts">
  import { connected } from "$lib/stores/connect";
  import { approved, swapFetched, swapNotAvail } from "$lib/stores/swap/swap";

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

  {#if $connected && $swapFetched}
    <div class="w-full">
      <SwapInfo />
    </div>
  {:else if $connected && !$swapFetched}
    <div class="px-2">
      <SwapInfoLoading />
    </div>
  {:else if $connected && $swapFetched && $swapNotAvail}
    <div>
      <SwapNotAvailable />
    </div>
  {/if}

  <SlippageWarning />

  <!-- TODO: FetchInfoLoading -->
  <!-- TODO: SwapIsNotAvailable -->

  <div class="w-full pt-3">
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
