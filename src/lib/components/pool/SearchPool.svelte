<script lang="ts">
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import searchIcon from "$lib/images/search.svg";
  import { search } from "$lib/stores/searchPool";
</script>

<div class="form-control">
  <div class="join">
    <button
    class="btn join-item btn-square focus:outline-none hover:border-0 bg-base-200 hover:bg-base-200 !rounded-l-xl !min-h-8"
    >
      <img src={searchIcon} alt="search" class="w-6 opacity-40 [[data-theme=dark]_&]:invert" />
    </button>
    <input
      type="text"
      bind:value={$search}
      placeholder={$_("search.pool")}
      class="input join-item block w-full bg-base-200 border-l-0 pl-0  focus:outline-none focus:border-0 !rounded-r-xl !min-h-8"
    />
    <div class="flex items-center ml-3 tooltip" data-tip={$_('pool.create_new_pool')}>
      <button on:click={()=>goto('/factory/create')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
          <path xmlns="http://www.w3.org/2000/svg" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#0D0D0D"></path>
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
  
</style>
