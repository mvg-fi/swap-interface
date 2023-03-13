<script lang="ts">
  import fennec from "$lib/images/logo/fennec.png";
  import metamask from "$lib/images/logo/metamask.svg";
  import loadingHuge from "$lib/images/loading-huge.svg";
  import mixinMessenger from "$lib/images/logo/mixin.svg";
  import walletConnect from "$lib/images/logo/walletconnect.svg";
  import { showToast } from "$lib/components/toast/container.svelte";

  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import curve from "@zed-wong/mvgswap";
  import type { IProvider } from "$lib/types/provider";
  import type { ProviderKey } from "$lib/types/provider";
  import { createWeb3Client } from "$lib/helpers/clients/index";
  import { account, chainId, setProvider } from "$lib/stores/ethers";
  import { registerAndSave } from "$lib/stores/user";
  import { setConnected, setSwitchNeeded } from "$lib/stores/connect";
  import {
    setWalletDialog,
    ConnectWalletDialog,
  } from "$lib/stores/selectWallet";
  import { providerKey as cacheProvider } from "$lib/stores/provider";
  import { updateAssets } from "$lib/stores/asset";
    import { cryptoFactoryPools, factoryPools, mainPools, poolsLoaded } from "$lib/stores/pool/pools";

  let content: any;
  let loading = false;
  function onClickOutside(e: any) {
    if (content === null) return;
    if (content == e.target || content.contains(e.target)) return;
    setWalletDialog(false);
  }

  const providers: IProvider[] = [
    {
      key: "injected",
      title: "Metamask",
      desc: $_("login.BrowserWalletDescription"),
      icon: metamask,
    },
    {
      key: "walletconnect",
      title: "WalletConnect",
      desc: $_("login.WalletConnectDescription"),
      icon: walletConnect,
    },
    {
      key: "mixinmessenger",
      title: "Mixin Messenger",
      desc: $_("login.MixinMessengerDescription"),
      icon: mixinMessenger,
    },
    {
      key: "fennec",
      title: "Fennec",
      desc: $_("login.FennecDescription"),
      icon: fennec,
    },
  ];

  const connect = async (provider: ProviderKey) => {
    try {
      loading = true;
      const web3Client = await createWeb3Client(provider);
      const p = await web3Client.connect();
      await setProvider(p);
      if (!$account) throw new Error("No account found");
      if (!$cacheProvider) throw new Error("No cached provider found");
      await registerAndSave($account);
      await updateAssets();
      setWalletDialog(false);
      setConnected(true);

      if ($chainId === 73927) {
        poolsLoaded.set(false)
        await curve.init("Web3", { externalProvider: p }, { chainId: 73927 });
        await curve.fetchFactoryPools();
        await curve.fetchCryptoFactoryPools();
        mainPools.set(curve.getAllMainPools())
        factoryPools.set(curve.getAllFactoryPools())
        cryptoFactoryPools.set(curve.getAllCryptoFactoryPools())
        poolsLoaded.set(true)
        return
      }
      setSwitchNeeded(true);
      
    } catch (e: any) {
      console.log(e);
      switch (true) {
        case String(e.message).includes("No Web3 Provider found"):
          showToast("common", $_("error.NoProvider"));
          console.log("No Web3 Provider found");
          break;
        case String(e.message).includes("User closed modal"):
          showToast("common", $_("error.userClosedModal"));
          console.log("User closed modal");
          break;
        case String(e.message).includes("User Rejected"):
          showToast("common", $_("error.userRejected"));
          console.log("User Rejected");
          break;
      }
    } finally {
      setTimeout(() => {
        loading = false;
      }, 1000);
    }
  };

  $: modalbox = clsx(
    loading ? "h-[285px] !max-w-[26rem]" : "grid grid-cols-2 w-[512px] h-[384px]",
    "modal-box relative w-full p-2"
  );
</script>

<div
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class={clsx("modal modal-middle text-base-content", $ConnectWalletDialog && "modal-open")}
>
  <div class={modalbox} bind:this={content}>
    {#if loading}
      <div class="flex flex-col justify-center items-center w-full h-full">
        <img
          src={loadingHuge}
          alt=""
          class="w-full h-40 [[data-theme=dark]_&]:invert"
        />
        <div class="text-center">
          <span class="font-normal text-xl text-base-content tracking-wide">
            {$_("connect.waiting")}
          </span>
        </div>
        <div class="text-center mt-2">
          <span
            class="font-normal text-sm opacity-30 text-base-content tracking-wide"
          >
            {$_("connect.pleaseConfirm")}
          </span>
        </div>
      </div>
    {:else}
      {#each providers as { title, desc, icon, key } (key)}
        <button
          bind:this={content}
          on:click={() => connect(key)}
          class="px-0 rounded-2xl b option flex flex-col items-center justify-center"
        >
          <div class="img-screen">
            <img loading="lazy" src={icon} alt={title} width="48" height="48" />
          </div>
          <div class="mt-3 text-xl">
            <div class="font-bold">{title}</div>
          </div>
          <div class="text-sm font-semibold opacity-20 pt-3">{desc}</div>
        </button>
      {/each}
    {/if}
  </div>
</div>

<style>
  .b {
    border-left: 1px solid rgba(195, 195, 195, 0.14);
    border-right: 1px solid rgba(195, 195, 195, 0.14);
    border-bottom: 1px solid rgba(195, 195, 195, 0.14);
  }
  .option:hover {
    background-color: rgba(195, 195, 195, 0.14);
  }
  * {
    overflow: hidden;
    scrollbar-width: none;
  }
  .img-screen {
    width: 48px;
    height: 48px;
  }
</style>
