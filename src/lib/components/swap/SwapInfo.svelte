<script lang="ts">
  import { _ } from "svelte-i18n";
  import info from "$lib/images/information.svg";
  import { formatDecimals } from "$lib/helpers/utils";
  import {
    payAmount,
    receiveAmount,
    selectedFromAsset,
    selectedToAsset,
  } from "$lib/stores/swap/swap";

  let checked = false;
  let rotate = false;
  let infos = {
    excepted_output: {
      key: $_('technical.excepted_output'),
      value: 0,
    },
    min_receive: {
      key: $_('technical.min_receive'),
      value: 0,
    },
    trade_through: {
      key: $_('technical.trade_through'),
      value: '3pool',
    },
    price_impact: {
      key: $_('technical.price_impact'),
      value: 0,
    },
  };
</script>

<div class="collapse collapse-arrow border-base-300 rounded-2xl">
  <input type="checkbox" bind:checked />
  <div class="collapse-title text-sm font-medium flex flex-col justify-center items-start py-3 z-0">
    {#if $payAmount && $receiveAmount && $selectedFromAsset && $selectedToAsset}
      <button on:click={()=>rotate=!rotate} class="">
        <div class="flex flex-row align-middle">
          <div class="tooltip" data-tip="hello">
            <img src={info} alt="" class="w-4 mr-2 opacity-40 z-20"/>
          </div>
          <span class="font-medium">
            {`1 ${rotate ? $selectedToAsset.symbol : $selectedFromAsset.symbol}
              = ${rotate ? formatDecimals($payAmount / $receiveAmount, 6) : formatDecimals($receiveAmount / $payAmount, 6)}
                ${rotate ? $selectedFromAsset.symbol : $selectedToAsset.symbol}`}
          </span>
        </div>
      </button>
    {/if}
  </div>
  <div class="collapse-content py-0">
    <div class="h-full w-full text-c">
      {#each Object.values(infos) as info}
        <div class="">
          <div class="my-2 mr-1 flex justify-between">
            <span>{info.key}:</span>
            <span>{info.value}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .collapse {
    visibility: visible !important;
  }
  .collapse-title, :where(.collapse > input[type="checkbox"]) {
    min-height: 2.5rem;
  }
  .collapse-arrow .collapse-title::after{
    height: 0.4rem;
    width: 0.4rem;
    opacity: 0.5;
  }
  .text-c {
    color: rgb(119, 128, 160);
  }
</style>
