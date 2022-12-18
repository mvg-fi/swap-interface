<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setWalletDialog } from "$lib/stores/selectWallet";
</script>

<button
  class="w-full btn btn-lg rounded-2xl bg-neutral text-neutral-content border-none"
  on:click={() => {
    setWalletDialog(true);
  }}
>
  {$_("swap.connect_wallet")}
</button>

<style>
  * {
    font-family: "Inter-Regular", Helvetica, Arial, sans-serif !important;
  }
</style>
