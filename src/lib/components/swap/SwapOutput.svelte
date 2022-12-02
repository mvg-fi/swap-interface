<script lang="ts">
  import {
    selectedFromAsset,
    selectedToAsset,
    receiveAmount,
  } from "$lib/stores/swap/swap";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";
  import { setToAssetDialog } from "$lib/stores/swap/selectAsset";
  import SelectToAssetDialog from "./SelectAsset/SelectToAssetDialog.svelte";
  import { cleave } from "svelte-cleavejs";
  import { _ } from "svelte-i18n";
  import { maskOption } from "$lib/helpers/constants";
  import { connected } from "$lib/stores/connect";
  import Image from "$lib/components/common/image.svelte";
  import ChevronDown from "$lib/images/chevron-down.svg";

  $: icon = $selectedToAsset.icon_url;
  $: symbol = $selectedToAsset.symbol;

  $: balance = 0.0001;
  $: balanceLoaded = true;
  $: usdLoaded = false;

  let timeout: any = null;
  function delayOutput() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fetchDyFromContract($selectedFromAsset, $selectedToAsset, $receiveAmount);
    }, 1000);
  }
</script>

<div class="w-full">
  <div class="p-1 m-1 border-solid bd rounded-2xl">
    <div class="items-center justfiy-center flex">
      <div class="flex-1 flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          on:keyup={delayOutput}
          bind:value={$receiveAmount}
          class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-2xl"
        />
      </div>
      <button
        class="flex flex-row items-center"
        on:click={() => setToAssetDialog(true)}
      >
        <div class="avatar mx-1 mr-0">
          <div class="w-7 rounded-full">
            <Image src={icon} alt="" />
          </div>
        </div>
        <div class="mx-2">
          <span class="uppercase font-bold text-xl"> {symbol} </span>
        </div>
        <div class="w-3 mr-2">
          <Image src={ChevronDown} alt="" />
        </div>
      </button>
    </div>

    <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
      <div class="flex-1 ml-1">
        {#if usdLoaded}
          <span>${(1234 * $receiveAmount).toFixed(2)}</span>
        {/if}
      </div>

      {#if balanceLoaded}
        <button
          on:click={() => {
            receiveAmount.set(balance);
          }}
          class="tooltip tooltip-left"
          data-tip={$_("add_liquidity.max")}
        >
          <span class="cursor-pointer"
            >{$_("add_liquidity.balance")}: {balance}</span
          >
        </button>
      {/if}
    </div>
  </div>

  <SelectToAssetDialog />
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>
