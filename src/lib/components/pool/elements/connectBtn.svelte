<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setWalletDialog } from "$lib/stores/selectWallet";
</script>

<div>
  <button
    on:click={ () => setWalletDialog(true) }
    class="btn btn-lg btn-block rounded-2xl bg-black hover:bg-black/80 text-base-100 border-none"
  >
    <span> {$_("add_liquidity.connect_wallet")} </span>
  </button>
</div>