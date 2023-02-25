<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setWalletDialog } from "$lib/stores/selectWallet";
</script>

<button
  class="border-none rounded-2xl h-12 min-h-12 btn modal-button mx-2 bg-black hover:bg-black/80"
  on:click={() => {
    setWalletDialog(true);
  }}
>
  <span class="text-base-100">{$_("connect.title")}</span>
</button>