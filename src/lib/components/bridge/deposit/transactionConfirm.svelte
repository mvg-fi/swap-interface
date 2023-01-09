<!-- 3 -->
<script lang="ts">
  import clsx from "clsx";
  import { ethers } from "ethers";
  import { _ } from "svelte-i18n";
  import { chainId, library } from "$lib/stores/ethers";
  import { getAddress, parseEther } from "ethers/lib/utils";
  import { mode } from "$lib/stores/bridge/process";
  import Loading from "./viewAddress/loading.svelte";
  import { formatDecimals, getChainByAsset, toHex } from "$lib/helpers/utils";
  import { address, userKey } from "$lib/stores/user";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";
  import { MixinApi, type AssetResponse } from "@mixin.dev/mixin-node-sdk";

  let depositLoading = false;

  const MixinClient = MixinApi({
    keystore: {
      user_id: $userKey.client_id,
      private_key: $userKey.private_key,
      session_id: $userKey.session_id,
    },
  });
  let Asset: AssetResponse;
  let asset = MixinClient.asset.fetch($selectedFromAsset.mixinAssetId);
  asset.then((v) => {
    Asset = v;
  });

  const deposit = async () => {
    if ($library == undefined) return;
    depositLoading = true;

    // Native currency
    if ($selectedFromAsset.mixinChainId === $selectedFromAsset.mixinAssetId) {
      const parameters = {
        from: getAddress($address),
        to: Asset.deposit_entries[0].destination,
        value: parseEther(String($payAmount)),
        chainId: Number(toHex(String($chainId))),
      };
      const tx = $library.getSigner().sendTransaction(parameters);
      tx.then((v) => {
        console.log("tx:", tx);
      })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          depositLoading = false;
        });
      return;
    }

    // ERC20
    
  };
  $: chainAsset = getChainByAsset($selectedFromAsset.mixinChainId);
  $: chainIcon = chainAsset?.logoURI;
  $: chainName = chainAsset?.name;
  $: items = [
    { title: $_("bridge.network"), icon: chainIcon, value: chainName },
    {
      title: $_("bridge.token"),
      icon: $selectedFromAsset.logoURI,
      value: $selectedFromAsset.symbol,
    },
    {
      title: $_("bridge.amount"),
      icon: null,
      value: formatDecimals(Number($payAmount), 8),
    },
  ];
</script>

<div class="view-address text-center p-2">
  <span class="text-base font-bold">
    {$_("bridge.deposit")}
    {$selectedFromAsset.symbol}
  </span>
</div>
{#await asset}
  <div class="flex justify-center p-3">
    <Loading />
  </div>
{:then}
  <div class="flex flex-col p-3 py-2 mx-1 text-base-content">
    {#each items as item}
      <div class="from-network flex flex-col my-2">
        <span class="opacity-60 text-xs">{item.title}</span>

        <div class="flex flex-row !items-center mt-1">
          {#if item.icon}
            <img src={item.icon} alt="" class="w-5 h-5" />
          {/if}
          <span class={clsx("font-semibold", item.icon && "ml-2")}>
            {item.value}
          </span>
        </div>
      </div>
    {/each}
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
