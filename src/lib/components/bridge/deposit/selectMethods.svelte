<!-- 0 -->
<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import qr from "$lib/images/qr.svg";
  import { chainId, provider } from "$lib/stores/ethers";
  import Image from "$lib/components/common/image.svelte";
  import { mode, processDialog, supposedNetwork } from "$lib/stores/bridge/process";
  import { formatDecimals, getEVMChainId, isEVMAsset, toHex } from "$lib/helpers/utils";
  import { providerLogo, providerName } from "$lib/stores/provider";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";

  // 1. if current network (chain) != selected asset chain {switchNetwork()}
  const checkNetwork = () => {
    if (!evmCompatible) return;
    if (!$provider) return;
    if (!$chainId) return;
    
    supposedNetwork.set(getEVMChainId($selectedFromAsset.mixinChainId));
    if (Number($chainId) != Number($supposedNetwork)) {
      mode.set(1) // Switch Network
    } else {
      mode.set(3) // Transaction Confirm
    }
  }
  const checkDeposit = () => {
    checkNetwork();
  }
  $: evmCompatible = isEVMAsset($selectedFromAsset.mixinChainId);
</script>

<div class="deposit-text text-center p-2">
  <span class="text-base font-bold">
    {$_("bridge.deposit")}
    {formatDecimals(Number($payAmount), 8)}
    {$selectedFromAsset.symbol}
  </span>
</div>

<div class="payment-methods py-3 px-2 flex flex-col gap-2">
  {#if evmCompatible}
    <button
      on:click={()=>checkDeposit()}
      class="card flex flex-row w-full items-center p-4 bg-base-200 border border-base-200 hover:bg-base-300 hover:border-base-300 gap-4"
    >
      <div
        class="w-14 h-14 flex items-center justify-center rounded-full bg-base-100"
      >
        <div class="w-8 h-8">
          <img src={$providerLogo} alt="" />
        </div>
      </div>
      <div class="flex flex-col text-start">
        <span class="font-semibold text-base">
          {$_("bridge.pay_with") + " " + ($providerName || "...")}
        </span>
        <span class="text-xs opacity-50 mt-1">
          {$_("bridge.pay_with_info")}
        </span>
      </div>
    </button>
  {/if}
  <button
    on:click={()=>mode.set(2)}
    class="card flex flex-row w-full items-center p-4 bg-base-200 border border-base-200 hover:bg-base-300 hover:border-base-300 gap-4"
  >
    <div
      class="w-14 h-14 flex items-center justify-center rounded-full bg-base-100"
    >
      <div class="w-8 h-8 [[data-theme=dark]_&]:invert">
        <Image src={qr} alt="" />
      </div>
    </div>
    <div class="flex flex-col text-start">
      <span class="font-semibold text-base">
        {$_("bridge.view_address")}
      </span>
      <span class="text-xs opacity-50 mt-1">
        {$_("bridge.view_address_info")}
      </span>
    </div>
  </button>
</div>

<div class="cancel justify-center flex px-4 py-2">
  <button
    on:click={() => processDialog.set(false)}
    class="btn bg-base-100 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
  >
  <!-- bg-base-200 -->
    <span class="text-base-content"> {$_("bridge.cancel")} </span>
  </button>
</div>
