<script lang="ts">
  import SelectAssetDialog from "./SelectAsset/SelectAssetDialog.svelte";
  import Image from "$lib/components/common/image.svelte";
  import ChevronDown from "$lib/images/chevron-down.svg";

  import {
    selectedFromAsset,
    selectedToAsset,
    payAmount,
  } from "$lib/stores/swap/swap";
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { maskOption } from "$lib/helpers/constants";
  import { address } from "$lib/stores/user";
  import { connected } from "$lib/stores/connect";
  import { fetchAsset } from "$lib/helpers/mvm-api";
  import { asyncDerived, derived, writable } from "@square/svelte-store";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";
  import { setAssetDialog } from "$lib/stores/swap/selectAsset";
  import { getBalance, getERC20Balance } from "$lib/helpers/web3";
  import { format8Decimals, formatUSMoney } from "$lib/helpers/utils";

  let timeout: any = null;
  const delayInput = () => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fetchDyFromContract($selectedFromAsset, $selectedToAsset, $payAmount);
    }, 1000);
  };
  const validateInput = (s: string): [boolean, string] => {
    if (Number(s) <= 0) return [false, $_("input.input_number")];

    return [false, "Invalid Input"];
  };

  const fetchBalance = async () => {
    return symbol === "ETH"
      ? format8Decimals(await getBalance({
          account: $address,
          network: "mvm",
          unitName: 18,
        })) || 0
      : (await getERC20Balance({
          account: $address,
          contractAddress: $selectedFromAsset.contract,
          network: "mvm",
        })) || 0;
  };
  const fetchUSD = async () => {
    return (await fetchAsset($selectedFromAsset.mixinAssetId)).price_usd || 0;
  };
  $: icon = $selectedFromAsset.logoURI;
  $: symbol = $selectedFromAsset.symbol;
  const usd = writable(0);
  const balance = writable(0);
  const usd_total = writable(0);
  $: usd_store = $selectedFromAsset ? asyncDerived(usd, fetchUSD) : null;
  $: usd_value = derived(usd_total, () => {
    return formatUSMoney((Number($usd_store) * Number($payAmount)).toFixed(2)) || 0;
  });
  $: balance_store = $selectedFromAsset
    ? asyncDerived(balance, fetchBalance)
    : null;
</script>

<div class="w-full">
  <div class="p-1 py-2 border-solid bd rounded-2xl">
    <div class="items-center justfiy-center flex space-x-0">
      <div class="flex flex-col mx-3">
        <input
          type="tel"
          placeholder="0"
          use:cleave={maskOption}
          on:keyup={delayInput}
          bind:value={$payAmount}
          class="input border-0 p-0 w-full max-w-xs input-md outline-none focus:outline-none font-bold text-3xl"
        />
      </div>
      <button
        class="flex flex-row items-center content-center mz-box"
        on:click={() => setAssetDialog(true)}
      >
        <div class="avatar mx-1 mr-0 w-7 rounded-full mz-box">
          <Image src={icon} alt="" />
        </div>
        <div class="flex itmes-center">
          <span class="uppercase font-bold text-xl mx-2">
            {symbol}
          </span>
        </div>
        <div class="w-3 mr-2">
          <Image src={ChevronDown} alt="" />
        </div>
      </button>
    </div>

    {#if $connected}
      <div class="flex flex-row mx-2 my-1 opacity-75 text-xs">
        <div class="flex-1 ml-1">
          {#if $usd_store}
            <span>${$usd_value}</span>
          {/if}
        </div>

        {#if $balance_store}
          <button
            on:click={() => {
              payAmount.set($balance_store);
            }}
            class="tooltip tooltip-left"
            data-tip={$_("add_liquidity.max")}
          >
            <span>{$_("add_liquidity.balance")}: {$balance_store}</span>
          </button>
        {/if}
      </div>
    {/if}
  </div>

  <SelectAssetDialog />
</div>

<style>
  .bd {
    border-width: 1.25px;
  }
  .mz-box {
    -moz-box-align: center;
    -moz-box-pack: justify;
  }
</style>
