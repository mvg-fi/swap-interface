<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import PoolCard from "$lib/components/pool/PoolCard.svelte";
  import MyLiquidity from "$lib/components/pool/MyLiquidity.svelte";
  let innerWidth = 0;
  $: isMd = innerWidth >= 720;
</script>

<svelte:head>
  <title>{`${$_("navbar.pool")} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>
<svelte:window bind:innerWidth />

<!-- TODO: if connected and have pool -->
{#if $connected && isMd}
  <div>
    <MyLiquidity />
  </div>
{/if}
<div class="md:mx-28 md:mt-6">
  <PoolCard />
</div>
