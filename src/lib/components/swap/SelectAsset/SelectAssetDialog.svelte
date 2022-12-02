<script lang="ts">
  import { _ } from "svelte-i18n";
  import Close from "$lib/images/close.svg";
  import assets from "$lib/assets/assets.json";
  import { search } from "$lib/stores/swap/searchAsset";
  import SingleAsset from "$lib/components/swap/SelectAsset/SingleAsset.svelte";
  import SearchAsset from "$lib/components/swap/SelectAsset/SearchAsset.svelte";
  import { fade } from "svelte/transition";
  import { setFromAsset } from "$lib/stores/swap/swap";
  import {
    selectAssetDialog,
    setAssetDialog,
  } from "$lib/stores/swap/selectAsset";

  $: filteredItems = assets.filter((item) => {
    return (
      item.symbol.toLowerCase().match($search) ||
      item.name.toLowerCase().match($search)
    );
  });

  let content: any;
  function onClickOutside(e:any) {
    if (content == e.target || content.contains(e.target)) return;
    setAssetDialog(false);
  }
</script>

<div
  class="modal modal-bottom sm:modal-middle"
  in:fade
  class:modal-open={$selectAssetDialog}
  on:click={onClickOutside}
  on:keypress={onClickOutside}
>
  <div class="modal-box h-4/5 max-w-lg p-0" bind:this={content}>
    <div class="sticky top-0 z-10 bg-white">
      <div class="flex p-5">
        <h3 class="font-semibold text-lg flex-1">{$_("select.token")}</h3>
        <button class="flex-0 btn btn-xs btn-circle btn-ghost" on:click={()=>setAssetDialog(false)}>
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
          on:click={() => setFromAsset(asset)}
          on:keydown={() => setFromAsset(asset)}
        >
          <SingleAsset {asset} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .modal-box {
    scrollbar-width: none;
  }
  .modal-box::-webkit-scrollbar {
    display: none;
  }
  .modal-bottom {
    max-width: none;
  }
</style>
