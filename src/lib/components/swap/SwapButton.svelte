<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import curve from "@zed-wong/mvgswap";
  import { selectedFromAsset, selectedToAsset, slippage, swapNotAvail, _payAmount } from "$lib/stores/swap/swap";

  let loading = false;
</script>

<button
  class={clsx(
    "w-full btn btn-lg rounded-2xl text-neutral-content border-none", 
    $swapNotAvail && "btn-disabled",
    loading && "loading",
  )}
  on:click={async () => {
    loading = true
    try {
      const tx = await curve.router.swap($selectedFromAsset.contract, $selectedToAsset.contract, $_payAmount.toString(), $slippage)
      console.log('$_payAmount.toString():',$_payAmount.toString(), '$slippage:',$slippage)
      console.log('swap tx:',tx)
    } catch (e) {
      console.log(e)
    } finally {
      loading = false;
    }
  }}
>
  {$_("swap.swap")}
</button>