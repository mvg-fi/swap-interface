<script>
    import Parameters from "./parameters.svelte";
    import PoolInfo from "./poolInfo.svelte";
    import PoolType from "./poolType.svelte";
    import ProcessBar from "./processBar.svelte";

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

<div class="mt-10">
  {#if $process === 1}
    <PoolType />
  {:else if $process === 2}
    <PoolInfo />
  {:else if $process === 3}
    <Parameters />
  {/if}
</div>