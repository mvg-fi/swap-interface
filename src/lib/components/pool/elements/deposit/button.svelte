<script lang="ts">
  import { _ } from "svelte-i18n";
  import { slippage } from "$lib/stores/swap/swap";
  import { currentPool, depositApproved, inputValues } from "$lib/stores/pool/pools";

  const approve = async () => {
    $inputValues.forEach(async (e, i) => {
      if (e == 0 || e == null || e == undefined) return
      const tx = await $currentPool.swapApprove($currentPool.underlyingCoinAddresses[i], e)
      console.log("Approved spending:", tx);
    })
  };

  const deposit = async () => {
    const tx = await $currentPool.deposit($inputValues, $slippage)
    console.log("Deposited:", tx)
  }

  // const getTxFee = async () => { return await $currentPool.estimateGas.deposit($inputValues) }
  // transactionFee.set(await getTxFee())
</script>

{#if $depositApproved}
  <div>
    <button
      class="btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.deposit")} </span>
    </button>
  </div>
{:else if !depositApproved}
  <div>
    <button
      on:click={approve}
      class="btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.approve")} </span>
    </button>
  </div>
{:else}
  <div>
    <button
      class="btn btn-lg btn-block btn-disabled text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.deposit")} </span>
    </button>
  </div>
{/if}
