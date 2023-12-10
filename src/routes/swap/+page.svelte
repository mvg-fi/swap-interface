<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n";
  import SwapCard from "$lib/components/swap/SwapCard.svelte";
  import { switchNeeded } from "$lib/stores/connect";
  import SwitchNeeded from "$lib/components/common/switchNeeded.svelte";
</script>

<svelte:head>
  <title>{`${$_("navbar.swap")} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

{#if $switchNeeded}
  <div class={clsx("flex justify-center", $switchNeeded && "p-6 pt-2")}>
    <SwitchNeeded />
  </div>
{/if}

<div class={clsx("flex justify-center", !$switchNeeded && "pt-12 pb-24")}>
  <SwapCard />
</div>