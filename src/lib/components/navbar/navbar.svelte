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
      <Logo />
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
    <div class="pl-2 mt-1">
      <Logo class="w-6" />
    </div>
  </div>
{/if}
