<script lang="ts">
  import Svg from "$lib/components/common/svg.svelte";
  import Image from "$lib/components/common/image.svelte";
  import ChevronDown from "$lib/images/chevron-down.svg";
  import IconAsset from "$lib/components/common/iconAsset.svelte";
  import { setToAssetDialog } from "$lib/stores/swap/selectAsset";
  import SelectToAssetDialog from "./SelectAsset/SelectToAssetDialog.svelte";

  import { selectedToAsset, receiveAmount } from "$lib/stores/swap/swap";
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";

  $: icon = $selectedToAsset.logoURI;
  $: symbol = $selectedToAsset.symbol;
  $: balance = getCachedAssetBalance($selectedToAsset.mixinAssetId);

  // let timeout: any = null;
  // function delayOutput() {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(function () {
  //     fetchDyFromContract($selectedFromAsset, $selectedToAsset, $receiveAmount);
  //   }, 1000);
  // }
</script>

<div class="w-full">
  <div class="p-1 py-2 border-solid bd rounded-2xl">
    <div class="items-center justfiy-center flex">
      <div class="flex-1 flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          bind:value={$receiveAmount}
          class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-3xl"
        />
      </div>
      <button
        class="flex flex-row items-center content-center mz-box"
        on:click={() => setToAssetDialog(true)}
      >
        <div class="avatar mx-1 mr-0 w-7 rounded-full mz-box">
          <IconAsset asset={$selectedToAsset} />
        </div>
        <div class="flex itmes-center">
          <span class="uppercase font-bold text-xl mx-2">
            {symbol}
          </span>
        </div>
        <div class="w-3 mr-2">
          <Svg src={ChevronDown} alt="" />
        </div>
      </button>
    </div>

    {#if $connected}
      <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
        <div class="flex-1 ml-1" />

        {#if $balance}
          <button
            on:click={() => {
              receiveAmount.set($balance);
            }}
            class="tooltip tooltip-left"
            data-tip={$_("add_liquidity.max")}
          >
            <span class="cursor-pointer"
              >{$_("add_liquidity.balance")}: {$balance}</span
            >
          </button>
        {/if}
      </div>
    {/if}
  </div>

  <SelectToAssetDialog />
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>
