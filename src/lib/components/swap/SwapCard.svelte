<script lang="ts">
  import { connected } from "$lib/stores/connect";
  import { approved } from "$lib/stores/swap/swap";

  import Top from "./Top.svelte";
  import ArrowDown from "./ArrowDown.svelte";
  import SwapButton from "./SwapButton.svelte";
  import SwapInput from "./SwapInput.svelte";
  import ConnectWallet from "./ConnectWallet.svelte";
  import ApproveButton from "./ApproveButton.svelte";
  import SwapOutput from "./SwapOutput.svelte";
  import SwapInfo from "./SwapInfo.svelte";
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

  {#if $connected}
    <div class="w-full">
      <SwapInfo />
    </div>
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
