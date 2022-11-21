<script lang="ts">
  import SelectAssetDialog from "./SelectAsset/SelectAssetDialog.svelte";
  import {
    selectedFromAsset,
    selectedToAsset,
    payAmount,
    receiveAmount,
  } from "$lib/stores/swap";
  import { fetchDyFromContract } from "$lib/helpers/web3/swap";
  import { selectAssetDialog } from "$lib/stores/selectAsset";
  import Image from "../common/image.svelte";

  export let from: boolean;
  export let id: string;
  $: icon = from ? $selectedFromAsset?.icon_url : $selectedToAsset.icon_url;
  $: symbol = from ? $selectedFromAsset?.symbol : $selectedToAsset.symbol;

  let timeout: any = null;
  function delayInput() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fetchDyFromContract($selectedFromAsset, $selectedToAsset, $payAmount);
    }, 1000);
  }
</script>

<div class="flex">
  <label class="input-group">
    {#if from}
      <input
        type="number"
        placeholder="0"
        on:keyup={delayInput}
        bind:value={$payAmount}
        class="input swap-input left input-sm sm:input-lg same-height rounded-2xl"
      />
    {:else}
      <input
        type="number"
        placeholder="0"
        bind:value={$receiveAmount}
        class="input swap-input left input-sm sm:input-lg same-height rounded-2xl"
      />
    {/if}

    <label
      for={id}
      class="btn btn-sm sm:btn-lg select-btn same-height same-width"
    >
      <div class="avatar">
        <div class="rounded-full w-6 mx-2">
          <Image src={icon} alt="icon" />
        </div>
      </div>
      <span class="bg-transparent px-0 mt-1">{symbol}</span>
    </label>
  </label>

  <input
    {id}
    type="checkbox"
    class="modal-toggle"
    bind:checked={$selectAssetDialog}
  />
  <SelectAssetDialog {from} {id} />
</div>

<style>
  .swap-input {
    border: 2px solid rgb(239 240 249);
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
