<script lang="ts">
  import Navbar from "$lib/components/navbar/navbar.svelte";
  import Toast from "$lib/components/toast/container.svelte";
  import { setAssetDialog } from "$lib/stores/selectAsset";
  import { setWalletDialog } from "$lib/stores/selectWallet";
  import Loading from "./loading.svelte";

  import { initi18n } from "../i18n/i18n";
  import "../app.postcss";
  import "./styles.css";

  const setupI18n = initi18n();
  const escQuitDialogs = (e:any) => {
    if (e.keyCode === 27) {
      setAssetDialog(false);
      setWalletDialog(false);
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
  <Toast />
{/await}
<svelte:window on:keyup={escQuitDialogs} />

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
