<script lang="ts">
  import Apy from "./poolInfo/apy.svelte";
  import Balances from "./poolInfo/balances.svelte";
  import TechDetails from "./TechDetails.svelte";
  
</script>

<!-- 
  TBD:
  1. APY (subgraph)
  2. Liquidity Utilization (subgraph)
  3. 24h volume (subgraph)
  4. TVL 
 -->


<div class="card xl:min-w-[32rem] h-auto bg-base-100 shadow-lg mb-2 md:order-1 order-2">
  <Apy />
</div>

<div class="card xl:min-w-[32rem] h-auto bg-base-100 shadow-xl py-4 my-2 md:order-2 order-1">
  <Balances />
</div>

<div class="card border border-base-300 bg-base-100 rounded-box shadow-md md:order-3 order-3">
  <TechDetails />
</div>
