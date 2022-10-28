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

<div>
  <label class="input-group">
    {#if from}
      <input
        type="text"
        placeholder="0"
        bind:value={$payAmount}
        class="input flex-1 enter"
      />
    {:else}
      <input
        type="text"
        placeholder="0"
        bind:value={$receiveAmount}
        class="input flex-1 enter "
      />
    {/if}
    <button class="btn pl-2">
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
</style>
