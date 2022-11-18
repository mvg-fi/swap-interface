<script lang="ts">
  import { connected } from "$lib/stores/connect";
  import { approved, payAmount, receiveAmount } from "$lib/stores/swap";

  import Top from "./Top.svelte";
  import ArrowDown from "./ArrowDown.svelte";
  import SwapButton from "./SwapButton.svelte";
  import SwapInput from "./SwapInput.svelte";
  import ConnectWallet from "./ConnectWallet.svelte";
  import ApproveButton from "./ApproveButton.svelte";
  import ExchangeRate from "./SwapInfo/ExchangeRate.svelte";
  import Loading from "./SwapInfo/Loading.svelte";

  $: active =
    ($payAmount != 0 && $payAmount != undefined) ||
    ($receiveAmount != 0 && $receiveAmount != undefined);
  $: console.log(active);
</script>

<div class="card bg-base-100 shadow-xl p-2">
  <div class="py-2 px-3 flex">
    <Top />
  </div>

  <div class="w-full my-3 mb-2">
    <SwapInput from={true} id="swap-from" />
  </div>

  <div class="w-full flex justify-center items-center">
    <ArrowDown />
  </div>

  <div class="w-full my-3 mt-2">
    <SwapInput from={false} id="swap-to" />
  </div>

  {#if active}
    <ExchangeRate />
  {:else}
    <Loading />
  {/if}

  <div class="w-full pt-3">
    {#if $connected}
      {#if $approved}
        <SwapButton />
      {:else}
        <ApproveButton />
      {/if}
    {:else}
      <ConnectWallet />
    {/if}
  </div>
</div>
