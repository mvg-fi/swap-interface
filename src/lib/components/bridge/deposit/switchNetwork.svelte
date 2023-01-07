<!-- 1 -->
<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { chainId, library, provider } from "$lib/stores/ethers";
  import { switchNetwork } from "$lib/helpers/web3";
  import { mode, supposedNetwork } from "$lib/stores/bridge/process";
  import warning from "$lib/images/warning-circle.svg";
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
</script>

<div class="warning-icon flex items-center justify-center p-4">
  <img src={warning} alt="" class="w-20" />
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
      {getChainByAsset($selectedFromAsset.mixinChainId)?.name}
      {$_("bridge.network")}
    </span>
    {$_("bridge.switch_network_info1")}
  </span>
</div>

<div class="flex justify-center p-1 gap-2">
  <div class="cancel justify-center p-2">
    <button
      on:click={() => mode.set(0)}
      class="btn bg-base-100 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
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
