<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Connect from "./connect.svelte";
  import Dark from "./dark.svelte";
  import Network from "./network.svelte";
  import Menu from "./menu.svelte";
  import Sections from "./sections.svelte";

  onMount(() => {
    if (window.location.pathname != "/swap") goto("/swap");
  });
</script>

<div class="navbar bg-base-100">
  <div>
    <a href="/swap" class="btn btn-ghost no-animation">
      <span class="title"> MVG </span>
    </a>
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

<style>
  .title {
    color: black;
    font-size: 24px;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
  }
</style>
