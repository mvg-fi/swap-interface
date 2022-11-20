<script lang="ts">
  import { selectWalletDialog } from "$lib/stores/selectWallet";
  import SelectWalletDialog from "../wallets/SelectWalletDialog.svelte";
  import { _ } from "svelte-i18n";

  const id = "connect-wallet";
</script>

<label for={id} class="w-full btn btn-lg rounded-2xl bg-black">
  {$_("swap.connect_wallet")}
</label>

<input
  type="checkbox"
  {id}
  class="modal-toggle"
  bind:checked={$selectWalletDialog}
/>
<SelectWalletDialog id="connect-wallet" />

<style>
  * {
    font-family: "Inter-Regular", Helvetica, Arial, sans-serif !important;
  }
</style>
