<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import Close from "$lib/images/close.svg";
  import { search } from "$lib/stores/swap/searchAsset";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";
  import SingleAsset from "$lib/components/swap/SelectAsset/SingleAsset.svelte";
  import SearchAsset from "$lib/components/swap/SelectAsset/SearchAsset.svelte";
  import { fade } from "svelte/transition";
  import { selectedFromAsset, selectedToAsset, setToAsset } from "$lib/stores/swap/swap";
  import {
    selectToAssetDialog,
    setToAssetDialog,
  } from "$lib/stores/swap/selectAsset";
  import { assets } from "$lib/stores/asset";

  $: filteredItems = $assets.filter((item) => {
    return (
      item.symbol.toUpperCase().match($search.toUpperCase()) ||
      item.name.toUpperCase().match($search.toUpperCase())
    );
  });

  let content: any;
  function onClickOutside(e: any) {
    if (content == e.target || content.contains(e.target)) return;
    setToAssetDialog(false);
  }
</script>

<div
  in:fade
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class={clsx("modal modal-bottom sm:modal-middle text-base-content", $selectToAssetDialog && "backdrop-blur-sm modal-open")}
>
  <div class="modal-box h-4/5 p-0 flex flex-col" bind:this={content}>
    <div class="sticky top-0 z-10 bg-tranparent">
      <div class="flex p-5">
        <h3 class="font-semibold text-lg flex-1">{$_("select.token")}</h3>
        <button
          class="flex-0 btn btn-xs btn-circle btn-ghost"
          on:click={() => setToAssetDialog(false)}
        >
          <img src={Close} alt="" class="[[data-theme=dark]_&]:invert" />
        </button>
      </div>
      <div class="pb-4 px-5">
        <SearchAsset />
      </div>
    </div>
    <div class="h-full overflow-y-auto">
      {#if filteredItems.length != 0}
        <ul class="menu bg-base-100 w-full overflow-y-auto">
          {#each filteredItems as asset}
            <li
              on:click={() => {
                setToAsset(asset)
                search.set("");
              }}
              on:keydown={() => {
                setToAsset(asset)
                search.set("");
              }}
              class={clsx(
                $selectedToAsset.mixinAssetId == asset.mixinAssetId && "bg-base-300 opacity-40 text-base-content btn-disabled current",
                $selectedFromAsset.mixinAssetId == asset.mixinAssetId && "bg-base-300 opacity-40 text-base-content btn-disabled"
              )}
            >
              <SingleAsset {asset} selected={$selectedToAsset.mixinAssetId == asset.mixinAssetId} />
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
