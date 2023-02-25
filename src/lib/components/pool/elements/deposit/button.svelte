<script lang="ts">
  import { _ } from "svelte-i18n";
  import { slippage } from "$lib/stores/swap/swap";
  import { currentPool, inputValues } from "$lib/stores/pool/pools";

  const approved = false;
  const checkApprove = () => {
    let yes: boolean[] = [];
    $inputValues.forEach(async (e, i) => {
      if (e == 0 || e == null || e == undefined) return
      if (await $currentPool.swapIsApproved($currentPool.underlyingCoinAddresses[i], e)) yes.push(true)
    })
    if (yes.includes(false)) return false
    return true
  }

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
</script>

{#if approved}
  <div>
    <button
      class="btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.deposit")} </span>
    </button>
  </div>
{:else if !approved}
  <div>
    <button
      on:click={approve}
      class="btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.approve")} </span>
    </button>
  </div>
{/if}
