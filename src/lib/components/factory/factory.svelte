<script>
    import Confirm from "$lib/components/factory/confirm.svelte";
    import PoolInfo from "$lib/components/factory/poolInfo.svelte";
    import PoolType from "$lib/components/factory/poolType.svelte";
    import ProcessBar from "$lib/components/factory/processBar.svelte";
    import Parameters from "$lib/components/factory/parameters.svelte";

    import { onDestroy } from "svelte";
    import { poolType, process } from "$lib/stores/pool/factory";

    onDestroy(()=>{
      process.set(1)
      poolType.set(0)
    })
</script>

<div class="py-3">
  <ProcessBar />
</div>

<div class="">
  {#if $process === 1}
    <PoolType />
  {:else if $process === 2}
    <PoolInfo />
  {:else if $process === 3}
    <Parameters />
  {:else if $process === 4}
    <Confirm />
  {/if}
</div>