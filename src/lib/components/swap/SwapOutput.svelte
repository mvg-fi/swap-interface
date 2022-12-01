<script lang="ts">
  import {
    selectedFromAsset,
    selectedToAsset,
    receiveAmount,
  } from "$lib/stores/swap/swap";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";
  import { selectToAssetDialog, setToAssetDialog } from "$lib/stores/swap/selectAsset";
  import Image from "../common/image.svelte";
  import SelectToAssetDialog from "./SelectAsset/SelectToAssetDialog.svelte";
  import { cleave } from "svelte-cleavejs";
  import { maskOption } from "$lib/helpers/constants";


  $: icon = $selectedToAsset.icon_url;
  $: symbol = $selectedToAsset.symbol;

  let timeout: any = null;
  function delayOutput() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fetchDyFromContract($selectedFromAsset, $selectedToAsset, $receiveAmount);
    }, 1000);
  }
</script>

<div class="flex">
  <label class="input-group">
    <input
      type="tel"
      placeholder="0"
      use:cleave={maskOption}
      on:keyup={delayOutput}
      bind:value={$receiveAmount}
      class="input swap-input left input-sm sm:input-lg same-height rounded-2xl"
    />

    <button
      class="btn btn-sm sm:btn-lg select-btn same-height same-width"
      on:click={() => setToAssetDialog(true)}
    >
      <div class="avatar">
        <div class="rounded-full w-6 mx-2">
          <Image src={icon} alt="icon" width="24px" height="24px" />
        </div>
      </div>
      <span class="bg-transparent px-0 mt-1">{symbol}</span>
    </button>
  </label>

  <SelectToAssetDialog bind:$selectToAssetDialog />
</div>

<style>
  .swap-input {
    border: 2px solid rgb(239 240 249);
    outline: none;
  }
  .swap-input:focus{
    outline: none;
  }
  .select-btn {
    color: black;
    border: 2px solid rgb(239 240 249);
    border-left: none;
    padding-left: 0;
    padding-right: 0;
    background-color: #ffffff;
  }
  .select-btn:hover {
    background-color: transparent;
    border: 2px solid rgb(239 240 249);
    border-left: none;
  }
  .left {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
  }
  .same-height {
    height: 64px !important;
  }
  .same-width {
    width: 130px !important;
  }
</style>
