<script lang="ts">
  import { _ } from "svelte-i18n";
  import searchIcon from "$lib/images/search.svg";
  import { search } from "$lib/stores/bridge/searchAsset";
</script>

<div class="form-control">
  <div class="input-group">
    <button
      class="btn btn-square btn-disabled focus:outline-none bg-base-200 !rounded-l-2xl !h-10 !min-h-8"
    >
      <img src={searchIcon} alt="search" class="w-6 opacity-40 [[data-theme=dark]_&]:invert" />
    </button>
    <input
      type="text"
      bind:value={$search}
      placeholder={$_('search.asset')}
      class="input block w-full bg-base-200 border-l-0 pl-0 focus:outline-none !rounded-r-2xl !h-10 !min-h-8"
    />
  </div>
</div>

<style>
  .search-btn {
    border: 1px solid;
    border-color: hsl(215 28% 17%) / 0.2;
  }
</style>
