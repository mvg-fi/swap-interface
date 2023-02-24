<script lang="ts">
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";
  import curve from "@zed-wong/mvgswap";
  import { goto } from "$app/navigation";
  import { currentPool, poolsLoaded } from "$lib/stores/pool/pools";
  import { depositMode as deposit } from "$lib/stores/pool/mode";
  import { showToast } from "$lib/components/toast/container.svelte";
  import Deposit from "$lib/components/pool/elements/Deposit.svelte";
  import PoolInfo from "$lib/components/pool/elements/PoolInfo.svelte";
  import Withdrawal from "$lib/components/pool/elements/Withdrawal.svelte";
  import Title from "$lib/components/pool/elements/poolInfo/title.svelte";

  (async () => {
    try {
      // TODO: loading pool by id. Need to deal with fetchPoolList with init
      if (!$poolsLoaded){
        await curve.fetchFactoryPools()
        await curve.fetchCryptoFactoryPools()
        currentPool.set(curve.getPool($page.params.name))
      }
    } catch (e) {
      window.location.href="/"
      showToast("common", $_('error.poolNotFound'))
      console.log(e)
    }
  })()
</script>

<svelte:head>
  <title>{`${$currentPool.name} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<!-- Name -->
<div class="w-full flex items-center justify-center pb-1 text-base-content">
  <Title name={$currentPool.name} />
</div>
<div class="mx-0 flex flex-row mt-3 text-base-content">
  <div class="mr-12">
    <PoolInfo />
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