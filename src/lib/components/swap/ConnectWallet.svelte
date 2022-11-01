<script lang="ts">
  import { openDialog, selectWalletDialog } from "$lib/stores/selectWallet";
  import SelectWalletDialog from "../wallets/SelectWalletDialog.svelte";

  const id = "connect-wallet";
</script>

<label class="w-full" for={id}>
  <button
    on:click={() => openDialog(true)}
    class="btn w-full btn-lg rounded-2xl bg-black"
  >
    Connect Wallet
  </button>
</label>

<input type="checkbox" id={id} class="modal-toggle" bind:checked={$selectWalletDialog}/>
<SelectWalletDialog {id}/>

<style>
  * {
    font-family: "Inter-Regular", Helvetica, Arial, sans-serif !important;
  }
</style>
