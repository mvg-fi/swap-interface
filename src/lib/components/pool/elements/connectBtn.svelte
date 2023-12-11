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
          setTimeout(()=>{
            qrLoading = false
          }, 15000)
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

<div>
  <button
    on:click={ () => ism ? auth() : setWalletDialog(true) }
    class="btn btn-lg btn-block rounded-2xl bg-primary hover:bg-primary/80 text-base-100 border-none"
  >
    <span> {$_("add_liquidity.connect_wallet")} </span>
  </button>
</div>