<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import Close from "$lib/images/close.svg";
  import { search } from "$lib/stores/swap/searchAsset";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";
  import SingleAsset from "$lib/components/swap/SelectAsset/SingleAsset.svelte";
  import SearchAsset from "$lib/components/swap/SelectAsset/SearchAsset.svelte";
  import { fade } from "svelte/transition";
  import {
    setFromAsset,
    selectedFromAsset,
    selectedToAsset,
    switchAsset,
  } from "$lib/stores/swap/swap";
  import {
    selectAssetDialog,
    setAssetDialog,
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
    setAssetDialog(false);
  }
</script>

<dialog
  in:fade
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class={clsx(
    "modal modal-bottom sm:modal-middle text-base-content",
    $selectAssetDialog && "backdrop-blur-sm modal-open",
  )}
>
  <div
    class="modal-box !max-w-2xl sm:!w-[420px] h-[660px] p-0 flex flex-col"
    bind:this={content}
  >
    <div class="sticky top-0 z-10 bg-transparent">
      <div class="flex p-5">
        <h3 class="font-semibold text-lg flex-1">{$_("select.token")}</h3>
        <button
          class="flex-0 btn btn-xs btn-circle btn-ghost hover:bg-base-100"
          on:click={() => setAssetDialog(false)}
        >
          <img src={Close} alt="" class="[[data-theme=dark]_&]:invert" />
        </button>
      </div>
      <div class="pb-5 px-5">
        <SearchAsset />
      </div>
    </div>
    <div class="divider my-0 h-[0.1px] !bg-base-200"></div>
    <div class="h-full overflow-y-auto">
      {#if filteredItems.length != 0}
        <ul class="menu p-0 bg-base-100 w-full overflow-y-auto">
          {#each filteredItems as asset}
            <li
              on:click={() => {
                if (asset.mixinAssetId === $selectedToAsset.mixinAssetId) {
                  switchAsset(true)
                  return
                }
                setFromAsset(asset);
                search.set("");
              }}
              on:keydown={() => {
                if (asset.mixinAssetId === $selectedToAsset.mixinAssetId) {
                  switchAsset(true)
                  return
                }
                setFromAsset(asset);
                search.set("");
              }}
              class={clsx(
                $selectedFromAsset.mixinAssetId == asset.mixinAssetId &&
                  "bg-[rgb(247,248,250)] opacity-60 text-base-content btn-disabled current",
              )}
            >
              <SingleAsset
                {asset}
                selected={$selectedFromAsset.mixinAssetId == asset.mixinAssetId}
              />
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
</dialog>

<style>
  .modal {
    --tw-bg-opacity: 0.6;
  }
  .modal-box {
    transition-duration: 100ms;
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
