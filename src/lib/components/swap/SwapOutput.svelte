<script lang="ts">
  import Image from "$lib/components/common/image.svelte";
  import ChevronDown from "$lib/images/chevron-down.svg";
  import { setToAssetDialog } from "$lib/stores/swap/selectAsset";
  import SelectToAssetDialog from "./SelectAsset/SelectToAssetDialog.svelte";

  import {
    selectedToAsset,
    receiveAmount,
  } from "$lib/stores/swap/swap";
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { address } from "$lib/stores/user";
  import { connected } from "$lib/stores/connect";
  import { maskOption } from "$lib/helpers/constants";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";
  import { asyncDerived, writable } from "@square/svelte-store";
  import { getBalance, getERC20Balance } from "$lib/helpers/web3";

  const fetchBalance = async () => {
    return symbol === "ETH"
      ? (await getBalance({
          account: $address,
          network: "mvm",
          unitName: 18,
        })) || 0
      : (await getERC20Balance({
          account: $address,
          contractAddress: $selectedToAsset.contract,
          network: "mvm",
        })) || 0;
  };

  $: icon = $selectedToAsset.logoURI;
  $: symbol = $selectedToAsset.symbol;
  const balance = writable(0);
  $: balance_store = $selectedToAsset
    ? asyncDerived(balance, fetchBalance)
    : null;

  // let timeout: any = null;
  // function delayOutput() {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(function () {
  //     fetchDyFromContract($selectedFromAsset, $selectedToAsset, $receiveAmount);
  //   }, 1000);
  // }
</script>

<div class="w-full">
  <div class="p-1 border-solid bd rounded-2xl">
    <div class="items-center justfiy-center flex">
      <div class="flex-1 flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          bind:value={$receiveAmount}
          class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-2xl"
        />
      </div>
      <button
        class="flex flex-row items-center"
        on:click={() => setToAssetDialog(true)}
      >
        <div class="avatar mx-1 mr-0">
          <div class="w-7 rounded-full">
            <Image src={icon} alt="" />
          </div>
        </div>
        <div class="mx-2">
          <span class="uppercase font-bold text-xl"> {symbol} </span>
        </div>
        <div class="w-3 mr-2">
          <Image src={ChevronDown} alt="" />
        </div>
      </button>
    </div>

    {#if $connected}
      <div class="flex flex-row mx-2 my-1 opacity-75 text-xs h-6">
        <div class="flex-1 ml-1" />

        {#if $balance_store}
          <button
            on:click={() => {
              receiveAmount.set($balance_store);
            }}
            class="tooltip tooltip-left"
            data-tip={$_("add_liquidity.max")}
          >
            <span class="cursor-pointer"
              >{$_("add_liquidity.balance")}: {$balance_store}</span
            >
          </button>
        {/if}
      </div>
    <!-- {:else}
      <div class="flex flex-row mx-2 my-1 opacity-75 text-xs h-6" /> -->
    {/if}
  </div>

  <SelectToAssetDialog />
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
</style>
