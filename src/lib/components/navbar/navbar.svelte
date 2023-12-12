<script lang="ts">
  import Logo from "./logo.svelte";
  import Sections from "./sections.svelte";
  import Menu from "./menu.svelte";
  import Network from "./network.svelte";
  import Connect from "./connect.svelte";
  import Dark from "./dark.svelte";
  import Account from "./account.svelte";
  import { isMixin } from "$lib/helpers/mixin";
  import { connected } from "$lib/stores/connect";

  const ism = isMixin();
</script>

{#if !ism}
  <div
    class="navbar bg-transparent flex items-center text-base-content md:px-8 py-0"
  >
    <div class="px-2.5">
      <Logo path="/" />
    </div>
    <div class="flex-1">
      <Sections />
    </div>

    <div class="flex-none">
      <Menu />
    </div>
    <div>
      <Network />
    </div>
    <div>
      {#if $connected}
        <Account />
      {:else}
        <Connect />
      {/if}
    </div>

    <div class="mr-2 hidden md:flex">
      <Dark />
    </div>
  </div>
{:else}
  <div
    class="navbar bg-transparent flex items-center text-base-content py-0 !h-[42px] !min-h-[42px]"
  >
    <div class="pl-2 mt-0.5">
      <Logo class="w-6" />
      <div class="absolute right-28 flex">
        <button on:click={()=>{mobile_menu_dialog.showModal()}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>  
        </button>      
      </div>
    </div>
  </div>
{/if}
