<!-- 2 -->
<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { userKey } from "$lib/stores/user";
  import { mode } from "$lib/stores/bridge/process";
  import { formatDecimals, getChainByAsset } from "$lib/helpers/utils";
  import {
    MixinApi,
    type DepositEntryResponse,
  } from "@mixin.dev/mixin-node-sdk";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";
  import QrCode from "$lib/components/common/qrCode.svelte";
  import Loading from "./viewAddress/loading.svelte";

  const MixinClient = MixinApi({
    keystore: {
      user_id: $userKey.client_id,
      private_key: $userKey.private_key,
      session_id: $userKey.session_id,
    },
  });
  let depositEntries: DepositEntryResponse[];
  let asset = MixinClient.asset.fetch($selectedFromAsset.mixinAssetId);
  asset.then((v) => {
    depositEntries = v.deposit_entries;
    console.log(depositEntries);
  });

  $: assetIcon = $selectedFromAsset.logoURI;
  $: chainIcon = getChainByAsset($selectedFromAsset.mixinChainId)?.logoURI;
</script>

<div class="view-address text-center p-2 pt-0 pb-4">
  <span class="text-xl font-bold">
    {$_("bridge.deposit")}
    {formatDecimals(Number($payAmount), 8)}
    {$selectedFromAsset.symbol}
  </span>
</div>

{#await asset}
  <div class="flex justify-center">
    <Loading />
  </div>
{:then}
  <div class="flex flex-col">
    {#if depositEntries[0].tag}
      <div class="flex justify-center my-4">
        <div
          class="memo-qr-code border-base-200 shadow border p-3 rounded-2xl relative"
        >
          <QrCode value={depositEntries[0].tag} class="" size={130} />
          <img
            alt=""
            src={chainIcon}
            class="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4 h-[36px] w-[36px]"
          />
        </div>
      </div>
    {/if}

      <div class="flex flex-row justify-center my-4 pl-2">
        <div
          class="address-qr-code border-base-200 shadow border p-3 rounded-2xl relative"
        >
          <QrCode value={depositEntries[0].destination} class="" size={130} />
          <!-- Show Chain Asset logoURI -->
          <img
            alt=""
            src={chainIcon}
            class="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4 h-[36px] w-[36px]"
          />
        </div>
      </div>

      <div class="flex flex-col bg-base-200 bg-opacity-60 rounded-2xl p-2 px-3" style="overflow-wrap: break-word;">
        <div class="text-sm font-semibold opacity-40">
          <span> {$_('bridge.address')} </span>
        </div>
        <div class="text-sm font-semibold select-text mt-0.5">
          <span> { depositEntries[0].destination } </span>
        </div>
      </div>
    </div>
  
{/await}

<div class="cancel justify-center flex px-4 py-2">
  <button
    on:click={() => mode.set(0)}
    class="btn bg-base-100 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
  >
    <span class="text-base-content"> {$_("bridge.back")} </span>
  </button>
</div>
