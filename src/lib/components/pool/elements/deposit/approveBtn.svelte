<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import {
    currentPool,
    depositApproved,
    inputValues,
  } from "$lib/stores/pool/pools";
  import { showToast } from "$lib/components/toast/container.svelte";

  let approveLoading = false;

  const approve = async () => {
    approveLoading = true;
    try {
      const approvedTxs = await $currentPool.depositApprove($inputValues);
      console.log("Approved:", approvedTxs);
      if (approvedTxs.length != 0) depositApproved.set(true);
      showToast("success", $_("add_liquidity.approve_success"));
    } catch (e) {
      console.log("Approve error:", e);
      showToast("common", e.message)
    } finally {
      approveLoading = false;
    }
  };
</script>

<!-- FIX: Ethers Invalid address bug-->

<div>
  <button
    on:click={() => approve()}
    class={clsx(
      "btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl",
      approveLoading && "loading"
    )}
  >
    <span> {approveLoading ? $_("add_liquidity.approve_in_your_wallet") : $_("add_liquidity.approve")} </span>
  </button>
</div>
