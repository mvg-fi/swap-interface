<script lang="ts">
  import { _ } from "svelte-i18n";
  import Switch from "$lib/images/switch.svg";
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
      info: $_('technical.excepted_output_info'),
    },
    min_receive: {
      key: $_('technical.min_receive'),
      value: 0,
      info: $_('technical.min_receive_info'),
    },
    trade_through: {
      key: $_('technical.trade_through'),
      value: '3pool',
      info: $_('technical.trade_through_info'),
    },
    price_impact: {
      key: $_('technical.price_impact'),
      value: 0,
      info: $_('technical.price_impact_info'),
    },
  };
</script>

<div class="collapse collapse-arrow border-base-300 rounded-2xl">
  <input type="checkbox" bind:checked />
  <div class="collapse-title text-sm font-medium flex flex-col justify-center items-start py-3">
    <!-- TODO (fetch and loading) -->
    {#if $payAmount && $receiveAmount && $selectedFromAsset && $selectedToAsset}
      <button on:click={()=>rotate=!rotate}>
        <div class="flex flex-row align-middle">
          <div class="dropdown dropdown-top dropdown-hover flex items-center mr-2 z-20 [[data-theme=dark]_&]:invert">
            <img src={Switch} alt="" class="w-4 opacity-40 shake"/>
          </div>
          <span class="font-medium text-base-content z-20">
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
      {#each Object.values(infos) as info, i}
        <div>
          <div class="my-2 mr-1 flex justify-between">
            <!-- TODO: fix dropdown got cut, and top only -->
            <div class="dropdown dropdown-hover" class:dropdown-bottom={i==0||i==1} class:dropdown-top={i==2||i==3}>
              <button tabindex="0">
                <span class="select-none">{info.key}:</span>
              </button>
              <div class="card dropdown-content bg-base-100 p-1 px-4 w-52 border-2 flex items-center text-start">
                <span>{info.info}</span>
              </div>
            </div>
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
  .shake:hover {
    animation-name: shake;
    animation-duration: 0.5s;
  }

  @keyframes shake {
    30% {
      transform: rotate(10deg);
    }
    60% {
      transform: rotate(-10deg);
    }
    90% {
      transform: rotate(0deg);
    }
  }
</style>
