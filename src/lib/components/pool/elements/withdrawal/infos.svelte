<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy } from "svelte";
  import Setting from "$lib/images/setting.svg";
  import { slippage } from "$lib/stores/swap/swap";
  import { BN, formatPercentage } from "$lib/helpers/utils";
  import { slippageDialog } from "$lib/stores/swap/slippage";
  import { NATIVE_TOKEN_SYMBOL } from "$lib/helpers/constants";
  import Loading from "$lib/components/pool/elements/deposit/loading.svelte";
  import Errors from "$lib/components/pool/elements/withdrawal/errors.svelte";
  import { currentPool, exceptedWLoading, inputLpAmount, mode1Options, receiveWAmount, receiveWAmounts, transactionWFee, withdrawError, withdrawErrorMsg, withdrawMode, _receiveWAmount } from "$lib/stores/pool/pools";

  $: min_receive = $_receiveWAmount
    .minus($_receiveWAmount.multipliedBy(BN($slippage).div(100)))
    .toFixed(8);
  $: items = $withdrawMode == 0 ? [
    {
      key: $_("technical.excepted_output") + ":",
      value: `${$_receiveWAmount.toFixed(8)} ${$currentPool.underlyingCoins[$mode1Options]}`,
    },
    {
      key: $_("technical.min_receive") + ":",
      value: `${min_receive} ${$currentPool.underlyingCoins[$mode1Options]}`,
    },
    {
      key: $_("technical.slippage") + ":",
      value: `${formatPercentage($slippage)}`,
    },
    {
      key: $_("technical.tx_fee") + ":",
      value: `${$transactionWFee} ${NATIVE_TOKEN_SYMBOL}`,
    },
  ] : [
    {
      key: $_("technical.slippage") + ":",
      value: `${formatPercentage($slippage)}`,
    },
    {
      key: $_("technical.tx_fee") + ":",
      value: `${$transactionWFee} ${NATIVE_TOKEN_SYMBOL}`,
    },
  ]

  onDestroy(() => {
    inputLpAmount.set(0);
    receiveWAmount.set("0");
    receiveWAmounts.set([]);
    withdrawError.set(false);
    withdrawErrorMsg.set('');
  });
</script>

{#if $withdrawError}
  <div class="mt-2">
    <Errors />
  </div>
{:else}
  {#each items as item, i}
    <div class="py-2 flex">
      <span class="text-sm flex-1"> {item.key} </span>
      {#if $exceptedWLoading}
        <Loading />
      {:else}
        <span class="text-sm"> {item.value} </span>
      {/if}

      {#if item.key === $_("technical.slippage") + ":" && !$exceptedWLoading}
        <button on:click={() => slippageDialog.set(true)}>
          <img
            src={Setting}
            alt=""
            class="w-3 opacity-70 ml-1 cursor-pointer setting [[data-theme=dark]_&]:invert"
          />
        </button>
      {/if}
    </div>
  {/each}
{/if}

<style>
  .setting:hover {
    opacity: 0.5;
    cursor: pointer;
    transform: rotate(40deg);
    transition: transform 0.5s;
  }
  .setting:not(:hover) {
    transform: rotate(-40deg);
    transition: transform 0.6s;
  }
</style>
