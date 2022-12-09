<script lang="ts">
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
</script>

<div class="collapse collapse-arrow border-base-300 rounded-2xl">
  <input type="checkbox" bind:checked />
  <div class="collapse-title text-sm font-medium flex flex-col justify-center items-start py-3">
    {#if $payAmount && $receiveAmount && $selectedFromAsset && $selectedToAsset}
      <button on:click={()=>rotate=!rotate} class="z-10">
        <div class="flex flex-row align-middle">
          <img src={info} alt="" class="w-4 mr-2 opacity-40 z-20"/>
          <span class="font-semibold">
            {`1 ${rotate ? $selectedToAsset.symbol : $selectedFromAsset.symbol}
              = ${rotate ? formatDecimals($payAmount / $receiveAmount, 4) : formatDecimals($receiveAmount / $payAmount, 4)}
                ${rotate ? $selectedFromAsset.symbol : $selectedToAsset.symbol}`}
          </span>
        </div>
      </button>
    {/if}
  </div>
  <div class="collapse-content">
    <div class="h-full w-full flex-col flex">
      <div>Expected output</div>
      <div>Price Impact</div>
      <div>Trade through</div>
      <div>Slippage tolerance</div>
    </div>
  </div>
</div>

<style>
  /* .bd {
    border-width: 1.25px;
  } */
  .collapse {
    visibility: visible !important;
  }
  .collapse-title, :where(.collapse > input[type="checkbox"]) {
    min-height: 2.5rem;
  }
  .collapse-arrow .collapse-title::after{
    height: 0.4rem;
    width: 0.4rem;
  }
</style>
