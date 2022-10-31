<script lang="ts">
  import metamask from "$lib/images/logo/metamask.svg";
  import walletConnect from "$lib/images/logo/walletconnect.svg";
  import { showToast } from "$lib/components/toast/container.svelte";

  import LL from "$i18n/i18n-svelte";
  import { goto } from "$app/navigation";
  import type { IProvider } from "$lib/types/provider";
  import type { ProviderKey } from "$lib/types/provider";
  import { createWeb3Client } from "$lib/helpers/clients/index";
  import { account, setProvider } from "$lib/stores/ethers";
  import { logout, registerAndSave } from "$lib/stores/user";
  import { providerKey as cacheProvider } from "$lib/stores/provider";

  let loading = false;

  const providers: IProvider[] = [
    {
      key: "injected",
      title: "Metamask",
      desc: $LL.login.connectBrowserWalletDescription(),
      icon: metamask,
    },
    {
      key: "walletconnect",
      title: "WalletConnect",
      desc: $LL.login.connectWalletConnectDescription(),
      icon: walletConnect,
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
      await goto("/");
    } catch (e: any) {
      if (e.message !== "No Web3 Provider found") return;
      showToast("common", $LL.login.pleaseInstallMetaMaskFirst());
    } finally {
      loading = false;
    }
  };
</script>

<div class="modal modal-bottom sm:modal-middle h-3/5 p-0  h-full flex-col flex">
  <div class="modal-box relative w-full">
    {#each providers as { title, desc, icon, key } (key)}
      <button
        class="flex flex-col content-center justify-center px-0"
        on:click={() => connect(key)}
      >
        <img loading="lazy" src={icon} alt={title} width="48" height="48" />
        <div class="flex items-start">
          <div class="font-bold">{title}</div>
          <div class="text-sm font-semibold opacity-20">{desc}</div>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
</style>
