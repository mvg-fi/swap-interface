<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import { slippage } from "$lib/stores/swap/swap";
  import {
    currentPool,
    depositApproved,
    depositError,
    depositErrorMsg,
    exceptedLoading,
    inputValues,
  } from "$lib/stores/pool/pools";
  import { setWalletDialog } from "$lib/stores/selectWallet";

  let approveLoading = false;
  let depositLoading = false;

  const approve = async () => {
    approveLoading = true
    try {
      const tx = await $currentPool.depositApprove($inputValues)
      console.log("Approved:", tx);
    } catch (e) {
      depositError.set(true)
      depositErrorMsg.set(e.message)
      console.log('Approve error:',e)
    } finally {
      approveLoading = false
    }
  };

  const deposit = async () => {
    depositLoading = true
    try {
      const tx = await $currentPool.deposit($inputValues, $slippage);
      console.log("Deposited:", tx);
    } catch (e) {
      depositError.set(true)
      depositErrorMsg.set(e.message)
      console.log('Deposit error:',e)
    } finally {
      depositLoading = false
    }
  };
</script>

{#if !$connected}
  <div>
    <button
      on:click={ () => setWalletDialog(true) }
      class="btn btn-lg btn-block rounded-2xl bg-black hover:bg-black/80 text-base-100 border-none"
    >
      <span> {$_("add_liquidity.connect_wallet")} </span>
    </button>
  </div>
{:else if $exceptedLoading || $depositError}
  <div>
    <button
      class="btn btn-disabled btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.deposit")} </span>
    </button>
  </div>
{:else if !$depositApproved}
  <div>
    <button
      on:click={()=>approve()}
      class="btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.approve")} </span>
    </button>
  </div>
{:else}
  <div>
    <button
      on:click={()=>deposit()}
      class="btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.deposit")} </span>
    </button>
  </div>
{/if}
