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
  import Copy from "./viewAddress/copy.svelte";

  const MixinClient = MixinApi({
    keystore: {
      user_id: $userKey.client_id,
      private_key: $userKey.private_key,
      session_id: $userKey.session_id,
    },
  });
  let confirmations: number;
  let depositEntries: DepositEntryResponse[];
  let asset = MixinClient.asset.fetch($selectedFromAsset.mixinAssetId);
  console.log(asset)
  asset.then((v) => {
    depositEntries = v.deposit_entries;
    confirmations = v.confirmations;
  });

  let confirmed = false;
  const checkDeposit = async () => {
    confirmed = true;
    console.log("confirmed");
    // depositLoading = false;
  };

  $: chainAsset = getChainByAsset($selectedFromAsset.mixinChainId);
  $: chainIcon = chainAsset?.logoURI;
  $: chainName = chainAsset?.name;
</script>

<div class="view-address text-center pb-4 pt-0">
  <span class="text-base font-bold">
    {$_("bridge.deposit")}
    {formatDecimals(Number($payAmount), 8)}
    {$selectedFromAsset.symbol}
  </span>
</div>

{#await asset}
  <div class="flex justify-center p-3">
    <Loading />
  </div>
{:then}
  <div class="flex flex-col">
    <div
      class="deposit-title flex flex-row bg-base-200 bg-opacity-80 rounded-2xl"
    >
      <div class="flex flex-1 flex-col p-2 px-3">
        <div class="text-sm font-semibold opacity-60">
          <span> {$_("bridge.network")} </span>
        </div>

        <div
          class="flex flex-row items-center text-sm font-semibold select-text mt-1"
        >
          <span class="whitespace-normal" style="overflow-wrap: break-word;">
            {chainName}
          </span>
        </div>
      </div>
    </div>

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
      <div class="flex flex-row bg-base-200 bg-opacity-60 rounded-2xl">
        <div class="flex flex-1 flex-col p-2 px-3 pr-0 w-full">
          <div class="text-sm font-semibold opacity-40">
            <span> {$_("bridge.memo")} </span>
          </div>

          <div
            class="flex flex-row items-center text-sm font-semibold select-text mt-1"
          >
            <span class="whitespace-normal" style="overflow-wrap: break-word;">
              {depositEntries[0].tag}
            </span>
          </div>
        </div>
        <Copy
          copyText={depositEntries[0].tag}
          class="flex px-4 justify-center items-center"
        />
      </div>
    {/if}

    <div class="flex flex-row justify-center my-4">
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

    <div class="flex flex-row bg-base-200 bg-opacity-60 rounded-2xl">
      <div class="deposit-address flex flex-1 flex-col p-2 px-3 pr-0 w-full">
        <div class="text-sm font-semibold opacity-40">
          <span> {$_("bridge.address")} </span>
        </div>

        <div
          class="flex flex-row items-center text-sm font-semibold select-text mt-1"
        >
          <span class="break-all">
            {depositEntries[0].destination}
          </span>
        </div>
      </div>
      <Copy
        copyText={depositEntries[0].destination}
        class="flex px-4 justify-center items-center"
      />
    </div>

    <div
      class="deposit-info flex flex-col my-2 mx-2 text-xs font-medium opacity-50 tracking-wide"
    >
      {#if depositEntries[0].tag}
        <span>
          - {$_("bridge.memo_required")}
        </span>
      {/if}
      <span>
        - {$_("bridge.deposit_will")}
        {confirmations}
        {$_("bridge.confirmations")}
      </span>
      <span>
        - {$_("bridge.min_deposit")}: 0.00000001 {$selectedFromAsset.symbol}
      </span>
    </div>
  </div>
{/await}

<div class="flex justify-center p-0 gap-2">
  <div class="cancel justify-center flex px-2 py-2 mt-2">
    <button
      on:click={() => mode.set(0)}
      class="btn bg-base-200 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
    >
      <span class="text-base-content"> {$_("bridge.back")} </span>
    </button>
  </div>

  <div class="confirm-btn justify-center px-2 py-2 mt-2">
    <button
      on:click={() => checkDeposit()}
      class={clsx(
        "btn bg-blue-700 border-base-200 hover:bg-blue-800 hover:border-base-300 rounded-2xl",
        confirmed && "loading btn-square"
      )}
    >
      {#if !confirmed}
        <span class="text-base-100"> {$_("bridge.ive_transferred")} </span>
      {/if}
    </button>
  </div>
</div>
