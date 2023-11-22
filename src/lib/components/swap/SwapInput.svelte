<script lang="ts">
  import Svg from "$lib/components/common/svg.svelte";
  import ChevronDown from "$lib/images/chevron-down.svg";
  import IconAsset from "$lib/components/common/iconAsset.svelte";
  import SelectAssetDialog from "./SelectAsset/SelectAssetDialog.svelte";

  import curve from "@zed-wong/mvgswap";
  import {
    selectedFromAsset,
    selectedToAsset,
    payAmount,
    _payAmount,
    swapInfoLoading,
    swapNotAvail,
    swapInfo,
    receiveAmount,
    _receiveAmount,
    priceImpact,
  } from "$lib/stores/swap/swap";
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { assets } from "$lib/stores/asset";
  import { derived } from "@square/svelte-store";
  import { connected, switchNeeded } from "$lib/stores/connect";
  import { filterInputEvents, formatUSMoney } from "$lib/helpers/utils";
  import { maskOption } from "$lib/helpers/constants";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import { setAssetDialog } from "$lib/stores/swap/selectAsset";

  const fetchRoute = async () => {
    if ($_payAmount.isNaN() || $_payAmount.isZero()) return;
    swapInfoLoading.set(true);
    try {
      const info = await curve.router.getBestRouteAndOutput(
        $selectedFromAsset.contract,
        $selectedToAsset.contract,
        $_payAmount.toString()
      );
      console.log(info);

      if (info.route.length == 0 || Number(info.output) == 0) {
        swapNotAvail.set(true);
        return;
      }
      const pi = await curve.router.priceImpact(
        $selectedFromAsset.contract,
        $selectedToAsset.contract,
        $_payAmount.toString()
      );
      priceImpact.set(pi);
      swapInfo.set(info);
      swapNotAvail.set(false);
      receiveAmount.set(info.output);
    } catch (e) {
      console.log(e);
      swapNotAvail.set(true);
    } finally {
      swapInfoLoading.set(false);
    }
  };

  let timeout: any = null;
  const delayInput = (event: KeyboardEvent) => {
    if (!filterInputEvents(event)) return;
    clearTimeout(timeout);
    receiveAmount.set("");
    timeout = setTimeout(async function () {
      receiveAmount.set("");
      await fetchRoute();
    }, 500);
  };

  $: $selectedFromAsset, $selectedToAsset, fetchRoute();

  const fetchUSD = () => {
    return (
      $assets.find((obj) => obj.mixinAssetId == $selectedFromAsset.mixinAssetId)
        ?.priceUsd || 0
    );
  };
  $: symbol = $selectedFromAsset.symbol;
  $: usd_store = derived(balance, fetchUSD);
  $: balance = getCachedAssetBalance($selectedFromAsset.mixinAssetId);
  $: usd_value = derived(usd_store, () => {
    return (
      formatUSMoney((Number($usd_store) * Number($payAmount)).toFixed(2)) || 0
    );
  });

  $: if ($switchNeeded) {
    payAmount.set("");
    receiveAmount.set("");
    swapNotAvail.set(false);
  }
</script>

<div class="w-full">
  <div
    class="p-1 py-2 bg-base-200 [[data-theme=dark]_&]:border-none rounded-t-2xl space-y-1"
  >
    <div class="items-center justify-start flex mx-3 mt-1">
      <span class="text-sm opacity-50 font-medium">
        {$_("swap.you_pay")}
      </span>
    </div>
    <div class="items-center justfiy-center flex space-x-0 mr-2">
      <div class="flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          on:keyup={delayInput}
          bind:value={$payAmount}
          class="input bg-base-200 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-3xl transition-none text-base-content"
        />
      </div>
      <button
        class="flex flex-row items-center content-center mz-box bg-base-100 p-2 rounded-3xl"
        on:click={() => setAssetDialog(true)}
      >
        <div class="avatar mx-1 mr-0 w-7 rounded-full mz-box">
          <IconAsset asset={$selectedFromAsset} />
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

    <!-- {#if $connected} -->
    <div class="flex flex-row mx-2 py-1 opacity-50 text-xs text-base-content">
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
          <span class="cursor-pointer"
            >{$_("add_liquidity.balance")}: {$balance}</span
          >
        </button>
      {/if}
    </div>
    <!-- {/if} -->
  </div>

  <SelectAssetDialog />
</div>

<style>
  .mz-box {
    -moz-box-align: center;
    -moz-box-pack: justify;
  }
</style>
