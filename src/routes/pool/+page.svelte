<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import PoolCard from "$lib/components/pool/PoolCard.svelte";
  import MyLiquidity from "$lib/components/pool/MyLiquidity.svelte";
</script>

<svelte:head>
  <title>{`${$_("navbar.pool")} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<!-- TODO: if connected and have pool -->
{#if $connected}
  <div>
    <MyLiquidity />
  </div>
{/if}
<div
  class="flex flex-col items-center justify-center mt-4 h-full bg-base-100 rounded-2xl"
>
  <PoolCard />
</div>
