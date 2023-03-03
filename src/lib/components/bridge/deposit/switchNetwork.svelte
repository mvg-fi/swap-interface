<!-- 1 -->
<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { library } from "$lib/stores/ethers";
  import { switchNetwork } from "$lib/helpers/web3";
  import { mode, supposedNetwork } from "$lib/stores/bridge/process";
  import { selectedFromAsset } from "$lib/stores/bridge/bridge";
  import { getChainByAsset } from "$lib/helpers/utils";

  let switchLoading = false;

  const changeNetwork = async () => {
    if (!$library) return;
    if (!$supposedNetwork) return;

    switchLoading = true;
    const result = await switchNetwork($library, $supposedNetwork);
    if (result === null) {
      mode.set(3);
    }
    switchLoading = false;
  };
  $: networkName = getChainByAsset($selectedFromAsset.mixinChainId)?.name
</script>

<div class="warning-icon flex items-center justify-center p-4">
  <svg class="w-24 fill-blue-500 stroke-base-100" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 7v6M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</div>

<div class="switch-network text-center p-2">
  <span class="text-xl font-bold">
    {$_("bridge.switch_network")}
  </span>
</div>

<div class="switch-network-info text-center p-2 pb-4">
  <span class="text-sm font-medium">
    {$_("bridge.switch_network_info0")}
    <span class="font-semibold">
      {networkName}
      {$_("bridge.mainnet")}
    </span>
    {$_("bridge.switch_network_info1")}
  </span>
</div>

<div class="flex justify-center p-1 gap-2">
  <div class="back justify-center p-2">
    <button
      on:click={() => mode.set(0)}
      class="btn bg-base-200 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
    >
      <span class="text-base-content"> {$_("bridge.back")} </span>
    </button>
  </div>

  <div class="switch-network-btn justify-center p-2">
    <button
      on:click={() => changeNetwork()}
      class={clsx(
        "btn bg-blue-700 border-base-200 hover:bg-blue-800 hover:border-base-300 rounded-2xl",
        switchLoading && "loading btn-square"
      )}
    >
      {#if !switchLoading}
        <span class="text-base-100"> {$_("bridge.switch_network")} </span>
      {/if}
    </button>
  </div>
</div>
