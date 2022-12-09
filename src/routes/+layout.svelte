<script lang="ts">
  import { page } from '$app/stores';
  import Loading from "./loading.svelte";
  import { assets } from '$lib/stores/asset';
  import type { Asset } from '$lib/types/asset';
  import Navbar from "$lib/components/navbar/navbar.svelte";
  import Toast from "$lib/components/toast/container.svelte";
  import { setWalletDialog } from "$lib/stores/selectWallet";
  import { setSlippageDialog } from "$lib/stores/swap/slippage";
  import { setAssetDialog, setToAssetDialog } from "$lib/stores/swap/selectAsset";
  import SelectWalletDialog from "$lib/components/wallets/SelectWalletDialog.svelte";

  import { initi18n } from "../i18n/i18n";
  import "../app.postcss";
  import "./styles.css";
    
  let a: Asset[] | undefined = $page.data.assets;
	a?.length && !$assets.length && assets.set(a);
	$: a?.length && !$assets.length && assets.set(a);

  const setupI18n = initi18n();
  const escQuitDialogs = (e: any) => {
    if (e.keyCode === 27) {
      setAssetDialog(false);
      setToAssetDialog(false);
      setWalletDialog(false);
      setSlippageDialog(false);
    }
  };
</script>

{#await setupI18n}
  <Loading />
{:then}
  <div class="app">
    <header>
      <Navbar />
    </header>

    <main>
      <slot />
    </main>

    <footer />
  </div>

  <SelectWalletDialog />
  <Toast />
{/await}
<svelte:window on:keydown={escQuitDialogs} />

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
