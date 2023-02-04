<script lang="ts">
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";
  import { depositMode as deposit } from "$lib/stores/pool/mode";
  import Deposit from "../elements/Deposit.svelte";
  import PoolInfo from "../elements/PoolInfo.svelte";
  import Withdrawal from "../elements/Withdrawal.svelte";
  import Title from "../elements/poolInfo/title.svelte";

  $: poolName = $page.params.name;
</script>

<svelte:head>
  <title>{`${poolName} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<!-- Name -->
<div class="w-full flex items-center justify-center pb-1 text-base-content">
  <Title name={poolName} />
</div>
<div class="mx-0 flex flex-row mt-3 text-base-content">
  <div class="mr-12">
    <PoolInfo name={$page.params.name} />
  </div>
  <div class="sticky">
    {#if $deposit}
      <Deposit />
    {:else}
      <Withdrawal />
    {/if}
  </div>
</div>

<!-- TODO: getPoolId -->