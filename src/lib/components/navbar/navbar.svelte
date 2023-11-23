<script lang="ts">
  import Logo from "./logo.svelte";
  import Sections from "./sections.svelte";
  import Menu from "./menu.svelte";
  import Network from "./network.svelte";
  import Connect from "./connect.svelte";
  import Dark from "./dark.svelte";
  import Account from "./account.svelte";
  import { connected } from "$lib/stores/connect";
  
</script>

<div class="navbar bg-transparent flex items-center text-base-content px-8 py-0">
  <div class="">
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