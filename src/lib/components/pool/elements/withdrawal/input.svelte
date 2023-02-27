<script lang="ts">
  import { _ } from "svelte-i18n";
  import curve from "@zed-wong/mvgswap";
  import { cleave } from "svelte-cleavejs";
  import { address } from "$lib/stores/user";
  import Empty from "$lib/images/empty-token.svg";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import Image from "$lib/components/common/image.svelte";
  import { currentPool, inputWValues } from "$lib/stores/pool/pools";
  import Loading from "$lib/components/swap/SwapInfo/Loading.svelte";

  const price = 1224;
  $: value = null;

  const balance = (async () =>
    $connected
      ? $currentPool.wallet.lpTokenBalances()
      : 0)();

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
        use:cleave={maskOption}
        bind:value={$inputWValues}
        class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-2xl transition-none"
      />
    </div>
    <div class="avatar mx-1 mr-0">
      <div class="w-6 rounded-full">
        <Image src={Empty} alt="" />
      </div>
    </div>
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
        <Loading />
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
