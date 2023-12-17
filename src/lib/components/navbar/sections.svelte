<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  const items = [
    { key: "/swap", value: $_("navbar.swap"), info: "Swap within MVM" },
    { key: "/pool", value: $_("navbar.pool"), info: "Add or remove liquidity" },
  ];
</script>

<div class="menu flex-row hidden md:flex">
  {#each items as item}
    <button
      on:click={() => goto(item.key)}
      class={clsx(
        "btn btn-ghost no-animation flex flex-col items-center font-medium rounded-lg",
        $page.url.pathname === item.key && "text-base-content",
        !($page.url.pathname === item.key) && "text-gray-500/70",
      )}
    >
      <span>{item.value}</span>
    </button>
  {/each}
</div>

<style>
</style>
