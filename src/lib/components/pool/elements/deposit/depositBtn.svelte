<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { slippage } from "$lib/stores/swap/swap";
  import { currentPool, inputValues } from "$lib/stores/pool/pools";
  import { showToast } from "$lib/components/toast/container.svelte";

  let depositLoading = false;

  const deposit = async () => {
    depositLoading = true;
    try {
      const tx = await $currentPool.deposit($inputValues, $slippage);
      console.log("Deposited:", tx);
      showToast("success", $_("add_liquidity.deposit_submitted"));
    } catch (e) {
      console.log("Deposit error:", e);
      showToast("common", e.message)
    } finally {
      depositLoading = false;
    }
  };
</script>

<div>
  <button
    on:click={() => deposit()}
    class={clsx(
      "btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl",
      depositLoading && "loading"
    )}
  >
    <span> {$_("add_liquidity.deposit")} </span>
  </button>
</div>
