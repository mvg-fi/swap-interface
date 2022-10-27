<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Connect from "./connect.svelte";
  import Dark from "./dark.svelte";
    import Network from "./network.svelte";
    import Menu from "./menu.svelte";

  onMount(() => {
    if (window.location.pathname != "/swap") goto("/swap");
  });
</script>

<div class="navbar bg-base-100">
  <div>
    <a href="/swap" class="ml-2 btn btn-ghost no-animation">
      <span class="title"> MVG </span>
    </a>
  </div>
  <div class="flex-1">
    <ul class="menu horizontal">
      <li>
        <a
          href="/swap"
          class="btn btn-ghost no-animation sub"
          class:selected={$page.url.pathname === "/swap"}
        >
          Swap
        </a>
      </li>
      <li>
        <a
          href="/pool"
          class="btn btn-ghost no-animation sub"
          class:selected={$page.url.pathname === "/pool"}
        >
          Pool
        </a>
      </li>
    </ul>
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
  .sub {
    color: grey;
    font-size: 15px;
    font-family: "Inter custom", sans-serif;
    font-weight: 500 !important;
    border-radius: 0.5rem;
  }
  .selected {
    color: black;
    font-family: "Inter custom", sans-serif;
  }
</style>
