<script lang="ts">
  import { _ } from "svelte-i18n";
  import PoolCard from "$lib/components/pool/PoolCard.svelte";
</script>

<svelte:head>
  <title>{`${$_("navbar.pool")} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<div
  class="flex flex-col items-center justify-center mt-3 h-full bg-white rounded-lg"
>
  <PoolCard />
</div>
