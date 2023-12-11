<script lang="ts">
  import { _ } from "svelte-i18n";
  import { currentPool } from "$lib/stores/pool/pools";
  import Loading from "$lib/components/pool/elements/poolInfo/loading.svelte";
  import { formatDecimals } from "$lib/helpers/utils";
  
  let p = $currentPool.stats.parameters().then((e)=>{
    return [`${e.fee}%`, `${e.adminFee}%`, formatDecimals(e.virtualPrice, 10), e.A]
  })
  
  const s = [$_('technical.fee'),$_('technical.admin_fee'),$_('technical.virtual_price'),$_('technical.a'),];
  const b = [$_('technical.fee_info'),$_('technical.admin_fee_info'),$_('technical.virtual_price_info'),$_('technical.a_info'),]
</script>

<div class="grid md:grid-cols-2 border rounded-2xl text-xs gp">
  {#each s as _, i}
    <div class="flex p-3">
      <span class="flex flex-1 font-semibold items-center tooltip" data-tip={b[i]}> {s[i]} </span>
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