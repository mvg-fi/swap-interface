<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "./loading.svelte";
  import { assets, updateAssets } from "$lib/stores/asset";
  import type { Asset } from "$lib/types/asset";
  import Navbar from "$lib/components/navbar/navbar.svelte";
  import Toast from "$lib/components/toast/container.svelte";
  import { setWalletDialog } from "$lib/stores/selectWallet";
  import { setSlippageDialog } from "$lib/stores/swap/slippage";
  import SlippageSetting from "$lib/components/swap/SlippageSetting.svelte";
  import ConnectWalletDialog from "$lib/components/wallets/ConnectWalletDialog.svelte";
  import {
    setAssetDialog,
    setToAssetDialog,
  } from "$lib/stores/swap/selectAsset";

  import "../app.postcss";
  import "./styles.css";
  import { initi18n } from "../i18n/i18n";
  import curve from "@zed-wong/mvgswap";
  import { MVM_RPC_URL } from "$lib/helpers/constants";
  import { createWeb3Client } from "$lib/helpers/clients";
  import { setProvider } from "$lib/stores/ethers";
  import { mainPools, factoryPools, cryptoFactoryPools, poolsLoaded } from "$lib/stores/pool/pools";

  let a: Asset[] | undefined = $page.data.assets;
  a?.length && !$assets.length && assets.set(a);
  $: a?.length && !$assets.length && assets.set(a);

  const setupFn = async () => {
    await initi18n();
  }

  (async () => {
    try {
      await curve.init("JsonRpc", { url: MVM_RPC_URL }, { chainId: 73927 })
      await curve.fetchFactoryPools()
      await curve.fetchCryptoFactoryPools()

      mainPools.set(curve.getAllMainPools())
      factoryPools.set(curve.getAllFactoryPools())
      cryptoFactoryPools.set(curve.getAllCryptoFactoryPools())
      poolsLoaded.set(true)
      // TODO: Auto connect to last connected provider
      // const web3Client = await createWeb3Client();
      // const p = await web3Client.cacheConnect();
      // if (p) await setProvider(p);
      // await updateAssets();
    } catch (e: unknown) {
      console.error(e);
    }
  })();

  const setup = setupFn()

  const escQuitDialogs = (e: any) => {
    if (e.keyCode === 27) {
      setAssetDialog(false);
      setToAssetDialog(false);
      setWalletDialog(false);
      setSlippageDialog(false);
    }
  };
</script>

{#await setup}
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
  <SlippageSetting />
  <ConnectWalletDialog />
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
