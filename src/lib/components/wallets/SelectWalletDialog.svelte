<script lang="ts">
  import metamask from "$lib/images/logo/metamask.svg";
  import walletConnect from "$lib/images/logo/walletconnect.svg";

  import { showToast } from "$lib/components/toast/container.svelte";

  import LL from "$i18n/i18n-svelte";
  import type { IProvider } from "$lib/types/provider";
  import type { ProviderKey } from "$lib/types/provider";
  import { createWeb3Client } from "$lib/helpers/clients/index";
  import { account, setProvider } from "$lib/stores/ethers";
  import { registerAndSave } from "$lib/stores/user";
  import { setConnected } from "$lib/stores/connect";
  import { setWalletDialog } from "$lib/stores/selectWallet";
  import { providerKey as cacheProvider } from "$lib/stores/provider";

  let loading = false;
  export let id: string;

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
      setWalletDialog(false);
      setConnected(true);
    } catch (e: any) {
      console.log(e);
      switch (true) {
        case String(e.message).includes("No Web3 Provider found"):
          showToast("common", $LL.login.pleaseInstallMetaMaskFirst());
          console.log("No Web3 Provider found");
          break;
        case String(e.message).includes("User closed modal"):
          showToast("common", $LL.error.userClosedModal());
          console.log("User closed modal");
          break;
        case String(e.message).includes("User Rejected"):
          showToast("common", $LL.error.userRejected());
          console.log("User Rejected");
          break;
      }
    } finally {
      loading = false;
    }
  };
</script>

<label class="modal modal-bottom sm:modal-middle" for={id}>
  <div class="modal-box relative w-full p-2 grid grid-cols-2 min-h-[25%]">
    {#each providers as { title, desc, icon, key } (key)}
      <button
        class="px-0 rounded-2xl b option flex flex-col items-center justify-center"
        on:click={() => connect(key)}
      >
        <div>
          <img loading="lazy" src={icon} alt={title} width="48" height="48" />
        </div>
        <div class="mt-3 text-xl">
          <div class="font-bold">{title}</div>
        </div>
        <div class="text-sm font-semibold opacity-20 pt-3">{desc}</div>
      </button>
    {/each}
  </div>
</label>

<style>
  /* border */
  .b {
    border-left: 1px solid rgba(195, 195, 195, 0.14);
    border-right: 1px solid rgba(195, 195, 195, 0.14);
  }
  .option:hover {
    background-color: rgba(195, 195, 195, 0.14);
  }
</style>
