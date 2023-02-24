<script lang="ts">
  import { _ } from "svelte-i18n";
  import { currentPool } from "$lib/stores/pool/pools";
  import Loading from "$lib/components/pool/elements/poolInfo/loading.svelte";
  
  // let b: string[];
  let p = $currentPool.stats.parameters().then((e)=>{
    return [e.fee, e.adminFee, e.virtualPrice, e.A]
  })
  
  // TODO: fix error
  const s = [$_('technical.fee'),$_('technical.admin_fee'),$_('technical.virtual_price'),$_('technical.a'),];
</script>

<div class="grid grid-cols-2 border rounded-2xl text-xs gp">
  {#each s as _, i}
    <div class="flex p-3">
      <span class="flex flex-1 font-semibold items-center"> {s[i]} </span>
      {#await p}
        <Loading />
      {:then p} 
        <span> {p[i]} </span>
      {/await}      
    </div>
  {/each}
</div>

<style>
  .gp {
    grid-gap: 1px;
  }
</style>