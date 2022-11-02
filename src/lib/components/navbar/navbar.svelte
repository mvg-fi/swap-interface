<script lang="ts">
  import Logo from "./logo.svelte";
  import Sections from "./sections.svelte";
  import Menu from "./menu.svelte";
  import Network from "./network.svelte";
  import Connect from "./connect.svelte";
  import Dark from "./dark.svelte";
  import { connected } from "$lib/stores/connect";
  import Account from "./account.svelte";

</script>

<div class="navbar bg-base-100">
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
