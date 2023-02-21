<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import {
    approved,
    selectedFromAsset,
    swapNotAvail,
    _payAmount,
  } from "$lib/stores/swap/swap";
  import curve from "@zed-wong/mvgswap";

  let loading = false;
</script>

<button
  class={clsx(
    "w-full btn btn-lg rounded-2xl text-neutral-content border-none",
    $swapNotAvail && "btn-disabled",
    loading && "loading",
  )}
  on:click={ async () => {
    loading = true
    try {
      const tx = await curve.router.approve($selectedFromAsset.contract, $_payAmount.toString());
      console.log('approve tx:', tx)
      approved.set(true)
    } catch (e) {
      console.log(e)
    } finally {
      loading = false
    }
  }}
>
  {$_("swap.approve")}
</button>
