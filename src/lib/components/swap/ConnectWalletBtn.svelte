<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setWalletDialog } from "$lib/stores/selectWallet";
</script>

<button
  class="w-full btn btn-lg rounded-2xl bg-primary hover:bg-primary/80 text-base-100 border-none"
  on:click={() => {
    setWalletDialog(true);
  }}
>
  {$_("swap.connect_wallet")}
</button>

<style>
</style>
