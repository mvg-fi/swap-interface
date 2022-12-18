<script lang="ts">
  import Svg from "$lib/components/common/svg.svelte";
  import ChevronDown from "$lib/images/chevron-down.svg";
  import IconAsset from "$lib/components/common/iconAsset.svelte";
  import SelectAssetDialog from "./SelectAsset/SelectAssetDialog.svelte";

  import {
    selectedFromAsset,
    selectedToAsset,
    payAmount,
  } from "$lib/stores/swap/swap";
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { assets } from "$lib/stores/asset";
  import { derived } from "@square/svelte-store";
  import { connected } from "$lib/stores/connect";
  import { formatUSMoney } from "$lib/helpers/utils";
  import { maskOption } from "$lib/helpers/constants";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";
  import { setAssetDialog } from "$lib/stores/swap/selectAsset";

  let timeout: any = null;
  const delayInput = () => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fetchDyFromContract($selectedFromAsset, $selectedToAsset, $payAmount);
    }, 1000);
  };
  const validateInput = (s: string): [boolean, string] => {
    if (Number(s) <= 0) return [false, $_("input.input_number")];
    return [false, "Invalid Input"];
  };
  const fetchUSD = () => { return $assets.find((obj)=>obj.mixinAssetId==$selectedFromAsset.mixinAssetId)?.priceUsd || 0};
  
  $: symbol = $selectedFromAsset.symbol;
  $: usd_store = derived(balance, fetchUSD);
  $: balance = getCachedAssetBalance($selectedFromAsset.mixinAssetId)
  $: usd_value = derived(usd_store, () => {return formatUSMoney((Number($usd_store) * Number($payAmount)).toFixed(2)) || 0;});
</script>

<div class="w-full">
  <div class="p-1 py-2 border-solid bd rounded-2xl">
    <div class="items-center justfiy-center flex space-x-0">
      <div class="flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          on:keyup={delayInput}
          bind:value={$payAmount}
          class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-3xl transition-none text-base-content"
        />
      </div>
      <button
        class="flex flex-row items-center content-center mz-box"
        on:click={() => setAssetDialog(true)}
      >
        <div class="avatar mx-1 mr-0 w-7 rounded-full mz-box">
          <IconAsset asset={$selectedFromAsset} assetClass="h-10 w-10"/>
        </div>
        <div class="flex itmes-center">
          <span class="uppercase font-bold text-xl mx-2 text-base-content">
            {symbol}
          </span>
        </div>
        <div class="w-3 mr-2 [[data-theme=dark]_&]:invert">
          <Svg src={ChevronDown} alt="" />
        </div>
      </button>
    </div>
    
    {#if $connected}
      <div class="flex flex-row mx-2 my-1 opacity-75 text-xs text-base-content">
        <div class="flex-1 ml-1">
          {#if $usd_store}
            <span>{$usd_value}</span>
          {/if}
        </div>

        {#if $balance}
          <button
            on:click={() => {
              payAmount.set($balance);
            }}
            class="tooltip tooltip-left"
            data-tip={$_("add_liquidity.max")}
          >
            <span>{$_("add_liquidity.balance")}: {$balance}</span>
          </button>
        {/if}
      </div>
    {/if}
  </div>

  <SelectAssetDialog />
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
  .mz-box {
    -moz-box-align: center;
    -moz-box-pack: justify;
  }
</style>
