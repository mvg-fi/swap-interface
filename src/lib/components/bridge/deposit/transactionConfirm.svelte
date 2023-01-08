<!-- 3 -->
<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { chainId, provider } from "$lib/stores/ethers";
  import { getAddress, parseEther } from "ethers/lib/utils";
  import { mode } from "$lib/stores/bridge/process";
  import Loading from "./viewAddress/loading.svelte";
  import { formatDecimals, toHex } from "$lib/helpers/utils";
  import { address, userKey } from "$lib/stores/user";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";
  import {
    MixinApi,
    type DepositEntryResponse,
  } from "@mixin.dev/mixin-node-sdk";
    import { ethers } from "ethers";

  let depositLoading = false;

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
  });

  const deposit = async () => {
    depositLoading = true;

    const parameters = {
      from: getAddress($address),
      to: depositEntries[0].destination,
      value: parseEther(String($payAmount)),
      chainId: Number(toHex(String($chainId))),
    }
    const tx = new ethers.providers.Web3Provider($provider)?.getSigner().sendTransaction(parameters);
    tx.then((v)=>{
      console.log("tx:",tx)
    }).catch((err)=>{
      console.log(err.error.message)
    }).finally(()=>{
      depositLoading = false;
    })
  };
</script>

<div class="view-address text-center p-2 pb-4">
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
  <div>
    <!-- 1.Amount -->
    <!-- 2.Transfer Info -->
    <span />
  </div>
{/await}

  <div class="flex justify-center p-1 gap-2">
    <div class="cancel justify-center p-2">
      <button
        on:click={() => mode.set(0)}
        class="btn bg-base-200 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
      >
        <span class="text-base-content"> {$_("bridge.back")} </span>
      </button>
    </div>

    <div class="switch-network-btn justify-center p-2">
      <button
        on:click={() => deposit()}
        class={clsx(
          "btn bg-blue-700 border-base-200 hover:bg-blue-800 hover:border-base-300 rounded-2xl",
          depositLoading && "loading btn-square"
        )}
      >
        {#if !depositLoading}
          <span class="text-base-100"> {$_("bridge.confirm")} </span>
        {/if}
      </button>
    </div>
  </div>
