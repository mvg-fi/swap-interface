<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Logo from "./logo.svelte";
  import Sections from "./sections.svelte";
  import Menu from "./menu.svelte";
  import Network from "./network.svelte";
  import Connect from "./connect.svelte";
  import Dark from "./dark.svelte";

  onMount(() => {
    if (window.location.pathname != "/swap") goto("/swap");
  });
</script>

<div class="navbar bg-base-100">
  <div>
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
    <Connect />
  </div>
  <div>
    <Dark />
  </div>
</div>