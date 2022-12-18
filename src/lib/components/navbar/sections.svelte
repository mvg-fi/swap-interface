<script lang="ts">
  import { page } from "$app/stores";
  import { _ } from "svelte-i18n";

  const items = [
    { key: "/swap", value: $_("navbar.swap") },
    { key: "/pool", value: $_("navbar.pool") },
    { key: "/bridge", value: $_("navbar.bridge") },
  ];
</script>

<ul class="menu horizontal">
  {#each items as item}
    <li>
      <a
        href={item.key}
        class="btn btn-ghost animate-none sub"
        class:selected={$page.url.pathname === item.key}
      >
        {item.value}
      </a>
    </li>
  {/each}
</ul>

<style>
  .sub {
    color: grey;
    font-size: 15px;
    font-weight: 500 !important;
    border-radius: 0.5rem;
  }
  .selected {
    color: black;
  }
</style>
