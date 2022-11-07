<script lang="ts">
  import Close from "$lib/images/close.svg";
  import assets from "$lib/assets/assets.json";
  import { search } from "$lib/stores/searchAsset";
  import SingleAsset from "$lib/components/swap/SelectAsset/SingleAsset.svelte";
  import SearchAsset from "$lib/components/swap/SelectAsset/SearchAsset.svelte";

  export let from: boolean;
  export let id: string;

  $: filteredItems = assets.filter((item) => {
    return (
      item.symbol.toLowerCase().match($search) ||
      item.name.toLowerCase().match($search)
    );
  });
</script>

<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative h-4/5 p-0 dialog-width">
    <div class="flex p-5">
      <h3 class="font-bold text-lg flex-1">Select a token</h3>
      <label for={id} class="flex-0 btn btn-xs btn-circle btn-ghost">
        <img src={Close} alt="x" />
      </label>
    </div>
    <div class="pb-4 px-5">
      <SearchAsset />
    </div>
    <ul class="menu bg-base-100 w-full">
      {#each filteredItems as asset}
        <li>
          <SingleAsset {asset} {from} {id} />
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
  .modal-middle {
    max-width: 28rem !important;
  }
</style>
