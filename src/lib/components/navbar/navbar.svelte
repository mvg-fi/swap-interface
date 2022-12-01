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

<div class="navbar bg-transparent flex items-center">
  <div class="mb-1">
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
  <div>
    <Dark />
  </div>
</div>