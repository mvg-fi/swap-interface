<script lang="ts">
  import { _ } from "svelte-i18n";
  import searchIcon from "$lib/images/search.svg";
  import { search } from "$lib/stores/swap/searchAsset";
</script>

<div class="form-control">
  <div class="join focus:border rounded-2xl border">
    <button
      class="btn join-item btn-square border-none shadow-none focus:outline-none hover:border-none bg-[rgb(247,248,250)] hover:bg-[rgb(247,248,250)] [[data-theme=dark]_&]:bg-[#000000]/40 [[data-theme=dark]_&]:hover:bg-[#000000]/40 !h-10 min-h-[2.5rem]"
    >
      <img src={searchIcon} alt="search" class="w-5 opacity-20 [[data-theme=dark]_&]:invert" />
    </button>
    <input
      type="text"
      bind:value={$search}
      placeholder={$_('search.asset')}
      class="input join-item block w-full bg-[rgb(247,248,250)] border-l-0 pl-0 focus:outline-none focus:border-0 !h-10 [[data-theme=dark]_&]:bg-[#000000]/40 [[data-theme=dark]_&]:hover:bg-[#000000]/40"
    />
  </div>
</div>

<style>
 input::placeholder {
  opacity: 0.6;
}
</style>
