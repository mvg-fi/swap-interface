<script lang="ts">
  import { _ } from "svelte-i18n";
  import curve from "@zed-wong/mvgswap";
  import { cleave } from "svelte-cleavejs";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import Image from "$lib/components/common/image.svelte";
  import { currentPool } from "$lib/stores/pool/pools";
    import Loading from "$lib/components/swap/SwapInfo/Loading.svelte";
    import { address } from "$lib/stores/user";
  
  // const icon = "https://mixin-images.zeromesh.net/MZhG5lLirhrfLHpDf16NCmSrUUWY9rO4FX7BqMQPbvzTrCDNAxqO6ovERoDIU7puvXatQ9suZglFw_GiBO_26lg3A1LdbLV6Fj7h=s128"
  
  const price = 1224;
  $: value = null;

  const balance = (async () => $connected ? await $currentPool.wallet.lpTokenBalances($address).lpToken || 0 : 0)()

  const setMax = (x: number) => {
    value = x;
  };
</script>

<div class="p-1 m-1 border-solid rounded-2xl bd">
  <div class="items-center justfiy-center flex">
    <div class="flex-1 flex flex-col mx-3">
      <input
        type="tel"
        placeholder="0"
        bind:value={value}
        use:cleave={maskOption}
        class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-2xl transition-none"
      />
    </div>
    <!-- <div class="avatar mx-1 mr-0">
      <div class="w-7 rounded-full">
        <Image src={icon} alt="" />
      </div>
    </div> -->
    <div class="mt-0.5 mx-2">
      <span class="uppercase font-bold"> {$currentPool.name} </span>
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
      {#await balance}
        <Loading/>
      {:then balance}
        <span class="cursor-pointer"
          >{$_("add_liquidity.balance")}: {balance}</span
        >
      {/await}
    </div>
  </div>
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>