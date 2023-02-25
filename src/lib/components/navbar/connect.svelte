<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setWalletDialog } from "$lib/stores/selectWallet";
</script>

<button
  class="border-none rounded-2xl h-12 min-h-12 btn modal-button mx-2 bg-base-100 hover:bg-base-100/80"
  on:click={() => {
    setWalletDialog(true);
  }}
>
  <span class="text-base-content">{$_("connect.title")}</span>
</button>