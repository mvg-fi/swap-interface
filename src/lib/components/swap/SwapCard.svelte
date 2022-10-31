<script lang="ts">
  import Top from "./Top.svelte";
  import ArrowDown from "./ArrowDown.svelte";
  import SwapButton from "./SwapButton.svelte";
  import SwapInput from "./SwapInput.svelte";
  import ConnectWallet from "./ConnectWallet.svelte";

  // Placeholder
  const connected = false;
</script>

<div class="card  bg-base-100 shadow-xl p-2">
  <div class="py-2 px-3 flex">
    <Top />
  </div>

  <div class="w-full my-3 mb-2">
    <SwapInput from={true} id="swap-from"/>
  </div>

  <div class="w-full flex justify-center content-center">
    <ArrowDown />
  </div>

  <div class="w-full my-3 mt-2">
    <SwapInput from={false} id="swap-to"/>
  </div>

  {#if !connected}
    <div class="w-full pt-3">
      <ConnectWallet />
    </div>
  {:else}
    <div>
      <SwapButton />
    </div>
  {/if}
</div>

<style>
</style>