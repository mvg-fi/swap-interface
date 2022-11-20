<script lang="ts">
  import searchIcon from "$lib/images/search.svg";
  import { search } from "$lib/stores/searchPool";
  import { _ } from "svelte-i18n";
</script>

<div class="form-control">
  <div class="input-group">
    <button
      class="btn btn-square btn-bordered btn-disabled search-btn on-focus"
    >
      <img src={searchIcon} alt="search" class="w-6 search-icon" />
    </button>
    <input
      type="text"
      bind:value={$search}
      placeholder="{$_('search.pool')}"
      class="input block input-bordered search-input on-focus"
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
  .search-icon {
    opacity: 0.4;
  }
  .search-input {
    width: 100%;
    border-left: none;
    padding-left: 0;
  }
  .on-focus:focus {
    outline: none;
  }
</style>
