<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { fade } from "svelte/transition";
  import Close from "$lib/images/close.svg";
  import { assets } from "$lib/stores/asset";
  import { search } from "$lib/stores/bridge/searchAsset";
  import { selectedNetwork } from "$lib/stores/bridge/searchNetwork";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";
  import SingleAsset from "$lib/components/bridge/selector/singleAsset.svelte";
  import SearchAsset from "$lib/components/bridge/selector/searchAsset.svelte";
  import NetworkSelector from "$lib/components/bridge/selector/networkSelector.svelte";
  import { selectAssetDialog, setAssetDialog } from "$lib/stores/bridge/selectAsset";
  import { setFromAsset, setToAsset, inputFrom, selectedFromAsset, selectedToAsset } from "$lib/stores/bridge/bridge";
  
  $: initFiltered = $assets.filter((item) => {
    if ($selectedNetwork != null) {
      return item.mixinChainId
        .toUpperCase()
        .match($selectedNetwork.mixinChainId.toUpperCase());
    }
    return item;
  });
  $: filteredItems = initFiltered.filter((item) => {
    return (
      item.symbol.toUpperCase().match($search.toUpperCase())
      // item.name.toUpperCase().match($search.toUpperCase()) ||
      // item.mixinChainName?.toUpperCase().match($search.toUpperCase()) ||
      // item.mixinChainSymbol?.toUpperCase().match($search.toUpperCase())
    );
  }).sort((a, b) => {
    if (a.mixinAssetId === a.mixinChainId) return -1;
    if (b.mixinAssetId === b.mixinChainId) return -1;
    return 0;
  });
  $: highlighted = $inputFrom ? $selectedFromAsset : $selectedToAsset
  $: _highlighted = $inputFrom ? $selectedToAsset : $selectedFromAsset

  let content: any;
  function onClickOutside(e: any) {
    if (content == e.target || content.contains(e.target)) return;
    setAssetDialog(false);
  }

  function onKeyDown(e: any) {
    if (e.code === 'Escape') {
      setAssetDialog(false);
    }
  }
</script>

<!-- TODO: Better UI and fonts -->
<svelte:window on:keydown={onKeyDown} />
<div
  in:fade|global
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class={clsx("modal modal-bottom sm:modal-middle text-base-content select-none", 
    $selectAssetDialog && "backdrop-blur-sm modal-open")}
>
  <div class="modal-box w-[450px] h-[680px] p-0 flex flex-col" bind:this={content}>
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
        <ul class=" bg-base-100 w-full p-0 overflow-y-auto">
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
              class={clsx(
                highlighted.mixinAssetId == asset.mixinAssetId && "bg-base-300 opacity-40 text-base-content btn-disabled",
                _highlighted.mixinAssetId == asset.mixinAssetId && "bg-base-300 opacity-40 text-base-content btn-disabled")
              }
            >
              <SingleAsset {asset} selected={highlighted.mixinAssetId == asset.mixinAssetId}/>
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
