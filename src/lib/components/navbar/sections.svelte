<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";

  const items = [
    { key: "/swap", value: $_("navbar.swap"), info: "Swap within MVM" },
    { key: "/pool", value: $_("navbar.pool"), info: "Add or remove liquidity"},
    { key: "/bridge", value: $_("navbar.bridge"), info: "Cross-chain bridge"},
  ];
</script>

<ul class="menu horizontal">
  {#each items as item}
    <li>
      <a
        href={item.key}
        class={clsx("btn btn-ghost animate-none font-medium rounded-lg text-[15px]",
          $page.url.pathname === item.key && "text-base-content",
          !($page.url.pathname === item.key) && "text-gray-500/70"
        )}
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
