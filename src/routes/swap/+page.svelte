<script lang="ts">
  import { _ } from "svelte-i18n";
  import SwapCard from "$lib/components/swap/SwapCard.svelte";
</script>

<svelte:head>
  <title>{`${$_("navbar.swap")} | ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<div class="flex justify-center pt-16">
  <SwapCard />
</div>