<script lang="ts">
  import { NATIVE_TOKEN_SYMBOL } from "$lib/helpers/constants";
  import Setting from "$lib/images/setting.svg";

  const min_receive = 0.01;
  const lp_token_name = "SBFSB";
  const slippage = 0.012;
  const tx_fee = 0.000001;

  const items = [
    { key: "Min receive:", value: `${min_receive} ${lp_token_name}` },
    { key: "Slippage:", value: `${slippage}%` },
    { key: "Esitimated tx fee:", value: `${tx_fee} ${NATIVE_TOKEN_SYMBOL}` },
  ];
</script>

{#each items as item, i}
  <div class="py-2 flex">
    <span class="text-sm flex-1"> {item.key} </span>
    <span class="text-sm"> {item.value} </span>
    
    {#if item.key === "Slippage:"}
      <img src={Setting} alt="" class="mb-0.5 w-3 opacity-70 ml-1 cursor-pointer setting">
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