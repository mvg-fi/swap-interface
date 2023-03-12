<script>
    import { process } from "$lib/stores/pool/factory";
    import Parameters from "./parameters.svelte";
    import PoolInfo from "./poolInfo.svelte";
    import PoolType from "./poolType.svelte";
    import ProcessBar from "./processBar.svelte";
</script>

<div>
  <ProcessBar />  
</div>

<div>
  {#if $process === 1}
    <PoolType />
  {:else if $process === 2}
    <PoolInfo />
  {:else if $process === 3}
    <Parameters />
  {/if}
</div>