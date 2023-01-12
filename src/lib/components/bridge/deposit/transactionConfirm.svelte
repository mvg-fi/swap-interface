<!-- 3 -->
<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { Contract } from "ethers";
  import { mode } from "$lib/stores/bridge/process";
  import Loading from "./viewAddress/loading.svelte";
  import { address, userKey } from "$lib/stores/user";
  import ERC20ABI from "$lib/constants/abis/erc20.json";
  import { chainId, library } from "$lib/stores/ethers";
  import { getAddress, parseEther, parseUnits } from "ethers/lib/utils";
  import { formatDecimals, getChainByAsset, toHex } from "$lib/helpers/utils";
  import { payAmount, selectedFromAsset } from "$lib/stores/bridge/bridge";
  import { MixinApi, type AssetResponse } from "@mixin.dev/mixin-node-sdk";
  // import { getEVMBalance } from "$lib/helpers/web3";

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
  $: isNativeCurrency =
    $selectedFromAsset.mixinChainId === $selectedFromAsset.mixinAssetId;
  // Balance = await getEVMBalance($address, $library, isNativeCurrency, );

  const deposit = async () => {
    if ($library == undefined) return;
    depositLoading = true;
    const signer = $library.getSigner();

    if (isNativeCurrency) {
      console.log("Native:", Asset.name, Asset.asset_key);
      const parameters = {
        from: getAddress($address),
        to: Asset.deposit_entries[0].destination,
        value: parseEther(String($payAmount)),
        chainId: Number(toHex(String($chainId))),
        gasPrice: (await $library.getGasPrice()).mul(130).div(100),
      };
      const tx = signer.sendTransaction(parameters);
      tx.then((v) => {
        console.log("tx:", v);
        console.log(v.hash);
        console.log(v.blockNumber);
        // tx_hash, block_number, confirmations
      })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          depositLoading = false;
        });
    } else {
      // ERC20
      console.log("ERC20:", Asset.name, Asset.asset_key);
      const c = new Contract(Asset.asset_key, ERC20ABI, $library);
      const d = await c.decimals();
      console.log("d:", d);
      console.log("S:", String($payAmount));
      // TODO: fix parse error
      const v = parseUnits(String($payAmount), d);
      console.log("v:", v);
      const tx = c
        .connect(signer)
        .transfer(Asset.deposit_entries[0].destination, v);
      tx.then((v) => {
        console.log("tx:", tx);
      })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          depositLoading = false;
        });
    }
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
    // { title: $_("bridge.balance"), icon: null, value: balance },
  ];
</script>

{#await asset}
  <div class="flex justify-center p-3 my-10">
    <Loading />
  </div>
{:then}
  <div class="view-address text-center p-2">
    <span class="text-base font-bold">
      {$_("bridge.deposit")}
      {$selectedFromAsset.symbol}
    </span>
  </div>
  <div class="flex flex-col p-3 py-2 mx-1 text-base-content">
    {#each items as item, i}
      <div class="from-network flex flex-col my-2">
        <span class="opacity-60 text-xs">{item.title}</span>

        <div class="flex flex-row !items-center mt-1">
          {#if item.icon}
            <img src={item.icon} alt="" class="w-5 h-5" />
          {/if}
          <span class={clsx("font-semibold", item.icon && "ml-2")}>
            {item.value}
          </span>
          {#if i == 2}
            <span class="ml-1 font-semibold">
              {$selectedFromAsset.symbol}
            </span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
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
{/await}
