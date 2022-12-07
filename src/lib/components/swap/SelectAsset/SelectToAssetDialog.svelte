<script lang="ts">
  import { _ } from "svelte-i18n";
  import Close from "$lib/images/close.svg";
  import { search } from "$lib/stores/swap/searchAsset";
  import SingleAsset from "$lib/components/swap/SelectAsset/SingleAsset.svelte";
  import SearchAsset from "$lib/components/swap/SelectAsset/SearchAsset.svelte";
  import { fade } from "svelte/transition";
  import { setToAsset } from "$lib/stores/swap/swap";
  import {
    selectToAssetDialog,
    setToAssetDialog,
  } from "$lib/stores/swap/selectAsset";
  import { assets } from "$lib/stores/asset";

  $: filteredItems = $assets.filter((item) => {
    return (
      item.symbol.toLowerCase().match($search) ||
      item.name.toLowerCase().match($search)
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
  class="modal modal-bottom sm:modal-middle"
  class:modal-open={$selectToAssetDialog}
  on:click={onClickOutside}
  on:keypress={onClickOutside}
>
  <div class="modal-box h-4/5 max-w-lg p-0" bind:this={content}>
    <div class="sticky top-0 z-10 bg-white">
      <div class="flex p-5">
        <h3 class="font-semibold text-lg flex-1">{$_("select.token")}</h3>
        <button
          class="flex-0 btn btn-xs btn-circle btn-ghost"
          on:click={() => setToAssetDialog(false)}
        >
          <img src={Close} alt="x" />
        </button>
      </div>
      <div class="pb-4 px-5">
        <SearchAsset />
      </div>
    </div>
    <ul class="menu bg-base-100 w-full overflow-y-auto">
      {#each filteredItems as asset}
        <li
          on:click={() => setToAsset(asset)}
          on:keydown={() => setToAsset(asset)}
        >
          <SingleAsset {asset} />
        </li>
      {/each}
      {#if filteredItems.length === 0}
        <!-- TODO Show no result -->
      {/if}
    </ul>
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
