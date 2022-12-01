<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setWalletDialog } from "$lib/stores/selectWallet";
</script>

<button
  class="connect btn modal-button mx-2 bg-black"
  on:click={() => {
    setWalletDialog(true);
  }}
>
  {$_("connect.title")}
</button>

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
