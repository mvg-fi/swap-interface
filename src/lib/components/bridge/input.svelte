<script lang="ts">
  import Svg from "$lib/components/common/svg.svelte";
  import CaretDown from "$lib/images/caret-down.svg";
  import IconAsset from "$lib/components/common/iconAsset.svelte";

  import {
    selectedFromAsset,
    selectedToAsset,
    payAmount,
    receiveAmount,
    inputFrom,
    _payAmount,
    swapInfoLoading,
    swapNotAvail,
    priceImpact,
    swapInfo
  } from "$lib/stores/bridge/bridge";
  import clsx from "clsx"
  import { _ } from "svelte-i18n";  
  import curve from "@zed-wong/mvgswap";
  import { cleave } from "svelte-cleavejs";
  import { assets } from "$lib/stores/asset";
  import { derived } from "@square/svelte-store";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import { NetworkClient } from "@mixin.dev/mixin-node-sdk";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import { setAssetDialog } from "$lib/stores/bridge/selectAsset";
  import { filterInputEvents, formatUSMoney } from "$lib/helpers/utils";

  export let from: boolean = true;

  const calcWithdrawalFee = async () => {
    const asset = await NetworkClient().fetchAsset($selectedToAsset.mixinAssetId)
    // asset.fee is amount of chainAsset
  }

  const fetchRoute = async () => {
    if ($_payAmount.isNaN() || $_payAmount.isZero()) return
    swapInfoLoading.set(true)
    try {
      const info = await curve.router.getBestRouteAndOutput($selectedFromAsset.contract, $selectedToAsset.contract, $_payAmount.toString())
      console.log(info)
      
      if (info.route.length == 0 || Number(info.output) == 0) {
        swapNotAvail.set(true)
        return;
      }
      const pi = await curve.router.priceImpact($selectedFromAsset.contract, $selectedToAsset.contract, $_payAmount.toString())
      priceImpact.set(pi)
      swapInfo.set(info)
      swapNotAvail.set(false)
      receiveAmount.set(info.output)
    } catch (e) {
      console.log(e)
      swapNotAvail.set(true)
    } finally {
      swapInfoLoading.set(false)
    }
  }

  let timeout: any = null;
  const delayInput = (event: KeyboardEvent) => {
    if (!filterInputEvents(event)) return
    clearTimeout(timeout);
    receiveAmount.set('')
    timeout = setTimeout(async function () {
      receiveAmount.set('')
      await fetchRoute()
    }, 500);
  };

  const fetchFromUSD = () => { return $assets.find((obj)=>obj.mixinAssetId==$selectedFromAsset.mixinAssetId)?.priceUsd || 0}
  const fetchToUSD = () => { return $assets.find((obj)=>obj.mixinAssetId==$selectedToAsset.mixinAssetId)?.priceUsd || 0}
  
  $: symbol = from ? $selectedFromAsset.symbol : $selectedToAsset.symbol;
  $: network = from ? $assets.find((obj)=>obj.mixinAssetId==$selectedFromAsset.mixinChainId)?.name : $assets.find((obj)=>obj.mixinAssetId==$selectedToAsset.mixinChainId)?.name
  $: usd_store = from ? derived(balance, fetchFromUSD) : derived(balance, fetchToUSD);
  $: balance = from ? getCachedAssetBalance($selectedFromAsset.mixinAssetId) : getCachedAssetBalance($selectedToAsset.mixinAssetId)
  $: usd_value = derived(usd_store, () => {
    return formatUSMoney((Number($usd_store) * Number(input_value)).toFixed(2)) || 0;
  })

  $: $selectedFromAsset, $selectedToAsset, fetchRoute()
  $: input_value = from ? $payAmount : $receiveAmount
  $: if (from) {payAmount.set(input_value)} else {receiveAmount.set(input_value)}
  $: selected_asset = from ? $selectedFromAsset : $selectedToAsset
</script>

<div class="w-full text-base-content bg-base-200 rounded-3xl">
  <div class="py-3 px-2">
    <div class="items-center justfiy-center flex space-x-0">
      <div class="flex flex-col mx-2">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          on:keyup={delayInput}
          bind:value={input_value}
          class={clsx(
            "input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none",
            "font-bold text-3xl transition-none bg-base-200",
            !from && swapInfoLoading && "fetching",
          )}
        />
      </div>
      <button
        class="flex flex-row items-center content-center mz-box rounded-3xl p-2 bg-base-100 space-x-3 mr-2"
        on:click={() => {setAssetDialog(true); inputFrom.set(from)}}
      >
        <div class="avatar ml-2 w-8 rounded-full mz-box">
          <IconAsset asset={selected_asset}/>
        </div>
        <div class="flex flex-col itmes-center">
          <span class="text-sm font-semibold uppercase">
            {symbol}
          </span>
          <span class="text-xs font-extralight opacity-60">
            {network}
          </span>
        </div>
        <div class="w-5 ml-5 mr-2 [[data-theme=dark]_&]:invert">
          <Svg src={CaretDown} alt="" />
        </div>
      </button>
    </div>
    
    {#if $connected}
      <div class="flex flex-row mx-1 mt-3 opacity-75 text-xs">
        <div class="flex-1 ml-1">
          {#if $usd_store && $usd_value != 0}
            <span>{$usd_value}</span>
          {/if}
        </div>

        {#if $balance}
          <button
            on:click={() => {
              if(from) {
                payAmount.set($balance)
                return;
              }
              receiveAmount.set($balance);
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
</div>


<style>
  .mz-box {
    -moz-box-align: center;
    -moz-box-pack: justify;
  }
  .fetching { 
    animation: 1s cubic-bezier(0.4, 0, 0.6, 1) 0s infinite normal none running loadingEffect;
  }
</style>
