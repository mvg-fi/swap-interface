<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { slippage } from "$lib/stores/swap/swap";
  import { currentPool, inputLpAmount, mode1Options, withdrawMode } from "$lib/stores/pool/pools";
  import { showToast } from "$lib/components/toast/container.svelte";

  let withdrawLoading = false;

  const withdraw = async () => {
    withdrawLoading = true;
    let tx;
    try {
      switch ($withdrawMode) {
        case 0:
          console.log("withdraw single coin");
          tx = await $currentPool.withdrawOneCoin($inputLpAmount, $currentPool.underlyingCoinAddresses[$mode1Options], $slippage)
          break;
        case 1:
          console.log("withdraw balanced amounts");
          tx = await $currentPool.withdraw($inputLpAmount, $slippage);
          break;
      }
      console.log("withdrawed:", tx);
      showToast("success", $_("remove_liquidity.withdraw_submitted"));
    } catch (e) {
      console.log("withdraw error:", e);
      showToast("common", e.message)
    } finally {
      withdrawLoading = false;
    }
  };
</script>

<div>
  <button
    on:click={() => withdraw()}
    class={clsx(
      "btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl",
      withdrawLoading && "loading"
    )}
  >
    <span> {$_("add_liquidity.withdraw")} </span>
  </button>
</div>
