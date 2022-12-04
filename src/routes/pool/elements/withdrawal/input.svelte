<script lang="ts">
  import Image from "$lib/components/common/image.svelte";
  import { _ } from "svelte-i18n";
  const coin = "4stable";
  const icon = "https://mixin-images.zeromesh.net/MZhG5lLirhrfLHpDf16NCmSrUUWY9rO4FX7BqMQPbvzTrCDNAxqO6ovERoDIU7puvXatQ9suZglFw_GiBO_26lg3A1LdbLV6Fj7h=s128"
  
  const price = 1224;
  const balance = 0.001;
  $: value = 0;
  // $: console.log(value)

  const setMax = (x: number) => {
    console.log(x);
    value = x;
  };
</script>

<div class="p-1 m-1 border-solid border-2 rounded-2xl bd">
  <div class="items-center justfiy-center flex">
    <div class="flex-1 flex flex-col mx-3">
      <input
        type="number"
        placeholder="0"
        bind:value={value}
        class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-2xl"
      />
    </div>
    <div class="avatar mx-1 mr-0">
      <div class="w-7 rounded-full">
        <Image src={icon} alt="" />
      </div>
    </div>
    <div class="mt-0.5 mx-2">
      <span class="uppercase font-bold"> {coin} </span>
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
      <span class="cursor-pointer"
        >{$_("add_liquidity.balance")}: {balance}</span
      >
    </div>
  </div>
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>