<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy } from "svelte";
  import Setting from "$lib/images/setting.svg";
  import { slippage } from "$lib/stores/swap/swap";
  import { BN, formatPercentage } from "$lib/helpers/utils";
  import { slippageDialog } from "$lib/stores/swap/slippage";
  import { NATIVE_TOKEN_SYMBOL } from "$lib/helpers/constants";
  import Loading from "$lib/components/pool/elements/deposit/loading.svelte";
  import { currentPool, exceptedLoading, inputValues, invalidAmount, receiveAmount, _receiveAmount } from "$lib/stores/pool/pools";

  const tx_fee = 0.000001;
  $: min_receive = $_receiveAmount.minus($_receiveAmount.multipliedBy(BN($slippage).div(100))).toFixed(8);
  $: items = [
    {
      key: $_("technical.excepted_output") + ":",
      value: `${$_receiveAmount.toFixed(8) || null} ${$currentPool.name}`,
    },
    {
      key: $_("technical.min_receive") + ":",
      value: `${min_receive} ${$currentPool.name}`,
    },
    {
      key: $_("technical.slippage") + ":",
      value: `${0}`,
    },
    {
      key: $_("technical.tx_fee") + ":",
      value: `${tx_fee} ${NATIVE_TOKEN_SYMBOL}`,
    },
  ];

  onDestroy(()=>{
    receiveAmount.set('0')
  })
</script>

{#each items as item, i}
  <div class="py-2 flex">
    <span class="text-sm flex-1"> {item.key} </span>
    {#if $exceptedLoading && i in [0,1]}
      <div>
        <Loading />
      </div>
    {:else}
      <span class="text-sm"> {item.value} </span>
    {/if}

    {#if i === 2}
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
