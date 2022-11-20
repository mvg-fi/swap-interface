<script lang="ts">
  import { _ } from "svelte-i18n";
  import { selectWalletDialog } from "$lib/stores/selectWallet";
  import SelectWalletDialog from "../wallets/SelectWalletDialog.svelte";
  const id = "connect-wallet";
</script>

<label for={id} class="connect btn modal-button mx-2 bg-black">
  {$_("connect.title")}
</label>
<input
  type="checkbox"
  {id}
  class="modal-toggle"
  bind:checked={$selectWalletDialog}
/>
<SelectWalletDialog {id} />

<style>
  .connect {
    border: none;
    border-radius: 1rem;
  }
  .btn {
    height: 48px;
    min-height: 48px !important;
  }
</style>
