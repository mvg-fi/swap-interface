<script lang="ts">
  import { _ } from "svelte-i18n";
  import searchIcon from "$lib/images/search.svg";
  import { search } from "$lib/stores/searchPool";
</script>

<div class="form-control">
  <div class="input-group">
    <button
      class="btn btn-square btn-bordered btn-disabled search-btn border border-r-0 focus:outline-none bg-base-100"
    >
      <img src={searchIcon} alt="search" class="w-6 opacity-40 [[data-theme=dark]_&]:invert" />
    </button>
    <input
      type="text"
      bind:value={$search}
      placeholder={$_("search.pool")}
      class="input block input-bordered text-base-content w-full border-l-0 pl-0 transition-none focus:outline-none"
    />
  </div>
</div>

<style>
  .search-btn {
    border-width: 1px;
    border: 1px solid;
    background-color: white;
    border-color: hsl(215 28% 17%) / 0.2;
    border-right: none;
  }
</style>
