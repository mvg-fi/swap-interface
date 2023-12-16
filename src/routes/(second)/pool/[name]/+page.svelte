<script lang="ts">
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";
  import curve from "@zed-wong/mvgswap";
  import { currentPool, poolsLoaded } from "$lib/stores/pool/pools";
  import { depositMode } from "$lib/stores/pool/mode";
  import { showToast } from "$lib/components/toast/container.svelte";
  import Deposit from "$lib/components/pool/elements/Deposit.svelte";
  import Withdrawal from "$lib/components/pool/elements/Withdrawal.svelte";
  import Staking from "$lib/components/pool/elements/Staking.svelte";
  import PoolInfo from "$lib/components/pool/elements/PoolInfo.svelte";
  import Title from "$lib/components/pool/elements/poolInfo/title.svelte";
  import { onDestroy } from "svelte";
  
  (async () => {
    try {
      // TODO: loading pool by id. Need to deal with fetchPoolList with init
      if (!$poolsLoaded){
        await curve.fetchFactoryPools()
        await curve.fetchCryptoFactoryPools()
        currentPool.set(curve.getPool($page.params.name))
      }
    } catch (e) {
      window.location.href="/pool"
      showToast("common", $_('error.poolNotFound'))
      console.log(e)
    }
  })()

  onDestroy(()=>{
    depositMode.set(0)
  })
</script>

<svelte:head>
  <title>{`${$currentPool.name} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<div class="w-full flex items-center justify-center pb-2 text-base-content">
  <Title name={$currentPool.name} />
</div>
<div class="mx-0 justify-center mb-12 md:mb-6 flex flex-col md:flex-row mt-3 text-base-content">
  <div class="md:mr-2 lg:mr-16 order-2 md:order-1 flex flex-col mt-6 md:mt-0">
    <PoolInfo />
  </div>
  <div class="order-1 mb-4 md:order-2 flex justify-center md:inline">
    {#if $depositMode === 0}
      <Deposit />
    {:else if $depositMode === 1}
      <Withdrawal />
    {:else if $depositMode === 2}
      <Staking />
    {/if}
  </div>
</div>