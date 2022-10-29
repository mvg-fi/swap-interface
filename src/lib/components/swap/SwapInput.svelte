<script lang="ts">
  import { fromCoin, toCoin, payAmount, receiveAmount } from "$lib/stores/swap";
  
  export let from:boolean;
  $: icon = from ? 
    ($fromCoin ? $fromCoin.icon_url : "https://mvg.fi/_nuxt/img/bridge.45e32e8.png"):
    ($toCoin ? $toCoin.icon_url : "https://mvg.fi/_nuxt/img/bridge.45e32e8.png")
  $: symbol = from ? 
    ($fromCoin ? $fromCoin.symbol : "ETH"):
    ($toCoin ? $toCoin.symbol : "ETC")
</script>

<div class="flex">
  <label class="input-group">
    {#if from}
      <input
        type="text"
        placeholder="0"
        bind:value={$payAmount}
        class="input enter left input-lg"
      />
    {:else}
      <input
        type="text"
        placeholder="0"
        bind:value={$receiveAmount}
        class="input enter left input-lg"
      />
    {/if}
    <button class="btn pl-2 btn-lg">
      <div class="avatar">
        <div class="rounded-full w-6 mx-2">
          <img src={icon} alt="l" />
        </div>
      </div>
      {symbol}
    </button>
  </label>
</div>

<style>
  .enter {
    border: 2px solid rgb(239 240 249);
  }
  .left {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
  }
</style>
