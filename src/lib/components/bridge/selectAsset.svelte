<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fade } from "svelte/transition";
  import Close from "$lib/images/close.svg";
  import { search } from "$lib/stores/bridge/searchAsset";
  import {
    setFromAsset,
    setToAsset,
    inputFrom,
  } from "$lib/stores/bridge/bridge";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";
  import SingleAsset from "$lib/components/bridge/selector/singleAsset.svelte";
  import SearchAsset from "$lib/components/bridge/selector/searchAsset.svelte";
  import {
    selectAssetDialog,
    setAssetDialog,
  } from "$lib/stores/bridge/selectAsset";
  import { assets } from "$lib/stores/asset";
  import NetworkSelector from "./selector/networkSelector.svelte";
  import { selectedNetwork } from "$lib/stores/bridge/searchNetwork";

  $: initFiltered = $assets.filter((item) => {
    if ($selectedNetwork != null) {
      return item.mixinChainId
        .toLowerCase()
        .match($selectedNetwork.mixinChainId);
    }
    return item;
  });
  $: filteredItems = initFiltered.filter((item) => {
    return (
      item.symbol.toLowerCase().match($search) ||
      item.name.toLowerCase().match($search) ||
      item.mixinChainName?.toLowerCase().match($search) ||
      item.mixinChainSymbol?.toLowerCase().match($search)
    );
  });

  let content: any;
  function onClickOutside(e: any) {
    if (content == e.target || content.contains(e.target)) return;
    setAssetDialog(false);
  }

  function onKeyDown(e: any) {
    if (e.keyCode === 27) {
      setAssetDialog(false);
    }
  }
</script>

<!-- TODO: Better UI and fonts -->
<!-- TODO: Use single svelte:window for every dialog -->
<svelte:window on:keydown={onKeyDown} />
<div
  in:fade
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class:modal-open={$selectAssetDialog}
  class="modal modal-bottom sm:modal-middle text-base-content"
>
  <div class="modal-box h-4/5 p-0 flex flex-col" bind:this={content}>
    <div class="sticky top-0 z-10 bg-transparent">
      <div class="flex p-5">
        <h3 class="font-semibold text-lg flex-1">{$_("select.token")}</h3>
        <button
          class="flex-0 btn btn-xs btn-circle btn-ghost"
          on:click={() => setAssetDialog(false)}
        >
          <img src={Close} alt="" class="[[data-theme=dark]_&]:invert" />
        </button>
      </div>
      <div class="pb-2 mb-2 px-5">
        <SearchAsset />
      </div>
      <div class="">
        <NetworkSelector />
      </div>
    </div>
    <div class="h-full overflow-y-auto border-t">
      {#if filteredItems.length != 0}
        <ul class="menu bg-base-100 w-full overflow-y-auto">
          {#each filteredItems as asset}
            <li
              on:click={() => {
                if ($inputFrom) {
                  setFromAsset(asset);
                } else {
                  setToAsset(asset);
                }
                search.set("");
              }}
              on:keydown={() => {
                if ($inputFrom) {
                  setFromAsset(asset);
                } else {
                  setToAsset(asset);
                }
                search.set("");
              }}
            >
              <SingleAsset {asset} />
            </li>
          {/each}
        </ul>
      {:else}
        <div
          class="flex grow flex-col space-y-3 py-0 h-full w-full items-center justify-center"
        >
          <NoResult />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .modal {
    --tw-bg-opacity: 0.6;
  }
  .modal-box {
    scrollbar-width: none;
    max-width: 28rem;
  }
  .modal-box::-webkit-scrollbar {
    display: none;
  }
  .modal-bottom {
    max-width: none;
  }
</style>
