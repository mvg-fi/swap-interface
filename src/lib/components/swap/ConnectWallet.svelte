<script lang="ts">
  import SelectWalletDialog from "$lib/components/wallets/SelectWalletDialog.svelte";

  const id = "connect-wallet";
</script>

<label
  for={id}
  class="btn modal-button block flex content-center justify-center btn-lg rounded-2xl"
>
  Connect Wallet
</label>

<input type="checkbox" id={id} class="modal-toggle" />

<SelectWalletDialog id={id} />