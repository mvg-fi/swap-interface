<script lang="ts">
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { isMixin } from "$lib/helpers/mixin";
  import authorize from "$lib/helpers/web3/mixin";
  import { setConnected } from "$lib/stores/connect";
  import { setWalletDialog } from "$lib/stores/selectWallet";
  import { OAUTH_SCOPE, SWAP_BOT_ID } from "$lib/helpers/constants";

  let qrLoading = false;

  const ism = isMixin();
  const auth = () => {
    qrLoading = true;
    authorize(
      { clientId: SWAP_BOT_ID, scope: OAUTH_SCOPE, pkce: true },
      {
        onShowUrl: (url) => {
          goto(url);
          qrLoading = false;
          console.log("onShowURL:", url);
        },
        onError: (error) => {
          console.error(error);
          qrLoading = false;
          return;
        },
        onSuccess: async (data) => {
          qrLoading = false;
          setConnected(true)
          return;
        },
      },
    );
  };
</script>

<button
  class="w-full btn btn-lg rounded-2xl bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l text-base-100 border-none"
  on:click={() => {
    ism ? auth() : setWalletDialog(true);
  }}
>
  {#if qrLoading}
    <span class="loading loading-spinner"></span>
  {:else}
    {$_("swap.connect_wallet")}
  {/if}
</button>

<style>
</style>
