<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import qr from "$lib/images/qr.svg";
  import Image from "$lib/components/common/image.svelte";
  import { mode, processDialog } from "$lib/stores/bridge/process";
  import { formatDecimals, isEVMAsset } from "$lib/helpers/utils";
  import { providerLogo, providerName } from "$lib/stores/provider";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";

  $: evmCompatible = isEVMAsset($selectedFromAsset.mixinChainId);
</script>

<div class="deposit-text text-center p-2 pb-4">
  <span class="text-xl font-bold">
    {$_("bridge.deposit")}
    {formatDecimals(Number($payAmount), 8)}
    {$selectedFromAsset.symbol}
  </span>
</div>

<div class="payment-methods py-3 px-2 flex flex-col gap-2">
  {#if evmCompatible}
    <button
      on:click={()=>mode.set(1)}
      class="card flex flex-row w-full items-center p-4 border border-base-300 hover:bg-base-300 gap-4"
    >
      <div
        class="w-14 h-14 flex items-center justify-center rounded-full bg-base-200"
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
    class="card flex flex-row w-full items-center p-4 border border-base-300 hover:bg-base-300 gap-4"
  >
    <div
      class="w-14 h-14 flex items-center justify-center rounded-full bg-base-200"
    >
      <div class="w-8 h-8">
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
    class="btn bg-base-200 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl"
  >
    <span class="text-base-content"> {$_("bridge.cancel")} </span>
  </button>
</div>
