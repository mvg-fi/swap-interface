<script lang="ts">
  import { _ } from "svelte-i18n";
  import Setting from "$lib/images/setting.svg";
  import { slippage } from "$lib/stores/swap/swap";
  import { formatPercentage } from "$lib/helpers/utils";
  import { slippageDialog } from "$lib/stores/swap/slippage";
  import { NATIVE_TOKEN_SYMBOL } from "$lib/helpers/constants";

  const min_receive = 0.01;
  const lp_token_name = "SBFSB";
  const tx_fee = 0.000001;
  $: slip = formatPercentage($slippage)
  $: console.log("slip:",slip)

  $: items = [
    {
      key: $_("technical.min_receive") + ":",
      value: `${min_receive} ${lp_token_name}`,
    },
    {
      key: $_("technical.slippage") + ":",
      value: `${slip}`,
    },
    {
      key: $_("technical.tx_fee") + ":",
      value: `${tx_fee} ${NATIVE_TOKEN_SYMBOL}`,
    },
  ];
</script>

{#each items as item, i}
  <div class="py-2 flex">
    <span class="text-sm flex-1"> {item.key} </span>
    <span class="text-sm"> {item.value} </span>

    {#if i === 1}
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
